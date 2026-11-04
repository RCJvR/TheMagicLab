"""Slideshow Maker: turn a zip of images and videos into a PowerPoint (.pptx).

Run with a GUI:      python slideshow_maker.py
Drop a zip on the exe, or:  python slideshow_maker.py photos.zip [out.pptx]
Everything happens on this computer; nothing is uploaded.
"""
import io
import os
import re
import sys
import tempfile
import urllib.parse
import urllib.request
import zipfile
from dataclasses import dataclass

from PIL import Image, ImageOps
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.util import Emu, Inches, Pt

try:  # iPhone HEIC photos, if the optional package is present
    import pillow_heif
    pillow_heif.register_heif_opener()
    HEIC = {".heic", ".heif"}
except Exception:
    HEIC = set()

IMAGE_EXT = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".tif", ".tiff"} | HEIC
VIDEO_EXT = {".mp4", ".m4v", ".mov", ".wmv", ".avi", ".mpg", ".mpeg"}
MIME = {".mov": "video/quicktime", ".wmv": "video/x-ms-wmv", ".avi": "video/x-msvideo",
        ".mpg": "video/mpeg", ".mpeg": "video/mpeg"}
MAX_ZIP_MEMBER = 2 * 1024 ** 3  # refuse single files over 2 GB


@dataclass
class Options:
    title: str = ""
    title_slide: bool = True
    order: str = "name"          # name | date | zip
    fit: str = "contain"         # contain | cover
    widescreen: bool = True
    background: str = "000000"   # hex RGB
    max_px: int = 2560           # 0 = keep original size
    captions: bool = False
    notes: bool = False
    include: object = None       # optional set of zip member names to use (None = all)
    extras: object = None        # extra items: [("file", path) | ("url", link)]
    extras_first: bool = False   # put the extra items before the zip's files


def natural_key(s):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", s)]


def list_media(zf, order="name"):
    """Return [(kind, ZipInfo)] for supported files, skipping junk entries."""
    found = []
    for idx, info in enumerate(zf.infolist()):
        name = info.filename
        base = os.path.basename(name)
        if info.is_dir() or not base or base.startswith(".") or "__MACOSX/" in name:
            continue
        ext = os.path.splitext(base)[1].lower()
        kind = "image" if ext in IMAGE_EXT else "video" if ext in VIDEO_EXT else None
        if kind:
            found.append((kind, info, idx))
    if order == "date":
        found.sort(key=lambda t: (t[1].date_time, natural_key(t[1].filename)))
    elif order == "zip":
        found.sort(key=lambda t: t[2])
    else:
        found.sort(key=lambda t: natural_key(t[1].filename))
    return [(k, i) for k, i, _ in found]


def fit_box(w, h, bw, bh, mode="contain"):
    r, br = w / h, bw / bh
    if (mode == "contain") == (r > br):
        pw, ph = bw, bw / r
    else:
        pw, ph = bh * r, bh
    return pw, ph


def prep_image(data, opts, box_ratio):
    """Return (jpeg/png bytes, w, h) ready to place, honouring EXIF rotation."""
    img = Image.open(io.BytesIO(data))
    img = ImageOps.exif_transpose(img)
    has_alpha = img.mode in ("RGBA", "LA", "P") and "transparency" in img.info or img.mode in ("RGBA", "LA")
    img = img.convert("RGBA" if has_alpha else "RGB")
    if opts.fit == "cover":  # crop to the slide box so nothing is stretched
        w, h = img.size
        if w / h > box_ratio:
            nw = int(h * box_ratio); x = (w - nw) // 2; img = img.crop((x, 0, x + nw, h))
        else:
            nh = int(w / box_ratio); y = (h - nh) // 2; img = img.crop((0, y, w, y + nh))
    if opts.max_px and max(img.size) > opts.max_px:
        s = opts.max_px / max(img.size)
        img = img.resize((max(1, round(img.width * s)), max(1, round(img.height * s))), Image.LANCZOS)
    buf = io.BytesIO()
    if has_alpha:
        img.save(buf, "PNG")
    else:
        img.save(buf, "JPEG", quality=90)
    return buf.getvalue(), img.width, img.height


def video_info(path):
    """Return (width, height, poster_jpeg_bytes) using OpenCV."""
    import cv2
    cap = cv2.VideoCapture(path)
    try:
        if not cap.isOpened():
            raise ValueError("cannot open video")
        w, h = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        n = cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0
        if n > 30:
            cap.set(cv2.CAP_PROP_POS_FRAMES, min(n // 10, 60))
        ok, frame = cap.read()
        if not ok:
            raise ValueError("cannot read a frame")
        ok, enc = cv2.imencode(".jpg", frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
        return w or frame.shape[1], h or frame.shape[0], enc.tobytes()
    finally:
        cap.release()


# ------------------------------------------------- locations / Dropbox
def config_dir():
    base = os.environ.get("APPDATA") or os.path.join(os.path.expanduser("~"), ".config")
    return os.path.join(base, "SlideshowMaker")


def locations_file():
    return os.path.join(config_dir(), "locations.txt")


def parse_locations(text):
    """One location per line: 'Cape Town | https://www.dropbox.com/...'. '=' also works.
    Returns [(name, url)]; blank lines, '#' comments and lines without a link are ignored."""
    out = []
    for line in text.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        m = re.match(r"^(.*?)\s*[|=]\s*(https?://\S+)\s*$", line)
        if m and m.group(1):
            out.append((m.group(1).strip(), m.group(2)))
    return out


def load_locations_text():
    try:
        with open(locations_file(), encoding="utf-8") as f:
            return f.read()
    except OSError:
        return ""


def save_locations_text(text):
    os.makedirs(config_dir(), exist_ok=True)
    with open(locations_file(), "w", encoding="utf-8") as f:
        f.write(text)


def dropbox_zip_url(url):
    """Turn a Dropbox shared-folder link into one that downloads the folder as a zip."""
    p = urllib.parse.urlparse(url.strip())
    if not (p.hostname or "").lower().endswith("dropbox.com"):
        raise ValueError("That is not a dropbox.com link.")
    q = [(k, v) for k, v in urllib.parse.parse_qsl(p.query, keep_blank_values=True) if k != "dl"]
    q.append(("dl", "1"))
    return urllib.parse.urlunparse(p._replace(query=urllib.parse.urlencode(q)))


MAX_DOWNLOAD = 1024 ** 3  # refuse single downloads over 1 GB


def download_file(url, dest, progress=None, max_bytes=MAX_DOWNLOAD):
    """Download an http(s) url to dest."""
    if urllib.parse.urlparse(url).scheme not in ("http", "https"):
        raise ValueError("Only http and https links are supported.")
    req = urllib.request.Request(url, headers={"User-Agent": "SlideshowMaker/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r, open(dest, "wb") as f:
        total = int(r.headers.get("Content-Length") or 0)
        if max_bytes and total > max_bytes:
            raise ValueError(f"file is too large ({total // 1048576} MB)")
        done = 0
        while True:
            chunk = r.read(1 << 20)
            if not chunk:
                break
            done += len(chunk)
            if max_bytes and done > max_bytes:
                raise ValueError("file is too large")
            f.write(chunk)
            if progress:
                progress(done, total)
    return dest


def download_zip(url, dest, progress=None, check_host=True):
    """Download a Dropbox folder (or any zip link) to dest and check it really is a zip."""
    if check_host:
        url = dropbox_zip_url(url)
    download_file(url, dest, progress, max_bytes=0)
    if not zipfile.is_zipfile(dest):
        raise ValueError("Dropbox did not send a zip. The folder may be too large to download "
                         "as one file, or the link may not be a public shared folder.")
    return dest


# ------------------------------------------------- links (YouTube and others)
_YT = re.compile(r"(?:youtu\.be/|youtube\.com/(?:watch\?(?:[^#]*&)?v=|shorts/|embed/|live/))([\w-]{11})", re.I)


def youtube_id(url):
    m = _YT.search(url)
    return m.group(1) if m else None


def url_media_kind(url):
    """'image' / 'video' when the link points straight at such a file, else None."""
    ext = os.path.splitext(urllib.parse.urlparse(url).path)[1].lower()
    return "image" if ext in IMAGE_EXT else "video" if ext in VIDEO_EXT else None


def _fetch(url, limit=5 * 1024 * 1024):
    req = urllib.request.Request(url, headers={"User-Agent": "SlideshowMaker/1.0"})
    with urllib.request.urlopen(req, timeout=10) as r:
        return r.read(limit)


def fetch_link_info(url):
    """Best-effort title and thumbnail for a link. Never raises; missing parts are None."""
    import json
    title, thumb = None, None
    vid = youtube_id(url)
    thumb_url = None
    if vid:
        try:
            info = json.loads(_fetch("https://www.youtube.com/oembed?format=json&url=" + urllib.parse.quote(url, safe="")))
            title, thumb_url = info.get("title"), info.get("thumbnail_url")
        except Exception:
            pass
        thumb_url = thumb_url or f"https://i.ytimg.com/vi/{vid}/hqdefault.jpg"
    if thumb_url:
        try:
            thumb = _fetch(thumb_url)
        except Exception:
            thumb = None
    if not title:
        title = urllib.parse.urlparse(url).hostname or url
    return {"title": title, "thumb": thumb}


def describe_media(zip_path, order="name"):
    """[(member_name, kind, size_bytes)] for the picker list."""
    with zipfile.ZipFile(zip_path) as zf:
        return [(i.filename, k, i.file_size) for k, i in list_media(zf, order)]


def quality_unticks(names, prefer):
    """Names to untick when preferring 'HQ' or 'LQ' versions. Only files that carry the
    opposite marker as a separate word (e.g. 'Timer HQ.mp4', 'timer_lq.mp4') are affected."""
    other = "lq" if prefer.lower() == "hq" else "hq"
    pat = re.compile(r"(?<![a-z])" + other + r"(?![a-z])", re.I)
    return {n for n in names if pat.search(os.path.basename(n))}


def build(zip_path, out_path, opts=None, progress=None):
    """Build the presentation from a zip (optional) plus extra files and links.
    progress(done, total, text) is optional. Returns (slides_made, [skipped])."""
    opts = opts or Options()
    say = progress or (lambda *a: None)
    prs = Presentation()
    prs.slide_width, prs.slide_height = (Inches(13.333), Inches(7.5)) if opts.widescreen else (Inches(10), Inches(7.5))
    W, H = prs.slide_width, prs.slide_height
    blank = prs.slide_layouts[6]
    bg = RGBColor.from_string(opts.background.lstrip("#").upper())
    lum = 0.299 * bg[0] + 0.587 * bg[1] + 0.114 * bg[2]
    fg = RGBColor(0x11, 0x11, 0x11) if lum > 150 else RGBColor(0xFF, 0xFF, 0xFF)
    cap_h = Inches(0.5) if opts.captions else 0
    box_h = H - cap_h

    def new_slide():
        s = prs.slides.add_slide(blank)
        s.background.fill.solid(); s.background.fill.fore_color.rgb = bg
        return s

    def text(slide, s, x, y, w, h, size, bold=False, link=None):
        tb = slide.shapes.add_textbox(x, y, w, h); tf = tb.text_frame; tf.word_wrap = True
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        p = tf.paragraphs[0]; p.alignment = PP_ALIGN.CENTER
        r = p.add_run(); r.text = s; r.font.size = Pt(size); r.font.bold = bold; r.font.color.rgb = fg
        if link:  # whole box is clickable, so the text keeps our colour
            tb.click_action.hyperlink.address = link
        return tb

    def place_picture(slide, data, bx, by, bw, bh, mode, link=None):
        jpg, w, h = prep_image(data, opts, bw / bh)
        pw, ph = fit_box(w, h, bw, bh, mode)
        pic = slide.shapes.add_picture(io.BytesIO(jpg), int(bx + (bw - pw) / 2), int(by + (bh - ph) / 2), int(pw), int(ph))
        if link:
            pic.click_action.hyperlink.address = link
        return pic

    # ---- work list: (kind, display name, notes text, source)
    items = []
    zf = zipfile.ZipFile(zip_path) if zip_path else None
    try:
        zip_items = []
        if zf:
            media = list_media(zf, opts.order)
            if opts.include is not None:
                media = [(k, i) for k, i in media if i.filename in opts.include]
            zip_items = [(k, os.path.basename(i.filename), i.filename, ("zip", i)) for k, i in media]
        extra_items = []
        for how, val in (opts.extras or []):
            if how == "file":
                ext = os.path.splitext(val)[1].lower()
                kind = "image" if ext in IMAGE_EXT else "video" if ext in VIDEO_EXT else None
                extra_items.append((kind or "bad", os.path.basename(val), val, ("path", val)))
            else:
                kind = url_media_kind(val)
                nm = os.path.basename(urllib.parse.urlparse(val).path) or val
                extra_items.append((kind or "link", nm if kind else val, val, ("url", val)))
        items = (extra_items + zip_items) if opts.extras_first else (zip_items + extra_items)
        if not items:
            raise ValueError("Nothing to add: no supported images, videos or links were chosen.")

        skipped, made = [], 0
        with tempfile.TemporaryDirectory() as tmp:
            default_title = os.path.splitext(os.path.basename(zip_path))[0] if zip_path else "Slideshow"
            title = opts.title.strip() or default_title
            prs.core_properties.title = title
            if opts.title_slide:
                text(new_slide(), title, Inches(0.8), H // 2 - Inches(1), W - Inches(1.6), Inches(2), 44, True)
            for n, (kind, name, note, (how, src)) in enumerate(items):
                say(n, len(items), f"Adding {n + 1} of {len(items)}: {name}")
                slide = None
                try:
                    if kind == "bad":
                        raise ValueError("not an image or video type")
                    if kind == "link":
                        info = fetch_link_info(src)
                        slide = new_slide()
                        bar_h = Inches(0.9)
                        if info["thumb"]:  # full-page thumbnail; clicking anywhere on it opens the link
                            place_picture(slide, info["thumb"], 0, 0, W, H - bar_h, "contain", src)
                            text(slide, f"{info['title']}  —  click to open", Inches(0.4), H - bar_h, W - Inches(0.8), bar_h, 22, True, src)
                        else:
                            text(slide, info["title"], Inches(0.6), H / 2 - Inches(1.2), W - Inches(1.2), Inches(1.4), 40, True, src)
                            text(slide, "Click to open: " + src, Inches(0.6), H / 2 + Inches(0.3), W - Inches(1.2), Inches(0.7), 16, False, src)
                        name = info["title"]
                    elif kind == "image":
                        if how == "zip":
                            if src.file_size > MAX_ZIP_MEMBER:
                                raise ValueError("file too large")
                            data = zf.read(src)
                        elif how == "path":
                            with open(src, "rb") as f:
                                data = f.read()
                        else:
                            p = download_file(src, os.path.join(tmp, f"i{n}"))
                            with open(p, "rb") as f:
                                data = f.read()
                        slide = new_slide()
                        place_picture(slide, data, 0, 0, W, box_h, opts.fit)
                    else:  # video
                        ext = os.path.splitext(name)[1].lower() or ".mp4"
                        if how == "path":
                            vpath = src
                        else:
                            vpath = os.path.join(tmp, f"v{n}{ext}")  # our own name: no path tricks
                            if how == "zip":
                                if src.file_size > MAX_ZIP_MEMBER:
                                    raise ValueError("file too large")
                                with zf.open(src) as r, open(vpath, "wb") as f:
                                    while True:
                                        chunk = r.read(1 << 20)
                                        if not chunk:
                                            break
                                        f.write(chunk)
                            else:
                                download_file(src, vpath)
                        w, h, poster = video_info(vpath)
                        slide = new_slide()
                        pw, ph = fit_box(w, h, W, box_h, "contain")
                        slide.shapes.add_movie(vpath, int((W - pw) / 2), int((box_h - ph) / 2), int(pw), int(ph),
                                               poster_frame_image=io.BytesIO(poster), mime_type=MIME.get(ext, "video/mp4"))
                    if opts.captions and kind != "link":
                        text(slide, name, Inches(0.4), H - cap_h, W - Inches(0.8), cap_h, 14)
                    if opts.notes:
                        slide.notes_slide.notes_text_frame.text = note
                    made += 1
                except Exception as e:  # skip unreadable items but keep going
                    skipped.append(f"{name} ({e})")
                    if slide is not None:
                        _drop_last(prs)
            say(len(items), len(items), "Saving…")
            prs.save(out_path)  # must happen before temp videos are deleted
    finally:
        if zf:
            zf.close()
    return made, skipped


def _drop_last(prs):
    ids = prs.slides._sldIdLst
    prs.part.drop_rel(ids[-1].rId)
    ids.remove(ids[-1])


# ---------------------------------------------------------------- GUI
def human(n):
    return f"{n / 1048576:.1f} MB" if n >= 1048576 else f"{max(1, n // 1024)} KB"


def run_gui(initial_zip=None):
    import threading
    import tkinter as tk
    from tkinter import colorchooser, filedialog, messagebox, ttk

    root = tk.Tk()
    root.title("Slideshow Maker")
    try:  # window / taskbar icon; the file sits beside the script or inside the exe
        here = getattr(sys, "_MEIPASS", os.path.dirname(os.path.abspath(__file__)))
        root.iconphoto(True, tk.PhotoImage(file=os.path.join(here, "icon.png")))
    except Exception:
        pass
    root.minsize(600, 0)
    tmp = tempfile.TemporaryDirectory(prefix="slideshow_")
    root.protocol("WM_DELETE_WINDOW", lambda: (tmp.cleanup(), root.destroy()))
    pad = {"padx": 8, "pady": 3}
    import queue
    jobs = queue.Queue()

    def ui(fn):  # worker threads hand work to the main thread through this queue
        jobs.put(fn)

    def pump():
        try:
            while True:
                jobs.get_nowait()()
        except queue.Empty:
            pass
        root.after(100, pump)
    root.after(100, pump)
    st = {"zip": None, "rows": [], "locs": parse_locations(load_locations_text())}

    frm = ttk.Frame(root, padding=10); frm.pack(fill="both", expand=True)
    frm.columnconfigure(0, weight=1)

    # --- 1. source
    src = ttk.LabelFrame(frm, text="1. Choose where the files come from", padding=8)
    src.grid(row=0, column=0, sticky="we", **pad); src.columnconfigure(1, weight=1)
    ttk.Label(src, text="Location").grid(row=0, column=0, sticky="w")
    loc = tk.StringVar()
    loc_box = ttk.Combobox(src, textvariable=loc, state="readonly")
    loc_box.grid(row=0, column=1, sticky="we", padx=8)
    dl_btn = ttk.Button(src, text="Download folder")
    dl_btn.grid(row=0, column=2)
    ed_btn = ttk.Button(src, text="Edit locations…")
    ed_btn.grid(row=0, column=3, padx=(8, 0))
    ttk.Label(src, text="or a zip").grid(row=1, column=0, sticky="w")
    zp = tk.StringVar()
    ttk.Entry(src, textvariable=zp).grid(row=1, column=1, sticky="we", padx=8, pady=4)
    zb = ttk.Button(src, text="Choose…"); zb.grid(row=1, column=2)

    def refresh_locs():
        st["locs"] = parse_locations(load_locations_text())
        loc_box["values"] = [n for n, _ in st["locs"]]
        if st["locs"] and loc.get() not in loc_box["values"]:
            loc.set(st["locs"][0][0])
        dl_btn.config(state="normal" if st["locs"] else "disabled")
    refresh_locs()

    # --- 2. add your own
    own = ttk.LabelFrame(frm, text="2. Add your own videos, images or links (optional)", padding=8)
    own.grid(row=1, column=0, sticky="we", **pad); own.columnconfigure(1, weight=1)
    ttk.Button(own, text="Add files from this computer…", command=lambda: add_files()).grid(row=0, column=0, sticky="w")
    link = tk.StringVar()
    ttk.Label(own, text="Link").grid(row=1, column=0, sticky="w")
    le = ttk.Entry(own, textvariable=link); le.grid(row=1, column=1, sticky="we", padx=8, pady=4)
    ttk.Button(own, text="Add link", command=lambda: add_link()).grid(row=1, column=2)
    ttk.Label(own, wraplength=540, justify="left", foreground="#666666", text=(
        "YouTube and other web links become a full-page slide you click to open in the browser. "
        "Nothing is downloaded from YouTube. A link straight to a .mp4 or .jpg file is downloaded and embedded.")
    ).grid(row=2, column=0, columnspan=3, sticky="w")
    where = tk.StringVar(value="after the folder's files")
    ttk.Label(own, text="Added items go").grid(row=3, column=0, sticky="w", pady=(4, 0))
    ttk.Combobox(own, textvariable=where, values=["after the folder's files", "before the folder's files"],
                 state="readonly", width=26).grid(row=3, column=1, sticky="w", padx=8, pady=(4, 0))

    # --- file picker
    pick = ttk.LabelFrame(frm, text="3. Tick what to include", padding=8)
    pick.grid(row=2, column=0, sticky="we", **pad); pick.columnconfigure(0, weight=1)
    cv = tk.Canvas(pick, height=170, highlightthickness=0)
    sb = ttk.Scrollbar(pick, orient="vertical", command=cv.yview)
    inner = ttk.Frame(cv)
    inner.bind("<Configure>", lambda e: cv.configure(scrollregion=cv.bbox("all")))
    cv.create_window((0, 0), window=inner, anchor="nw"); cv.configure(yscrollcommand=sb.set)
    cv.grid(row=0, column=0, sticky="we"); sb.grid(row=0, column=1, sticky="ns")
    cv.bind_all("<MouseWheel>", lambda e: cv.yview_scroll(-1 * (e.delta // 120), "units"))
    tools = ttk.Frame(pick); tools.grid(row=1, column=0, columnspan=2, sticky="w", pady=(6, 0))
    count = ttk.Label(pick, text="Nothing added yet."); count.grid(row=2, column=0, sticky="w")

    def render_rows():
        for w in inner.winfo_children():
            w.destroy()
        for r in st["rows"]:
            ttk.Checkbutton(inner, text=r["label"], variable=r["var"], command=update_count).pack(anchor="w")
        update_count()

    def add_row(src, name, label, value):
        st["rows"].append({"src": src, "name": name, "label": label, "value": value, "var": tk.BooleanVar(value=True)})

    def set_all(on):
        for r in st["rows"]:
            r["var"].set(on)
        update_count()

    def prefer(q):
        drop = quality_unticks([r["name"] for r in st["rows"]], q)
        if not drop:
            messagebox.showinfo("Slideshow Maker", "No file names contain HQ or LQ, so tick the ones you want by hand.")
            return
        for r in st["rows"]:
            r["var"].set(r["name"] not in drop)
        update_count()

    def clear_added():
        st["rows"] = [r for r in st["rows"] if r["src"] == "zip"]
        render_rows()

    ttk.Button(tools, text="Tick all", command=lambda: set_all(True)).pack(side="left")
    ttk.Button(tools, text="Untick all", command=lambda: set_all(False)).pack(side="left", padx=6)
    ttk.Button(tools, text="Use HQ versions", command=lambda: prefer("HQ")).pack(side="left")
    ttk.Button(tools, text="Use LQ versions", command=lambda: prefer("LQ")).pack(side="left", padx=6)
    ttk.Button(tools, text="Remove added items", command=clear_added).pack(side="left")

    def update_count():
        n = sum(r["var"].get() for r in st["rows"])
        count.config(text=f"{n} of {len(st['rows'])} items ticked." if st["rows"] else "Nothing added yet.")
        go.config(state="normal" if n else "disabled")

    def load_zip(path):
        try:
            media = describe_media(path, "name")
        except Exception as e:
            messagebox.showerror("Slideshow Maker", f"Could not read that zip: {e}"); return
        if not media:
            messagebox.showwarning("Slideshow Maker", "No supported images or videos in that zip."); return
        st["zip"] = path
        extras = [r for r in st["rows"] if r["src"] != "zip"]
        st["rows"] = []
        for name, kind, size in media:
            add_row("zip", os.path.basename(name), f"[{kind}]  {os.path.basename(name)}   ({human(size)})", name)
        st["rows"] += extras
        render_rows()
        status.config(text="Files loaded. Tick the ones you want, then create the PowerPoint.")

    def add_files():
        paths = filedialog.askopenfilenames(title="Choose videos or images", filetypes=[
            ("Videos and images", " ".join("*" + e for e in sorted(IMAGE_EXT | VIDEO_EXT))), ("All files", "*.*")])
        for p in paths:
            k = "video" if os.path.splitext(p)[1].lower() in VIDEO_EXT else "image"
            add_row("file", os.path.basename(p), f"[{k}]  {os.path.basename(p)}   ({human(os.path.getsize(p))})  — from this computer", p)
        render_rows()

    def add_link():
        u = link.get().strip()
        if not re.match(r"^https?://\S+$", u):
            messagebox.showwarning("Slideshow Maker", "Paste a full link that starts with http:// or https://"); return
        kind = url_media_kind(u)
        tag = {"image": "[image link]", "video": "[video link]"}.get(kind, "[web link]")
        add_row("url", os.path.basename(u) or u, f"{tag}  {u}", u)
        link.set(""); render_rows()
    le.bind("<Return>", lambda e: add_link())

    def choose_zip():
        p = filedialog.askopenfilename(filetypes=[("Zip files", "*.zip")])
        if p:
            zp.set(p); load_zip(p)
    zb.config(command=choose_zip)

    def edit_locations():
        win = tk.Toplevel(root); win.title("Locations"); win.transient(root)
        ttk.Label(win, wraplength=520, justify="left", text=(
            "One location per line, written as:   Name | Dropbox folder link\n"
            "Example:   Cape Town | https://www.dropbox.com/scl/fo/abc123/xyz?rlkey=...&dl=0")
        ).pack(padx=10, pady=8, anchor="w")
        box = tk.Text(win, width=80, height=16); box.pack(padx=10, fill="both", expand=True)
        box.insert("1.0", load_locations_text())

        def save():
            save_locations_text(box.get("1.0", "end").strip() + "\n")
            refresh_locs(); win.destroy()
        ttk.Button(win, text="Save", command=save).pack(pady=8)
    ed_btn.config(command=edit_locations)

    def download():
        name = loc.get(); url = dict(st["locs"]).get(name)
        if not url:
            return
        dest = os.path.join(tmp.name, "folder.zip")
        dl_btn.config(state="disabled"); zb.config(state="disabled")
        status.config(text=f"Downloading {name}…")

        def prog(done, total):
            ui(lambda: (bar.config(value=100 * done / total if total else 0),
                                   status.config(text=f"Downloading {name}: {human(done)}" + (f" of {human(total)}" if total else ""))))

        def work():
            try:
                download_zip(url, dest, prog)
                ui(lambda: (zp.set(f"{name} (downloaded)"), load_zip(dest)))
            except Exception as e:
                ui(lambda: (status.config(text="Download failed."), messagebox.showerror("Slideshow Maker", f"Could not download {name}:\n{e}")))
            finally:
                ui(lambda: (dl_btn.config(state="normal"), zb.config(state="normal"), bar.config(value=0)))
        threading.Thread(target=work, daemon=True).start()
    dl_btn.config(command=download)

    # --- 3. options
    op = ttk.LabelFrame(frm, text="4. Options", padding=8)
    op.grid(row=3, column=0, sticky="we", **pad)
    title = tk.StringVar(); bgc = tk.StringVar(value="#000000")
    order = tk.StringVar(value="File name"); fit = tk.StringVar(value="Fit whole picture"); size = tk.StringVar(value="2560")
    b = {k: tk.BooleanVar(value=d) for k, d in (("title_slide", True), ("captions", False), ("notes", False), ("wide", True))}
    ttk.Label(op, text="Presentation title (optional)").grid(row=0, column=0, sticky="w")
    ttk.Entry(op, textvariable=title, width=34).grid(row=0, column=1, columnspan=2, sticky="we", padx=8, pady=2)
    for r, (lab, var, vals) in enumerate((("Order", order, ["File name", "Date in zip", "Order in zip"]),
                                          ("Image fit", fit, ["Fit whole picture", "Fill slide (crops edges)"]),
                                          ("Max image size (px)", size, ["1920", "2560", "Original"])), start=1):
        ttk.Label(op, text=lab).grid(row=r, column=0, sticky="w")
        ttk.Combobox(op, textvariable=var, values=vals, state="readonly", width=26).grid(row=r, column=1, padx=8, pady=2, sticky="w")
    bgb = ttk.Button(op, text="Background colour…"); bgb.grid(row=4, column=0, sticky="w", pady=2)
    bgl = tk.Label(op, textvariable=bgc, width=10, bg="#000000", fg="#ffffff"); bgl.grid(row=4, column=1, sticky="w", padx=8)

    def pick_bg():
        c = colorchooser.askcolor(color=bgc.get())[1]
        if c:
            bgc.set(c); bgl.config(bg=c, fg="#111111" if sum(int(c[i:i + 2], 16) for i in (1, 3, 5)) > 450 else "#ffffff")
    bgb.config(command=pick_bg)
    for r, (lab, k) in enumerate((("Add a title slide", "title_slide"), ("Widescreen 16:9", "wide"),
                                  ("Caption each slide with its file name", "captions"),
                                  ("Put file name in speaker notes", "notes")), start=5):
        ttk.Checkbutton(op, text=lab, variable=b[k]).grid(row=r, column=0, columnspan=3, sticky="w")

    # --- 4. create
    bar = ttk.Progressbar(frm, maximum=100); bar.grid(row=4, column=0, sticky="we", **pad)
    status = ttk.Label(frm, text="", wraplength=560); status.grid(row=5, column=0, sticky="w", **pad)
    go = ttk.Button(frm, text="Create PowerPoint", state="disabled"); go.grid(row=6, column=0, pady=6)

    def on_progress(d, t, txt):
        ui(lambda: (bar.config(value=100 * d / max(t, 1)), status.config(text=txt)))

    def work(zpath, out, o):
        try:
            made, skipped = build(zpath, out, o, on_progress)
            note = f"\n\nSkipped {len(skipped)}:\n" + "\n".join(skipped[:8]) if skipped else ""
            ui(lambda: (status.config(text=f"Done: {made} slides."), messagebox.showinfo("Slideshow Maker", f"Saved {out}{note}")))
        except Exception as e:
            ui(lambda: (status.config(text="Failed."), messagebox.showerror("Slideshow Maker", str(e))))
        finally:
            ui(lambda: go.config(state="normal"))

    def start():
        zip_names = {r["value"] for r in st["rows"] if r["src"] == "zip" and r["var"].get()}
        extras = [("file" if r["src"] == "file" else "url", r["value"]) for r in st["rows"] if r["src"] != "zip" and r["var"].get()]
        if not zip_names and not extras:
            messagebox.showwarning("Slideshow Maker", "Tick at least one item."); return
        zpath = st["zip"] if zip_names else None
        if "(downloaded)" in zp.get():
            stem = loc.get()
        elif zp.get():
            stem = os.path.splitext(os.path.basename(zp.get()))[0]
        else:
            stem = "Slideshow"
        out = filedialog.asksaveasfilename(defaultextension=".pptx", initialfile=f"{stem}.pptx", filetypes=[("PowerPoint", "*.pptx")])
        if not out:
            return
        o = Options(title=title.get() or stem, title_slide=b["title_slide"].get(),
                    order={"File name": "name", "Date in zip": "date", "Order in zip": "zip"}[order.get()],
                    fit="cover" if fit.get().startswith("Fill") else "contain", widescreen=b["wide"].get(),
                    background=bgc.get().lstrip("#"), max_px=0 if size.get() == "Original" else int(size.get()),
                    captions=b["captions"].get(), notes=b["notes"].get(), include=zip_names,
                    extras=extras, extras_first=where.get().startswith("before"))
        go.config(state="disabled")
        threading.Thread(target=work, args=(zpath, out, o), daemon=True).start()
    go.config(command=start)

    if initial_zip:
        zp.set(initial_zip); load_zip(initial_zip)
    root.mainloop()


def _cli(args):
    """slideshow_maker.py in.zip out.pptx
       slideshow_maker.py --url <Dropbox folder link> out.pptx [--prefer HQ|LQ]
       add  --add <file or link>  (repeatable) to either form"""
    prefer, extras = None, []
    while "--add" in args:  # repeatable: a local file or a link
        i = args.index("--add"); v = args[i + 1]; del args[i:i + 2]
        extras.append(("url" if re.match(r"^https?://", v) else "file", v))
    if "--prefer" in args:
        i = args.index("--prefer"); prefer = args[i + 1]; del args[i:i + 2]
    with tempfile.TemporaryDirectory() as tmp:
        if args[0] == "--url":
            src = download_zip(args[1], os.path.join(tmp, "folder.zip"), lambda d, t: print(f"\rdownloaded {human(d)}", end=""))
            print(); out = args[2]
        else:
            src, out = args[0], args[1]
        o = Options(extras=extras or None)
        if prefer:
            names = [n for n, _, _ in describe_media(src)]
            o.include = set(names) - quality_unticks(names, prefer)
        n, sk = build(src, out, o, lambda d, t, s: print(s))
    print(f"{n} slides" + (f", skipped: {sk}" if sk else ""))


if __name__ == "__main__":
    a = sys.argv[1:]
    if a and (a[0] == "--url" or (a[0].lower().endswith(".zip") and len(a) >= 2)):
        _cli(a)
    else:
        run_gui(a[0] if a and a[0].lower().endswith(".zip") else None)

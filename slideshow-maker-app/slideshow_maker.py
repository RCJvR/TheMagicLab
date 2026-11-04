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


def download_zip(url, dest, progress=None, check_host=True):
    """Download url to dest and check the result really is a zip."""
    if check_host:
        url = dropbox_zip_url(url)
    req = urllib.request.Request(url, headers={"User-Agent": "SlideshowMaker/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r, open(dest, "wb") as f:
        total = int(r.headers.get("Content-Length") or 0)
        done = 0
        while True:
            chunk = r.read(1 << 20)
            if not chunk:
                break
            f.write(chunk)
            done += len(chunk)
            if progress:
                progress(done, total)
    if not zipfile.is_zipfile(dest):
        raise ValueError("Dropbox did not send a zip. The folder may be too large to download "
                         "as one file, or the link may not be a public shared folder.")
    return dest


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
    """Build the presentation. progress(done, total, text) is optional.
    Returns (slides_made, [skipped file names])."""
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

    def text(slide, s, x, y, w, h, size, bold=False):
        tb = slide.shapes.add_textbox(x, y, w, h); tf = tb.text_frame; tf.word_wrap = True
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        p = tf.paragraphs[0]; p.alignment = PP_ALIGN.CENTER
        r = p.add_run(); r.text = s; r.font.size = Pt(size); r.font.bold = bold; r.font.color.rgb = fg

    skipped, made = [], 0
    with zipfile.ZipFile(zip_path) as zf, tempfile.TemporaryDirectory() as tmp:
        media = list_media(zf, opts.order)
        if opts.include is not None:
            media = [(k, i) for k, i in media if i.filename in opts.include]
        if not media:
            raise ValueError("No supported images or videos were found in that zip.")
        title = opts.title.strip() or os.path.splitext(os.path.basename(zip_path))[0]
        prs.core_properties.title = title
        if opts.title_slide:
            text(new_slide(), title, Inches(0.8), H // 2 - Inches(1), W - Inches(1.6), Inches(2), 44, True)
        for n, (kind, info) in enumerate(media):
            base = os.path.basename(info.filename)
            say(n, len(media), f"Adding {n + 1} of {len(media)}: {base}")
            slide = None
            try:
                if info.file_size > MAX_ZIP_MEMBER:
                    raise ValueError("file too large")
                data = zf.read(info)
                slide = new_slide()
                if kind == "image":
                    jpg, w, h = prep_image(data, opts, W / box_h)
                    pw, ph = fit_box(w, h, W, box_h, opts.fit)
                    slide.shapes.add_picture(io.BytesIO(jpg), int((W - pw) / 2), int((box_h - ph) / 2), int(pw), int(ph))
                else:
                    ext = os.path.splitext(base)[1].lower()
                    vpath = os.path.join(tmp, f"v{n}{ext}")  # our own name: no path tricks from the zip
                    with open(vpath, "wb") as f:
                        f.write(data)
                    w, h, poster = video_info(vpath)
                    pw, ph = fit_box(w, h, W, box_h, "contain")
                    slide.shapes.add_movie(vpath, int((W - pw) / 2), int((box_h - ph) / 2), int(pw), int(ph),
                                           poster_frame_image=io.BytesIO(poster), mime_type=MIME.get(ext, "video/mp4"))
                if opts.captions:
                    text(slide, base, Inches(0.4), H - cap_h, W - Inches(0.8), cap_h, 14)
                if opts.notes:
                    slide.notes_slide.notes_text_frame.text = info.filename
                made += 1
            except Exception as e:  # skip unreadable files but keep going
                skipped.append(f"{base} ({e})")
                if slide is not None:
                    _drop_last(prs)
        say(len(media), len(media), "Saving…")
        prs.save(out_path)  # must happen before temp videos are deleted
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
    st = {"zip": None, "checks": {}, "locs": parse_locations(load_locations_text())}

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

    # --- 2. file picker
    pick = ttk.LabelFrame(frm, text="2. Tick the files to include", padding=8)
    pick.grid(row=1, column=0, sticky="we", **pad); pick.columnconfigure(0, weight=1)
    cv = tk.Canvas(pick, height=170, highlightthickness=0)
    sb = ttk.Scrollbar(pick, orient="vertical", command=cv.yview)
    inner = ttk.Frame(cv)
    inner.bind("<Configure>", lambda e: cv.configure(scrollregion=cv.bbox("all")))
    cv.create_window((0, 0), window=inner, anchor="nw"); cv.configure(yscrollcommand=sb.set)
    cv.grid(row=0, column=0, sticky="we"); sb.grid(row=0, column=1, sticky="ns")
    cv.bind_all("<MouseWheel>", lambda e: cv.yview_scroll(-1 * (e.delta // 120), "units"))
    tools = ttk.Frame(pick); tools.grid(row=1, column=0, columnspan=2, sticky="w", pady=(6, 0))
    count = ttk.Label(pick, text="No files loaded yet."); count.grid(row=2, column=0, sticky="w")

    def set_all(on):
        for v in st["checks"].values():
            v.set(on)
        update_count()

    def prefer(q):
        names = list(st["checks"])
        drop = quality_unticks(names, q)
        if not drop:
            messagebox.showinfo("Slideshow Maker", "No file names contain HQ or LQ, so tick the ones you want by hand.")
            return
        for n in names:
            st["checks"][n].set(n not in drop)
        update_count()

    ttk.Button(tools, text="Tick all", command=lambda: set_all(True)).pack(side="left")
    ttk.Button(tools, text="Untick all", command=lambda: set_all(False)).pack(side="left", padx=6)
    ttk.Button(tools, text="Use HQ versions", command=lambda: prefer("HQ")).pack(side="left")
    ttk.Button(tools, text="Use LQ versions", command=lambda: prefer("LQ")).pack(side="left", padx=6)

    def update_count():
        n = sum(v.get() for v in st["checks"].values())
        count.config(text=f"{n} of {len(st['checks'])} files ticked." if st["checks"] else "No files loaded yet.")
        go.config(state="normal" if n else "disabled")

    def load_zip(path):
        try:
            media = describe_media(path, "name")
        except Exception as e:
            messagebox.showerror("Slideshow Maker", f"Could not read that zip: {e}"); return
        if not media:
            messagebox.showwarning("Slideshow Maker", "No supported images or videos in that zip."); return
        st["zip"] = path; st["checks"] = {}
        for w in inner.winfo_children():
            w.destroy()
        for name, kind, size in media:
            var = tk.BooleanVar(value=True); st["checks"][name] = var
            label = f"{'[video]' if kind == 'video' else '[image]'}  {os.path.basename(name)}   ({human(size)})"
            ttk.Checkbutton(inner, text=label, variable=var, command=update_count).pack(anchor="w")
        update_count()
        status.config(text="Files loaded. Tick the ones you want, then create the PowerPoint.")

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
    op = ttk.LabelFrame(frm, text="3. Options", padding=8)
    op.grid(row=2, column=0, sticky="we", **pad)
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
    bar = ttk.Progressbar(frm, maximum=100); bar.grid(row=3, column=0, sticky="we", **pad)
    status = ttk.Label(frm, text="", wraplength=560); status.grid(row=4, column=0, sticky="w", **pad)
    go = ttk.Button(frm, text="Create PowerPoint", state="disabled"); go.grid(row=5, column=0, pady=6)

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
        chosen = {n for n, v in st["checks"].items() if v.get()}
        if not st["zip"] or not chosen:
            messagebox.showwarning("Slideshow Maker", "Choose a location or zip and tick at least one file."); return
        stem = loc.get() if "(downloaded)" in zp.get() else os.path.splitext(os.path.basename(zp.get()))[0]
        out = filedialog.asksaveasfilename(defaultextension=".pptx", initialfile=f"{stem}.pptx", filetypes=[("PowerPoint", "*.pptx")])
        if not out:
            return
        o = Options(title=title.get() or stem, title_slide=b["title_slide"].get(),
                    order={"File name": "name", "Date in zip": "date", "Order in zip": "zip"}[order.get()],
                    fit="cover" if fit.get().startswith("Fill") else "contain", widescreen=b["wide"].get(),
                    background=bgc.get().lstrip("#"), max_px=0 if size.get() == "Original" else int(size.get()),
                    captions=b["captions"].get(), notes=b["notes"].get(), include=chosen)
        go.config(state="disabled")
        threading.Thread(target=work, args=(st["zip"], out, o), daemon=True).start()
    go.config(command=start)

    if initial_zip:
        zp.set(initial_zip); load_zip(initial_zip)
    root.mainloop()


def _cli(args):
    """slideshow_maker.py in.zip out.pptx
       slideshow_maker.py --url <Dropbox folder link> out.pptx [--prefer HQ|LQ]"""
    prefer = None
    if "--prefer" in args:
        i = args.index("--prefer"); prefer = args[i + 1]; del args[i:i + 2]
    with tempfile.TemporaryDirectory() as tmp:
        if args[0] == "--url":
            src = download_zip(args[1], os.path.join(tmp, "folder.zip"), lambda d, t: print(f"\rdownloaded {human(d)}", end=""))
            print(); out = args[2]
        else:
            src, out = args[0], args[1]
        o = Options()
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

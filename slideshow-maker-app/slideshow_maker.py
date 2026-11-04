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
def run_gui(initial_zip=None):
    import threading
    import tkinter as tk
    from tkinter import colorchooser, filedialog, messagebox, ttk

    root = tk.Tk()
    root.title("Slideshow Maker")
    root.minsize(520, 0)
    pad = {"padx": 10, "pady": 4}
    v = {k: tk.StringVar() for k in ("zip", "title", "bg")}
    v["bg"].set("#000000")
    b = {k: tk.BooleanVar(value=d) for k, d in
         (("title_slide", True), ("captions", False), ("notes", False), ("wide", True))}
    order = tk.StringVar(value="File name"); fit = tk.StringVar(value="Fit whole picture")
    size = tk.StringVar(value="2560")

    frm = ttk.Frame(root, padding=12); frm.pack(fill="both", expand=True)
    ttk.Label(frm, text="Zip of images and videos").grid(row=0, column=0, sticky="w", **pad)
    ttk.Entry(frm, textvariable=v["zip"], width=46).grid(row=1, column=0, sticky="we", **pad)
    ttk.Button(frm, text="Choose…", command=lambda: v["zip"].set(
        filedialog.askopenfilename(filetypes=[("Zip files", "*.zip")]) or v["zip"].get())).grid(row=1, column=1, **pad)
    ttk.Label(frm, text="Presentation title (optional)").grid(row=2, column=0, sticky="w", **pad)
    ttk.Entry(frm, textvariable=v["title"]).grid(row=3, column=0, columnspan=2, sticky="we", **pad)
    opt = ttk.Frame(frm); opt.grid(row=4, column=0, columnspan=2, sticky="we", **pad)
    for r, (lab, var, vals) in enumerate((("Order", order, ["File name", "Date in zip", "Order in zip"]),
                                          ("Image fit", fit, ["Fit whole picture", "Fill slide (crops edges)"]),
                                          ("Max image size (px)", size, ["1920", "2560", "Original"]))):
        ttk.Label(opt, text=lab).grid(row=r, column=0, sticky="w", pady=2)
        ttk.Combobox(opt, textvariable=var, values=vals, state="readonly", width=26).grid(row=r, column=1, padx=10)
    bgb = ttk.Button(opt, text="Background colour…")
    bgb.grid(row=3, column=0, sticky="w", pady=2)
    bgl = tk.Label(opt, textvariable=v["bg"], width=10, bg="#000000", fg="#ffffff"); bgl.grid(row=3, column=1, sticky="w", padx=10)

    def pick():
        c = colorchooser.askcolor(color=v["bg"].get())[1]
        if c:
            v["bg"].set(c); bgl.config(bg=c, fg="#111111" if sum(int(c[i:i + 2], 16) for i in (1, 3, 5)) > 450 else "#ffffff")
    bgb.config(command=pick)
    for r, (lab, k) in enumerate((("Add a title slide", "title_slide"), ("Widescreen 16:9", "wide"),
                                  ("Caption each slide with its file name", "captions"),
                                  ("Put file name in speaker notes", "notes"))):
        ttk.Checkbutton(frm, text=lab, variable=b[k]).grid(row=5 + r, column=0, columnspan=2, sticky="w", **pad)
    bar = ttk.Progressbar(frm, maximum=100); bar.grid(row=9, column=0, columnspan=2, sticky="we", **pad)
    status = ttk.Label(frm, text="", wraplength=480); status.grid(row=10, column=0, columnspan=2, sticky="w", **pad)
    go = ttk.Button(frm, text="Create PowerPoint"); go.grid(row=11, column=0, columnspan=2, **pad)
    frm.columnconfigure(0, weight=1)
    if initial_zip:
        v["zip"].set(initial_zip)

    def on_progress(d, t, txt):
        root.after(0, lambda: (bar.config(value=100 * d / max(t, 1)), status.config(text=txt)))

    def work(zp, out, o):
        try:
            made, skipped = build(zp, out, o, on_progress)
            note = f"\n\nSkipped {len(skipped)}:\n" + "\n".join(skipped[:8]) if skipped else ""
            root.after(0, lambda: (status.config(text=f"Done: {made} slides."), messagebox.showinfo(
                "Slideshow Maker", f"Saved {out}{note}")))
        except Exception as e:
            root.after(0, lambda: (status.config(text="Failed."), messagebox.showerror("Slideshow Maker", str(e))))
        finally:
            root.after(0, lambda: go.config(state="normal"))

    def start():
        zp = v["zip"].get().strip()
        if not os.path.isfile(zp):
            messagebox.showwarning("Slideshow Maker", "Choose a zip file first."); return
        stem = os.path.splitext(os.path.basename(zp))[0]
        out = filedialog.asksaveasfilename(defaultextension=".pptx", initialfile=stem + ".pptx",
                                           filetypes=[("PowerPoint", "*.pptx")])
        if not out:
            return
        o = Options(title=v["title"].get(), title_slide=b["title_slide"].get(),
                    order={"File name": "name", "Date in zip": "date", "Order in zip": "zip"}[order.get()],
                    fit="cover" if fit.get().startswith("Fill") else "contain", widescreen=b["wide"].get(),
                    background=v["bg"].get().lstrip("#"), max_px=0 if size.get() == "Original" else int(size.get()),
                    captions=b["captions"].get(), notes=b["notes"].get())
        go.config(state="disabled")
        threading.Thread(target=work, args=(zp, out, o), daemon=True).start()
    go.config(command=start)
    root.mainloop()


if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) >= 1 and args[0].lower().endswith(".zip") and len(args) >= 2:
        n, sk = build(args[0], args[1], Options(), lambda d, t, s: print(s))
        print(f"{n} slides" + (f", skipped: {sk}" if sk else ""))
    else:
        run_gui(args[0] if args and args[0].lower().endswith(".zip") else None)

# Slideshow Maker

A Windows program: pick a zip of images and videos, get a PowerPoint (.pptx).
It runs entirely on your computer and has nothing to do with the website.

## Get the .exe
1. On GitHub open **Actions → Build Slideshow Maker exe → Run workflow**.
2. When it finishes, download **SlideshowMaker-windows** from the run page and unzip it.
3. Double-click `SlideshowMaker.exe`, or drag a `.zip` onto it.

Windows may warn about an unknown publisher because the exe is not code-signed.
Choose "More info → Run anyway".

## Run from source (any OS with Python 3.10+)
```
pip install -r requirements.txt
python slideshow_maker.py            # window
python slideshow_maker.py in.zip out.pptx   # no window
```

## Notes
- Images: jpg, png, gif, webp, bmp, tiff, plus iPhone HEIC. Videos: mp4, m4v, mov, wmv, avi, mpg.
- Videos are embedded in the file, so a big zip makes a big .pptx. Use the mp4 (H.264) format for
  the best chance of playing in PowerPoint.
- Files that cannot be read are skipped and listed when the build finishes.

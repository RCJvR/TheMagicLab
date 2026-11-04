# Slideshow Maker

A Windows program: pick a zip of images and videos, get a PowerPoint (.pptx).
It runs entirely on your computer and has nothing to do with the website.

## Get the .exe
1. On GitHub open **Actions → Build Slideshow Maker exe → Run workflow**.
2. When it finishes, download **SlideshowMaker-windows** from the run page and unzip it.
3. Double-click `SlideshowMaker.exe`, or drag a `.zip` onto it.

Windows may warn about an unknown publisher because the exe is not code-signed.
Choose "More info → Run anyway".

## Pulling a location straight from Dropbox
1. Click **Edit locations…** and add one line per location: `Name | Dropbox folder link`
   (for example `Cape Town | https://www.dropbox.com/scl/fo/...`). Get each link from the
   uGroup Welcome page by clicking the location and copying the Dropbox address.
   The list is saved on your computer and only needs doing once.
2. Pick a location and click **Download folder**. Dropbox sends the whole folder as one zip,
   so this takes as long as the folder is big.
3. Every image and video in the folder appears in a tick-list with its size. Untick what you
   do not want. **Use HQ versions / Use LQ versions** untick the other quality when file names
   contain `HQ` or `LQ` as a separate word; otherwise tick by hand (the larger file is the HQ one).
4. Click **Create PowerPoint**.

Command line, no window: `SlideshowMaker.exe --url "<Dropbox link>" out.pptx --prefer LQ`

Limits: the folder must be a public shared link, and Dropbox will not zip folders over roughly
20 GB or 10,000 files (you get an error message in that case).

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

# Slideshow Maker

A Windows program that builds a PowerPoint (.pptx) from images, videos and links, laid out as
two sections: **Announcements** then **Worship**. It runs on your computer and has nothing to do
with the website.

## Get the .exe
1. On GitHub open **Actions → Build Slideshow Maker exe**, open the latest run.
2. Download **SlideshowMaker-windows** from the bottom of the page and unzip it.
3. Double-click `SlideshowMaker.exe`.

Windows may warn about an unknown publisher because the exe is not code-signed.
Choose "More info → Run anyway".

## Announcements tab
1. Click **Edit locations…** once and add one line per location: `Name | Dropbox folder link`
   (for example `Cape Town | https://www.dropbox.com/scl/fo/...`). Take each link from the
   uGroup Welcome page by clicking the location and copying the Dropbox address.
2. Pick a location and click **Download folder** (Dropbox sends the whole folder as one zip).
   Or choose a zip already on your computer.
3. Every image and video appears in a tick-list with its size. Untick what you do not want.
   **Use HQ versions / Use LQ versions** untick the other quality when file names contain
   `HQ` or `LQ` as a separate word; otherwise tick by hand (the larger file is the HQ one).

## Worship tab
Add anything, in any mix. Items appear in the tick-list in the order you add them.
- **YouTube or web link**: becomes a full-page slide showing the video's thumbnail and title.
  Clicking it during the slideshow opens the video in the browser. The video or song itself is
  **not downloaded**; only the small public thumbnail and title are fetched. The computer
  showing the slides needs internet to play it.
  A **playlist** link works too: it becomes one slide for the whole playlist, and clicking it
  opens the playlist in the browser, which plays the songs one after another. (It does not
  make one slide per song.)
- A link **straight to a .mp4 / .jpg (etc.) file** is downloaded and embedded like any file.
- **Dropbox folder link**: downloads that folder and lists its files to tick, like Announcements.
- **Files from this computer**: offline videos or images. Large videos are used where they are,
  not copied into memory.

## Look
A modern Windows 11-style theme, dark by default. The **Dark** switch at the top right changes
it to light, and the choice is remembered.

## Options (whole presentation)
Title, a title slide, a **heading slide for each section** ("Announcements", "Worship"; turn off
if you do not want them), file order, image fit, slide size, background colour, captions,
file names in speaker notes. Then **Create PowerPoint**.

## Command line (no window)
```
SlideshowMaker.exe in.zip out.pptx [--add file-or-link ...]
SlideshowMaker.exe --url "<Dropbox link>" out.pptx --prefer LQ [--add ...]
```

## Notes
- Images: jpg, png, gif, webp, bmp, tiff, plus iPhone HEIC. Videos: mp4, m4v, mov, wmv, avi, mpg.
- Videos are embedded, so big sources make a big .pptx. mp4 (H.264) plays best in PowerPoint.
- Dropbox will not zip folders over roughly 20 GB or 10,000 files (you get an error message).
- Files that cannot be read are skipped and listed when the build finishes.

## Run from source (any OS with Python 3.10+)
```
pip install -r requirements.txt
python slideshow_maker.py
```

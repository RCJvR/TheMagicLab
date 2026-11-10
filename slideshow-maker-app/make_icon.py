"""Draws the Slideshow Maker icon (icon.ico and icon.png). Run: python make_icon.py"""
from PIL import Image, ImageDraw

S = 1024  # draw large, then shrink for smooth edges
img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
d = ImageDraw.Draw(img)
d.rounded_rectangle((32, 32, S - 32, S - 32), radius=210, fill=(20, 24, 33, 255))      # tile
d.rounded_rectangle((250, 190, 840, 600), radius=48, fill=(72, 84, 112, 255))          # slide behind
d.rounded_rectangle((184, 270, 774, 680), radius=48, fill=(110, 124, 156, 255))        # slide middle
d.rounded_rectangle((118, 350, 708, 760), radius=48, fill=(255, 140, 58, 255))         # front slide
cx, cy = 413, 555
d.polygon([(cx - 68, cy - 98), (cx - 68, cy + 98), (cx + 104, cy)], fill=(255, 255, 255, 255))  # play
img.save("icon.png")
img.resize((256, 256), Image.LANCZOS).save("icon.ico", sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])

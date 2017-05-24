# webkid website

## How to create the teaser images and videos?

1. Produce a teaser video (with QuickTime + iMovie for example)
2. Convert this video to webm and mp4 with ffmpeg

```
# convert to mp4 without audio
ffmpeg -an -i input.mp4 -vcodec libx264 -pix_fmt yuv420p -profile:v baseline -level 3 output.mp4

# convert to webm
ffmpeg -an -i input.mp4 -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis output.webm
```

3. Extract first frame to use as a placeholder image

```
ffmpeg -ss 00:00:00 -i input.mp4 -vframes 1 -q:v 2 output.jpg
```

4. Extract frames to create a gif

```
mkdir -p frames

# -ss is the start time in seconds
ffmpeg -i input.mp4 -ss 10 -t 10 -vf scale=480:-1:flags=lanczos,fps=5 frames/ffout%03d.png
```

5. Create fallback gif for mobile devices with ImageMagick

```
convert -loop 0 frames/ffout*.png output.gif
```
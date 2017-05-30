# webkid website

## How to create the teaser images and videos?

1. Produce a teaser video (with QuickTime + iMovie for example)
2. Convert this video to webm and mp4 with ffmpeg

```
# convert to mp4 without audio
ffmpeg -an -i raw/skyline169.mp4 -filter:v "scale=1002:-1" -vcodec libx264 -pix_fmt yuv420p -profile:v baseline -level 3 output/skyline.mp4

# convert to webm
ffmpeg -i raw/skyline169.mp4 -filter:v "scale=1002:-1" -c:v libvpx -qmin 0 -qmax 50 -crf 5 -b:v 1M -c:a libvorbis output/skyline.webm
```

3. Extract first frame to use as a placeholder image

```
ffmpeg -ss 00:00:00 -i output/skyline.mp4 -vframes 1 -q:v 2 output/skyline.jpg
```

4. Extract frames to create a gif

```
mkdir -p frames

# -ss is the start time in seconds
ffmpeg -i raw/skyline169.mp4 -ss 0 -t 8 -vf scale=480:-1:flags=lanczos,fps=5 frames/skyline%03d.png
```

5. Create fallback gif for mobile devices with ImageMagick

```
convert -loop 0 frames/skyline*.png output.gif
```
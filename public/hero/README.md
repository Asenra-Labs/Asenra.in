# Hero background video

Drop the hero footage here. `Hero.tsx` looks for these exact names:

| File | Required | Notes |
|---|---|---|
| `asenra-hero.mp4` | yes | H.264/AAC-free (the track is muted, so strip audio entirely). |
| `asenra-hero.webm` | optional | VP9. Served first where supported; usually 30-40% smaller. |
| `asenra-hero-poster.jpg` | recommended | First frame. Shows before the video decodes, and is what `prefers-reduced-motion` users see. |

## Encoding targets

The video is rendered greyscale at 35% opacity under a scrim, so detail and
colour fidelity are wasted bytes. Optimise hard:

- **1920x1080 max**, 24-30fps, 8-12 seconds, seamless loop.
- **Under 3 MB.** It competes with LCP; treat 3 MB as a ceiling, not a target.
- **No audio track.** It is muted and never unmuted.
- Slow, abstract movement. Anything with cuts or fast motion fights the
  headline for attention.

```bash
# strip audio, greyscale-friendly bitrate, faststart for progressive playback
ffmpeg -i source.mov -an -vf "scale=1920:-2,fps=30" \
  -c:v libx264 -crf 30 -preset slow -movflags +faststart public/hero/asenra-hero.mp4

ffmpeg -i source.mov -an -vf "scale=1920:-2,fps=30" \
  -c:v libvpx-vp9 -crf 40 -b:v 0 public/hero/asenra-hero.webm

ffmpeg -i source.mov -vframes 1 -q:v 4 public/hero/asenra-hero-poster.jpg
```

Until a file lands here the `<video>` renders transparent and the CSS mesh
behind it shows through, so the hero still looks finished.

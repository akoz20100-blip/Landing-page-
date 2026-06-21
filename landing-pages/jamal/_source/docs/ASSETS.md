# Assets — Manifest & Encoding

Drop all media in `public/assets/`. The code references these exact paths.

## Required files

| Path | Used by | Spec |
|---|---|---|
| `/assets/model-360.mp4` | Hero (ScrollVideo) | 360 rotation of the model. 1080px wide, ~5–8s, 30fps, H.264, muted. Encode per below. |
| `/assets/model-360-poster.jpg` | Hero poster (optional) | First frame, for instant paint. |
| `/assets/product-01.jpg` | Showcase | Square, ≥1600px. |
| `/assets/gallery/01.jpg … 04.jpg` | Gallery | Portrait, ≥1400px tall. |
| `/assets/og_image.jpg` | Social share (add to index.html) | 1200×630. |
| `/favicon.svg` | Tab icon | Brand mark. |

## The 360 rotation video — encoding (critical)

Scroll-scrubbing reads `video.currentTime`. For smooth seeking you need **dense
keyframes**, otherwise it stutters. Encode the raw clip like this:

```bash
# Smooth + reasonable size: keyframe every 6 frames
ffmpeg -i raw-360.mov -an \
  -vf "fps=30,scale=1080:-2" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -g 6 -keyint_min 6 -sc_threshold 0 -crf 20 \
  -movflags +faststart \
  public/assets/model-360.mp4
```

```bash
# Maximum smoothness (every frame is a keyframe; larger file) — use if scrub still stutters
ffmpeg -i raw-360.mov -an -vf "fps=30,scale=1080:-2" \
  -c:v libx264 -pix_fmt yuv420p -g 1 -keyint_min 1 -sc_threshold 0 -crf 20 \
  -movflags +faststart public/assets/model-360.mp4
```

```bash
# Poster (first frame)
ffmpeg -i public/assets/model-360.mp4 -frames:v 1 public/assets/model-360-poster.jpg
```

Targets: keep the final mp4 **under ~10 MB** if possible. `+faststart` lets it
start before fully downloaded.

### Shooting the clip
Turntable (model rotates) **or** camera orbit. Fixed exposure, fixed light,
locked white balance, model centered on the rotation axis, clean/seamless
background. Any wobble breaks the illusion. One full 360° in 5–8s.

## Fallback: image sequence (if iOS scrubbing stutters)

Mobile Safari sometimes throttles `currentTime`. If the hero stutters on iPhone,
switch to a frame sequence on `<canvas>`:

```bash
ffmpeg -i raw-360.mov -vf "fps=30,scale=1080:-2" public/assets/seq/frame_%03d.jpg
```

Then ask Jules to swap `ScrollVideo` for a `SequenceCanvas` that preloads the
frames and draws `frames[Math.round(progress * (N-1))]` on scroll. (Same
ScrollTrigger pin/scrub; just draw an image instead of seeking a video.)

## Optimization
Convert stills to WebP, ~80% quality. Lazy-load below-the-fold images
(`loading="lazy"`). Provide 2x only where it matters.

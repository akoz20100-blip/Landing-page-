import { useEffect, useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoProps {
  /** Path to the 360 rotation clip, e.g. "/assets/model-360.mp4" */
  src: string;
  /** Poster for instant first paint while the clip decodes. */
  poster?: string;
  /** Length of the pinned scrub, in % of viewport height. 300 = ~3 screens. */
  scrubLengthVh?: number;
  /** Receives scrub progress (0→1) every frame; null when reduced-motion. */
  onProgress?: (progress: number) => void;
  /** Overlay content (headline, etc.) drawn on top of the video. */
  children?: ReactNode;
}

/**
 * THE "360 ROTATION".
 *
 * Pins a full-screen plate and maps scroll progress → video.currentTime, so
 * scrolling literally "rotates" the model. duyucare-style hero, scroll-driven.
 *
 * - The portrait clip sits centered (object-contain) so the full figure stays
 *   visible on wide screens; a vignette seams its edges into the near-black page.
 * - The source MP4 is encoded with dense keyframes (see docs/ASSETS.md) so the
 *   currentTime seek stays smooth.
 * - Reduced-motion: no pin / no scrub — the poster frame shows statically.
 */
export default function ScrollVideo({
  src,
  poster,
  scrubLengthVh = 300,
  onProgress,
  children,
}: ScrollVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Keep the latest onProgress in a ref so the pin/scrub layout effect depends
  // only on scrubLengthVh and never rebuilds the ScrollTrigger on re-render.
  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useLayoutEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Full motion: pin + scrub the rotation.
      mm.add(MEDIA.motionOk, () => {
        const state = { t: 0 };

        // Create the pin IMMEDIATELY so its 300vh spacer exists from first paint.
        // Building it later (on loadedmetadata) pushes every section below down by
        // 300vh AFTER their pins cached their start — which left the gallery pin
        // engaging ~2600px early and opening a huge empty void on desktop. The
        // spacer length is scrubLengthVh (independent of the clip), so it's stable
        // now; the video.currentTime seek simply waits for duration to be known.
        ScrollTrigger.create({
          trigger: wrap,
          start: 'top top',
          end: `+=${scrubLengthVh}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const duration = video.duration || 0;
            if (duration) {
              const target = self.progress * duration;
              // Don't hammer currentTime with sub-frame deltas (~24fps step).
              if (Math.abs(state.t - target) > 1 / 24) {
                state.t = target;
                video.currentTime = target;
              }
            }
            onProgressRef.current?.(self.progress);
          },
        });

        // Metadata doesn't change the spacer; just recalc once to be safe.
        const onMeta = () => ScrollTrigger.refresh();
        if (video.readyState < 1) {
          video.addEventListener('loadedmetadata', onMeta, { once: true });
          return () => video.removeEventListener('loadedmetadata', onMeta);
        }
      });

      // Reduced motion: hold the front frame, no pin, no scrub.
      mm.add(MEDIA.motionReduce, () => {
        onProgressRef.current?.(0);
        try {
          video.currentTime = 0;
        } catch {
          /* metadata not ready yet — poster covers it */
        }
      });
    }, wrap);

    return () => ctx.revert();
  }, [scrubLengthVh]);

  return (
    <div ref={wrapRef} className="scroll-video-stage relative h-screen w-full overflow-hidden bg-ink">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="metadata"
        aria-hidden
        className="hero-plate absolute inset-0 h-full w-full object-contain"
      />
      <div className="hero-vignette pointer-events-none absolute inset-0 z-[1]" aria-hidden />
      <div
        className="grain pointer-events-none absolute inset-0 z-[2] opacity-[0.05]"
        aria-hidden
      />
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
}

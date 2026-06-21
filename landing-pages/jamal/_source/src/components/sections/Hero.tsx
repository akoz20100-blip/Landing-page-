import { useCallback, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollVideo from '../ScrollVideo';
import { MEDIA } from '../../lib/motion';
import { asset } from '../../lib/asset';

/**
 * HERO — the 360 rotating linen set.
 * Scroll through the pinned section to rotate the garment (scroll-scrubbed video).
 * A magazine-cover overlay (kicker, headline, scroll cue) fades out near the end
 * of the scrub so the garment owns the frame as you leave.
 */
export default function Hero() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<((p: number) => void) | null>(null);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOk, () => {
        // Intro: top bar, headline lines, and cue rise in once the curtain lifts.
        gsap.set(['.hero-top > *', '.hero-line', '.hero-cue'], { yPercent: 120, autoAlpha: 0 });

        const intro = gsap.timeline({ delay: 0.15 });
        intro
          .to('.hero-top > *', {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.08,
          })
          .to(
            '.hero-line',
            { yPercent: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out', stagger: 0.12 },
            '-=0.8',
          )
          .to('.hero-cue', { yPercent: 0, autoAlpha: 1, duration: 1, ease: 'power3.out' }, '-=0.7');

        // Scroll-linked fade of the whole overlay near the end of the scrub.
        const setOpacity = gsap.quickSetter(overlay, 'opacity') as (v: number) => void;
        const setY = gsap.quickSetter(overlay, 'y', 'px') as (v: number) => void;
        fadeRef.current = (p: number) => {
          const t = gsap.utils.clamp(0, 1, (p - 0.72) / 0.28);
          setOpacity(1 - t);
          setY(-t * 40);
        };

        return () => {
          fadeRef.current = null;
        };
      });

      mm.add(MEDIA.motionReduce, () => {
        gsap.set(['.hero-top > *', '.hero-line', '.hero-cue'], { autoAlpha: 1, yPercent: 0 });
      });
    }, overlay);

    return () => ctx.revert();
  }, []);

  const handleProgress = useCallback((p: number) => {
    fadeRef.current?.(p);
  }, []);

  return (
    <section id="hero" aria-label="JAMAL — the linen set, rotating">
      <ScrollVideo
        src={asset('/assets/model-360.mp4')}
        poster={asset('/assets/model-360-poster.jpg')}
        scrubLengthVh={300}
        onProgress={handleProgress}
      >
        <div
          ref={overlayRef}
          className="flex h-full w-full flex-col justify-between p-6 md:p-10"
        >
          <div className="hero-top flex items-start justify-between pt-16 md:pt-20">
            <span className="kicker overflow-hidden">Linen Atelier</span>
            <span className="kicker overflow-hidden text-muted">Vol. 01 — Est. 2026</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <h1
              id="hero-heading"
              tabIndex={-1}
              className="font-display font-light leading-[0.92] tracking-tight text-cream focus:outline-none"
            >
              <span className="block overflow-hidden">
                <span className="hero-line block text-[clamp(2.6rem,7.5vw,6.5rem)]">
                  One garment.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line block text-[clamp(2.6rem,7.5vw,6.5rem)]">
                  Every angle<span className="text-accent">.</span>
                </span>
              </span>
            </h1>

            <div className="hero-cue hidden shrink-0 flex-col items-center gap-3 pb-2 md:flex">
              <span className="kicker [writing-mode:vertical-rl] text-muted">
                Scroll to rotate
              </span>
              <span className="relative block h-16 w-px overflow-hidden bg-line">
                <span className="hero-cue__dot absolute left-0 top-0 h-6 w-px bg-accent" />
              </span>
            </div>
          </div>
        </div>
      </ScrollVideo>
    </section>
  );
}

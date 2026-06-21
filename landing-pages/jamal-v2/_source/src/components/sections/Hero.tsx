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
        gsap.set(['.hero-top > *', '.hero-line', '.hero-cue', '.hero-chip', '.hero-orbit'], {
          yPercent: 120,
          autoAlpha: 0,
        });
        gsap.set('.hero-rule', { scaleX: 0 });

        const intro = gsap.timeline({ delay: 0.15 });
        intro
          .to('.hero-top > *', {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.08,
          })
          .to('.hero-rule', { scaleX: 1, duration: 1.2, ease: 'power3.out' }, '-=0.8')
          .to(
            '.hero-line',
            { yPercent: 0, autoAlpha: 1, duration: 1.15, ease: 'power4.out', stagger: 0.1 },
            '-=0.8',
          )
          .to(
            ['.hero-chip', '.hero-orbit', '.hero-cue'],
            { yPercent: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', stagger: 0.08 },
            '-=0.75',
          );

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
        gsap.set(['.hero-top > *', '.hero-line', '.hero-cue', '.hero-chip', '.hero-orbit'], {
          autoAlpha: 1,
          yPercent: 0,
        });
        gsap.set('.hero-rule', { scaleX: 1 });
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
          className="relative flex h-full w-full flex-col justify-between px-6 pb-7 pt-6 md:px-10 md:pb-10 md:pt-8"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square w-[min(62vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/70 md:block"
            aria-hidden
          />
          <div
            className="hero-orbit pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square w-[min(46vw,30rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/25 md:block"
            aria-hidden
          />

          <div className="hero-top flex items-start justify-between pt-14 md:pt-20">
            <span className="kicker overflow-hidden">Linen Atelier</span>
            <span className="kicker overflow-hidden text-right text-muted">Vol. 01 — Est. 2026</span>
          </div>

          <div className="hero-rule absolute left-6 right-6 top-[7rem] h-px origin-left bg-line md:left-10 md:right-10 md:top-[8.75rem]" />

          <div className="grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
            <h1
              id="hero-heading"
              tabIndex={-1}
              className="max-w-[10ch] font-display text-[clamp(4rem,14vw,11rem)] font-normal leading-[0.78] tracking-tight text-cream focus:outline-none"
            >
              <span className="block overflow-hidden">
                <span className="hero-line block">
                  One garment.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line block pl-[0.22em]">
                  Every angle<span className="text-accent">.</span>
                </span>
              </span>
            </h1>

            <div className="hidden w-[18rem] flex-col items-end gap-4 md:flex">
              <div className="hero-chip luxury-panel px-5 py-4 text-right">
                <span className="kicker text-muted">Scroll to rotate</span>
                <p className="mt-2 text-sm leading-relaxed text-cream">
                  One garment. Every angle.
                </p>
              </div>
              <div className="hero-cue flex shrink-0 items-center gap-4 pb-1">
              <span className="kicker [writing-mode:vertical-rl] text-muted">
                Scroll to rotate
              </span>
              <span className="relative block h-16 w-px overflow-hidden bg-line">
                <span className="hero-cue__dot absolute left-0 top-0 h-6 w-px bg-accent" />
              </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollVideo>
    </section>
  );
}

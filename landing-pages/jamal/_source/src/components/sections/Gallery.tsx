import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToHash } from '../../lib/lenisStore';
import { asset } from '../../lib/asset';
import Magnetic from '../Magnetic';

gsap.registerPlugin(ScrollTrigger);

interface Shot {
  src: string;
  caption: string;
  wide?: boolean;
}

const SHOTS: Shot[] = [
  { src: asset('/assets/gallery/01.webp'), caption: 'At rest' },
  { src: asset('/assets/gallery/02.webp'), caption: 'Doorway' },
  { src: asset('/assets/gallery/05.webp'), caption: 'The set — front' },
  { src: asset('/assets/editorial-02.webp'), caption: 'Off the green', wide: true },
  { src: asset('/assets/gallery/03.webp'), caption: 'Evening' },
  { src: asset('/assets/gallery/04.webp'), caption: 'Collar study' },
  { src: asset('/assets/gallery/06.webp'), caption: 'The set — back' },
];

/**
 * GALLERY — oddritual-style horizontal lookbook. On desktop the section pins and
 * the track translates on x with the scroll (scrub). On mobile / reduced-motion
 * it degrades to a native horizontal swipe — no pin, fully usable.
 */
export default function Gallery() {
  const root = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    const view = viewport.current;
    const t = track.current;
    if (!section || !view || !t) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        view.classList.add('is-pinned');
        const getDistance = () => Math.max(0, t.scrollWidth - window.innerWidth);

        // Curtain-reveal each figure as a deterministic function of the pin's
        // scroll progress — clip-path opens + a Ken-Burns settle as the figure
        // crosses from the right edge into view. Driven straight off the scrub's
        // onUpdate (not per-element triggers) so it can never strand a figure
        // closed and behaves identically on smooth scroll and instant jumps.
        const figures = gsap.utils.toArray<HTMLElement>('.gallery-figure', t);
        const imgs = figures.map((f) => f.querySelector('img'));
        let offsets = figures.map((f) => f.offsetLeft);
        const PAD_LEFT = 40; // matches md:px-10 viewport padding
        const START_VW = 0.92; // left edge enters reveal band here…
        const END_VW = 0.6; // …and is fully open by here

        const renderReveals = (progressX: number) => {
          const w = window.innerWidth;
          for (let k = 0; k < figures.length; k++) {
            const left = PAD_LEFT + offsets[k] + progressX;
            const tlt = gsap.utils.clamp(
              0,
              1,
              (START_VW - left / w) / (START_VW - END_VW),
            );
            gsap.set(figures[k], { clipPath: `inset(0% 0% ${(1 - tlt) * 100}% 0%)` });
            const img = imgs[k];
            if (img) gsap.set(img, { scale: 1 + 0.12 * (1 - tlt) });
          }
        };

        const tween = gsap.to(t, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              offsets = figures.map((f) => f.offsetLeft);
              renderReveals(-getDistance() * self.progress);
            },
            onUpdate: (self) => {
              if (progress.current) {
                gsap.set(progress.current, { scaleX: self.progress });
              }
              renderReveals(-getDistance() * self.progress);
            },
          },
        });

        // Seed the closed state before the first scroll update.
        renderReveals(0);

        return () => {
          view.classList.remove('is-pinned');
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(t, { x: 0 });
          figures.forEach((f) => gsap.set(f, { clearProps: 'clipPath' }));
          imgs.forEach((i) => i && gsap.set(i, { clearProps: 'transform' }));
        };
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={root} className="relative bg-ink py-16 md:py-0">
      <div className="pointer-events-none absolute left-0 top-0 z-10 flex w-full items-center gap-4 px-6 pt-8 md:px-10 md:pt-12">
        <span className="kicker">04 — Gallery</span>
        <span className="hidden h-px flex-1 bg-line md:block" />
        <span className="kicker hidden text-muted md:block">Scroll to explore</span>
      </div>

      <div
        ref={viewport}
        role="region"
        aria-label="Lookbook — scroll horizontally to browse"
        tabIndex={0}
        data-cursor="view"
        className="gallery-viewport flex snap-x snap-mandatory items-center gap-5 overflow-x-auto px-6 outline-none [scrollbar-width:none] focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink md:h-screen md:gap-8 md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        <div ref={track} className="gallery-track flex shrink-0 items-center gap-5 md:gap-8">
          {/* Intro panel */}
          <div className="flex h-[64vh] w-[70vw] shrink-0 snap-start flex-col justify-end pb-2 sm:w-[40vw] md:h-[68vh] md:w-[26vw]">
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[0.95] tracking-tight text-cream">
              The
              <br />
              lookbook
            </h2>
            <p className="mt-4 max-w-[22ch] text-sm leading-relaxed text-muted">
              One set, many lives. Shot in warm light and worn the way it should be.
            </p>
          </div>

          {SHOTS.map((shot, i) => (
            <figure
              key={shot.src}
              className={`gallery-figure group relative h-[64vh] shrink-0 snap-start overflow-hidden bg-surface md:h-[72vh] ${
                shot.wide
                  ? 'w-[88vw] sm:w-[70vw] md:w-[46vw]'
                  : 'w-[70vw] sm:w-[44vw] md:w-[26vw]'
              }`}
            >
              <img
                src={shot.src}
                alt={`JAMAL linen — ${shot.caption}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <figcaption className="pointer-events-none absolute bottom-0 left-0 flex w-full items-center justify-between bg-gradient-to-t from-ink/80 to-transparent px-4 py-3">
                <span className="text-sm text-cream">{shot.caption}</span>
                <span className="kicker text-accent">{String(i + 1).padStart(2, '0')}</span>
              </figcaption>
            </figure>
          ))}

          {/* Outro CTA panel */}
          <div className="flex h-[64vh] w-[70vw] shrink-0 snap-start flex-col justify-center gap-5 pr-6 sm:w-[40vw] md:h-[68vh] md:w-[24vw]">
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-light leading-tight tracking-tight text-cream">
              Make it yours.
            </p>
            <Magnetic className="self-start">
              <a
                href="#contact"
                onClick={(e) => {
                  if (scrollToHash('#contact')) e.preventDefault();
                }}
                data-cursor="link"
                className="btn"
              >
                Enquire
                <span className="btn__arrow" aria-hidden>
                  →
                </span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Scrub progress (desktop pinned mode) */}
      <div className="absolute bottom-8 left-10 right-10 hidden h-px bg-line md:block">
        <span
          ref={progress}
          className="block h-full origin-left scale-x-0 bg-accent"
        />
      </div>
    </section>
  );
}

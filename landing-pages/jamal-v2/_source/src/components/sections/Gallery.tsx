import { useCallback, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToHash, lenisStore } from '../../lib/lenisStore';
import { asset } from '../../lib/asset';
import Magnetic from '../Magnetic';

gsap.registerPlugin(ScrollTrigger);

interface Shot {
  src: string;
  caption: string;
  /** Optional alternate frame revealed on hover (opacity-only cross-fade). */
  hoverSrc?: string;
  wide?: boolean;
  w: number;
  h: number;
}

// Source frames are 1200x2133 (portrait); editorial-02 is the wide crop.
const PORTRAIT = { w: 1200, h: 2133 };
const WIDE = { w: 2133, h: 1200 };

const SHOTS: Shot[] = [
  { src: asset('/assets/gallery/01.webp'), caption: 'At rest', ...PORTRAIT },
  { src: asset('/assets/gallery/02.webp'), caption: 'Doorway', ...PORTRAIT },
  {
    src: asset('/assets/gallery/05.webp'),
    hoverSrc: asset('/assets/gallery/06.webp'),
    caption: 'The set — front',
    ...PORTRAIT,
  },
  { src: asset('/assets/editorial-02.webp'), caption: 'Off the green', wide: true, ...WIDE },
  { src: asset('/assets/gallery/03.webp'), caption: 'Evening', ...PORTRAIT },
  { src: asset('/assets/gallery/04.webp'), caption: 'Collar study', ...PORTRAIT },
  {
    src: asset('/assets/gallery/06.webp'),
    hoverSrc: asset('/assets/gallery/05.webp'),
    caption: 'The set — back',
    ...PORTRAIT,
  },
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

  // WCAG 2.1.1 — the lookbook is a focusable region; arrow keys must move it.
  // When the desktop pin is engaged, horizontal browsing maps to PAGE scroll,
  // so we nudge Lenis (the single smooth-scroll authority). On native swipe
  // (mobile / reduced-motion, Lenis off) we scroll the viewport directly.
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    const back = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
    if (!forward && !back) return;
    e.preventDefault();

    const STEP = Math.round(window.innerWidth * 0.7);
    const delta = forward ? STEP : -STEP;
    const lenis = lenisStore.current;
    // Only when the desktop pin is engaged does horizontal browsing map to PAGE
    // scroll — nudge Lenis then. Otherwise (unpinned mobile band, even with a
    // keyboard + Lenis live) move the native horizontal lookbook directly.
    const isPinned = viewport.current?.classList.contains('is-pinned');

    if (isPinned && lenis) {
      lenis.scrollTo(lenis.scroll + delta, { duration: 0.6 });
    } else if (viewport.current) {
      viewport.current.scrollBy({ left: delta, behavior: 'smooth' });
    }
  }, []);

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

        // Images stay FULLY VISIBLE at all times (no curtain that could flash
        // black). As the pinned track scrubs, each photo gets a subtle horizontal
        // parallax inside its frame for depth — the Studio-Freight / duyucare feel.
        // A baseline scale keeps the shifted image edge-to-edge with no gaps.
        const figures = gsap.utils.toArray<HTMLElement>('.gallery-figure', t);
        // Each figure may hold a base + hover image; transform BOTH so the
        // opacity cross-fade layer tracks the same scale/parallax (no gap).
        const imgGroups = figures.map((f) =>
          gsap.utils.toArray<HTMLImageElement>('.gallery-img', f),
        );
        const imgs = imgGroups.flat();
        let offsets = figures.map((f) => f.offsetLeft);
        let widths = figures.map((f) => f.offsetWidth);
        const PAD_LEFT = 40; // matches md:px-10 viewport padding
        const PARALLAX = 26; // px the image drifts as the figure crosses the view

        gsap.set(imgs, { scale: 1.16, willChange: 'transform' });

        const renderParallax = (trackX: number) => {
          const w = window.innerWidth;
          for (let k = 0; k < figures.length; k++) {
            const group = imgGroups[k];
            if (!group.length) continue;
            const center = PAD_LEFT + offsets[k] + widths[k] / 2 + trackX;
            const rel = gsap.utils.clamp(-1, 1, (center - w / 2) / w);
            gsap.set(group, { x: -rel * PARALLAX });
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
              widths = figures.map((f) => f.offsetWidth);
              renderParallax(-getDistance() * self.progress);
            },
            onUpdate: (self) => {
              if (progress.current) {
                gsap.set(progress.current, { scaleX: self.progress });
              }
              renderParallax(-getDistance() * self.progress);
            },
          },
        });

        renderParallax(0);

        return () => {
          view.classList.remove('is-pinned');
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(t, { x: 0 });
          imgs.forEach((i) => i && gsap.set(i, { clearProps: 'transform,will-change' }));
        };
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={root} className="section-frame relative bg-ink py-16 md:py-0">
      <div className="pointer-events-none absolute left-0 top-0 z-10 flex w-full items-center gap-4 px-6 pt-8 md:px-10 md:pt-24">
        <span className="kicker">04 — Gallery</span>
        <span className="hidden h-px flex-1 bg-line md:block" />
        <span className="kicker hidden text-muted md:block">Scroll to explore</span>
      </div>

      <div
        ref={viewport}
        role="region"
        aria-label="Lookbook — use arrow keys or scroll to browse"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        data-cursor="view"
        className="gallery-viewport flex snap-x snap-mandatory items-center gap-5 overflow-x-auto px-6 outline-none [scrollbar-width:none] focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink md:h-screen md:gap-8 md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        <div ref={track} className="gallery-track flex shrink-0 items-center gap-5 md:gap-8">
          {/* Intro panel */}
          <div className="luxury-panel flex h-[64vh] w-[74vw] shrink-0 snap-start flex-col justify-between p-5 sm:w-[42vw] md:h-[84vh] md:w-[28vw] md:p-7">
            <span className="kicker text-muted">04 — Gallery</span>
            <div>
            <h2 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-normal leading-[0.84] tracking-tight text-cream">
              The
              <br />
              lookbook
            </h2>
            <p className="mt-4 max-w-[22ch] text-sm leading-relaxed text-muted">
              One set, many lives. Shot in warm light and worn the way it should be.
            </p>
            </div>
          </div>

          {SHOTS.map((shot, i) => (
            <figure
              key={shot.src}
              className={`gallery-figure group image-shell relative h-[64vh] shrink-0 snap-start overflow-hidden border border-line bg-surface md:h-[84vh] ${
                shot.wide
                  ? 'w-[88vw] sm:w-[70vw] md:w-[48vw]'
                  : 'w-[70vw] sm:w-[44vw] md:w-[27vw]'
              }`}
            >
              {/* Inner wrapper carries the pointer-reactive hover scale so it
                  composes with — never overwrites — the gsap-driven img transform
                  (scale/x) used during the desktop pinned scrub. */}
              <div className="relative h-full w-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                <img
                  src={shot.src}
                  alt={`JAMAL linen — ${shot.caption}`}
                  width={shot.w}
                  height={shot.h}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="gallery-img h-full w-full object-cover object-center"
                />
                {shot.hoverSrc && (
                  <img
                    src={shot.hoverSrc}
                    alt=""
                    aria-hidden
                    width={shot.w}
                    height={shot.h}
                    loading="lazy"
                    decoding="async"
                    className="gallery-img absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100"
                  />
                )}
              </div>
              <figcaption className="pointer-events-none absolute bottom-0 left-0 z-[1] flex w-full items-center justify-between bg-gradient-to-t from-ink via-ink/70 to-transparent px-4 pb-4 pt-10">
                <span className="text-sm text-cream transition duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-2 opacity-70 group-hover:translate-y-0 group-hover:opacity-100">
                  {shot.caption}
                </span>
                <span className="kicker text-accent opacity-100">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </figcaption>
            </figure>
          ))}

          {/* Outro CTA panel */}
          <div className="luxury-panel flex h-[64vh] w-[70vw] shrink-0 snap-start flex-col justify-center gap-5 p-5 pr-6 sm:w-[40vw] md:h-[84vh] md:w-[26vw] md:p-7">
            <p className="font-display text-[clamp(2.2rem,4vw,3.8rem)] font-normal leading-[0.9] tracking-tight text-cream">
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

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../lib/motion';
import Logo from './Logo';

interface PreloaderProps {
  onComplete?: () => void;
}

/**
 * Dark full-screen preloader: the JAMAL mark settles, a counter runs 0 → 100,
 * a gold hairline draws across, then the curtain lifts to reveal the site.
 * Honors reduced-motion by snapping to 100 and lifting instantly.
 */
export default function Preloader({ onComplete }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    // Reduced motion: no counter, no curtain — show the mark briefly, reveal.
    if (prefersReducedMotion()) {
      setCount(100);
      const id = window.setTimeout(() => onComplete?.(), 600);
      return () => window.clearTimeout(id);
    }

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete: () => onComplete?.() });

      gsap.set(['.preloader__mark', '.preloader__meta'], { autoAlpha: 0, y: 24 });

      tl.to('.preloader__mark', {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .to(
          '.preloader__meta',
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6',
        )
        .to(
          counter,
          {
            v: 100,
            duration: 1.9,
            ease: 'power2.inOut',
            onUpdate: () => setCount(Math.round(counter.v)),
          },
          0.2,
        )
        .to('.preloader__bar', { scaleX: 1, duration: 1.9, ease: 'power2.inOut' }, 0.2)
        .to('.preloader__mark, .preloader__meta', {
          autoAlpha: 0,
          y: -20,
          duration: 0.5,
          ease: 'power2.in',
        })
        .to(
          root.current,
          { yPercent: -100, duration: 1, ease: 'power4.inOut' },
          '-=0.15',
        );
    }, root);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={root}
      role="status"
      aria-label="Loading JAMAL — Linen Atelier"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-7 md:px-10 md:py-9"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-[var(--gutter)] top-7 h-px bg-line md:top-9"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-7 left-1/2 w-px bg-line/70 md:inset-y-9"
        aria-hidden
      />

      <div className="relative flex flex-1 items-center justify-center">
        <div
          className="absolute aspect-square w-[min(74vw,34rem)] rounded-full border border-line/70"
          aria-hidden
        />
        <Logo withTagline className="preloader__mark relative h-24 w-auto text-cream md:h-32" />
      </div>

      <div className="preloader__meta relative grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-end">
        <span
          className="font-display text-7xl leading-none text-cream md:text-9xl"
          aria-hidden
        >
          {count}
          <span className="ml-1 align-top font-body text-xl text-muted md:text-2xl">%</span>
        </span>
        <span className="kicker hidden text-muted md:block">Linen Atelier</span>
        <div className="mb-3 w-full max-w-xs justify-self-end">
          <div className="preloader__bar h-px w-full origin-left scale-x-0 bg-accent" />
          <span className="kicker mt-3 block text-right text-muted">Loading the atelier</span>
        </div>
      </div>
    </div>
  );
}

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { MEDIA } from '../../lib/motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * MANIFESTO — the editorial statement. The large line splits into words that
 * rise and fade as the section enters (split-type + ScrollTrigger). Reduced
 * motion shows the full statement immediately.
 */
export default function Manifesto() {
  const root = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const root_ = root.current;
    const statement = statementRef.current;
    if (!root_ || !statement) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOk, () => {
        const split = new SplitType(statement, { types: 'words', tagName: 'span' });

        gsap.set(split.words, { yPercent: 110, autoAlpha: 0 });
        gsap.to(split.words, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.025,
          scrollTrigger: { trigger: statement, start: 'top 85%' },
        });

        gsap.from('[data-reveal-soft]', {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: root_, start: 'top 65%' },
        });

        return () => split.revert();
      });
    }, root_);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="atelier"
      ref={root}
      className="relative mx-auto max-w-6xl px-6 py-28 md:px-8 md:py-40"
    >
      <div className="mb-12 flex items-center gap-4 md:mb-16">
        <span className="kicker" data-reveal-soft>
          01 — Manifesto
        </span>
        <span className="h-px flex-1 bg-line" data-reveal-soft />
      </div>

      <p
        ref={statementRef}
        className="font-display text-[clamp(1.75rem,5vw,3.75rem)] font-light leading-[1.08] tracking-tight text-cream"
      >
        We make one thing, and we make it completely — a single linen set, cut for
        ease and finished by hand. No seasons, no noise. Just cloth that breathes,
        softens with wear, and is meant to be{' '}
        <span className="text-accent">lived in</span>.
      </p>

      <div className="mt-14 grid gap-8 border-t border-line pt-10 md:mt-20 md:grid-cols-[1fr_1.4fr]">
        <p className="kicker text-muted" data-reveal-soft>
          The brief
        </p>
        <p
          className="max-w-2xl text-[var(--text-lead)] leading-relaxed text-muted"
          data-reveal-soft
        >
          Garment-washed European linen, a grandad-collar shirt and a relaxed
          trouser, drawn in one neutral. Considered from every angle — which is why
          you can turn it in the light above, and why nothing here is left to
          chance.
        </p>
      </div>
    </section>
  );
}

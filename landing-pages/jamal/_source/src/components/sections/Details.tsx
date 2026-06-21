import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA } from '../../lib/motion';
import { asset } from '../../lib/asset';

gsap.registerPlugin(ScrollTrigger);

const NOTES = [
  'Coconut buttons, sewn by hand',
  'Side seams felled for softness',
  'Pre-washed so it never shrinks on you',
  'One neutral, dyed in small batches',
];

/**
 * DETAILS — a cinematic full-bleed band (parallax) plus a craft note column.
 * Bridges the product and the gallery; on-brand, transforms only.
 */
export default function Details() {
  const root = useRef<HTMLDivElement>(null);
  const bandImg = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOk, () => {
        if (bandImg.current) {
          gsap.fromTo(
            bandImg.current,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: '.details-band',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          );
        }

        gsap.from('[data-note]', {
          y: 28,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.details-notes', start: 'top 78%' },
        });
      });

      mm.add(MEDIA.motionReduce, () => {
        gsap.set('[data-note]', { autoAlpha: 1, y: 0 });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="details" ref={root} className="bg-ink">
      {/* Full-bleed cinematic band with parallax */}
      <figure className="details-band relative h-[70vh] w-full overflow-hidden md:h-[88vh]">
        <img
          ref={bandImg}
          src={asset('/assets/editorial-01.webp')}
          alt="Two men in the JAMAL linen set, seated together in warm light"
          width={2000}
          height={1126}
          loading="lazy"
          decoding="async"
          className="absolute -top-[8%] left-0 h-[116%] w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <figcaption className="absolute bottom-0 left-0 w-full p-6 md:p-10">
          <span className="kicker">03 — In wear</span>
          <p className="mt-3 max-w-2xl font-display text-[clamp(1.5rem,3.6vw,2.75rem)] font-light leading-tight tracking-tight text-cream">
            Cut for ease. Worn in company.
          </p>
        </figcaption>
      </figure>

      {/* Craft notes */}
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-[1fr_1.2fr] md:gap-16 md:px-8 md:py-32">
        <div className="relative aspect-[3/4] overflow-hidden bg-surface" data-note>
          <img
            src={asset('/assets/detail-02.webp')}
            alt="Close detail — the grandad collar against the skin"
            width={941}
            height={1672}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="details-notes flex flex-col justify-center">
          <span className="kicker" data-note>
            Considered details
          </span>
          <h2
            data-note
            className="mt-4 max-w-md font-display text-[clamp(1.75rem,4vw,3rem)] font-light leading-tight tracking-tight text-cream"
          >
            The work is in the things you don&rsquo;t notice.
          </h2>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {NOTES.map((note, i) => (
              <li
                key={note}
                data-note
                className="flex items-baseline gap-5 py-4 text-cream"
              >
                <span className="kicker w-8 shrink-0 text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[var(--text-lead)] leading-snug">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

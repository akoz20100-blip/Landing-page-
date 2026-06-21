import type { MouseEvent } from 'react';
import Logo from '../Logo';
import { scrollToHash } from '../../lib/lenisStore';

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Collection', href: '#collection' },
      { label: 'Atelier', href: '#atelier' },
      { label: 'Gallery', href: '#gallery' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'Pinterest', href: 'https://pinterest.com' },
      { label: 'Journal', href: '#atelier' },
    ],
  },
];

/**
 * FOOTER — the big contact line, the brand mark, and links. Dark, minimal.
 * Headline + email reveal on enter via the global [data-reveal] hook.
 */
export default function Footer() {
  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (scrollToHash(href)) e.preventDefault();
  };

  return (
    <footer id="contact" className="relative border-t border-line bg-ink px-6 pb-10 pt-24 md:px-10 md:pt-32">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <span className="kicker" data-reveal>
          05 — Contact
        </span>

        <h2
          data-reveal
          className="mt-6 font-display text-[clamp(2.5rem,9vw,7rem)] font-light leading-[0.9] tracking-tight text-cream"
        >
          Let&rsquo;s talk<span className="text-accent">.</span>
        </h2>

        <a
          href="mailto:atelier@jamal-linen.com"
          data-reveal
          className="link-underline mt-8 inline-block font-display text-[clamp(1.25rem,3vw,2.25rem)] font-light tracking-tight"
        >
          atelier@jamal-linen.com
        </a>

        <div className="mt-20 grid gap-12 border-t border-line pt-12 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-2">
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              JAMAL is a linen atelier making one considered set, by hand, in small
              batches. Studio visits by appointment.
            </p>
            <p className="kicker mt-6 text-muted">Lisbon · By appointment</p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="kicker text-muted">{col.title}</p>
              <ul className="mt-2 flex flex-col">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => go(e, link.href)}
                      className="link-underline inline-flex min-h-[44px] items-center text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-line pt-10 md:flex-row md:items-end">
          <Logo withTagline className="h-16 w-auto text-cream" />
          <div className="flex flex-col items-start md:items-end">
            <a
              href="#hero"
              onClick={(e) => go(e, '#hero')}
              className="link-underline inline-flex min-h-[44px] items-center text-xs text-muted"
            >
              Back to top ↑
            </a>
            <p className="mt-2 text-xs text-muted">
              © 2026 JAMAL Linen Atelier. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

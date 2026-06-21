interface LogoProps {
  /** Show the "LINEN ATELIER" rule + tagline under the wordmark. */
  withTagline?: boolean;
  className?: string;
}

/**
 * The JAMAL wordmark, drawn as inline SVG so it scales crisply and keeps the
 * Didone serif character of the brand mark regardless of the loaded web fonts.
 * `currentColor` lets callers tint it (defaults to the gold accent via class).
 */
export default function Logo({ withTagline = false, className }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox={withTagline ? '0 0 420 150' : '0 0 420 96'}
      role="img"
      aria-label="JAMAL — Linen Atelier"
      fill="currentColor"
    >
      <text
        x="210"
        y="70"
        textAnchor="middle"
        fontFamily="'Bodoni Moda', Didot, 'Bodoni 72', 'Bodoni MT', Georgia, serif"
        fontSize="78"
        fontWeight="400"
        letterSpacing="0"
      >
        JAMAL
      </text>
      {withTagline && (
        <>
          <line
            x1="150"
            y1="100"
            x2="270"
            y2="100"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <text
            x="210"
            y="132"
            textAnchor="middle"
            fontFamily="'Manrope', system-ui, sans-serif"
            fontSize="13"
            fontWeight="500"
            letterSpacing="0"
          >
            LINEN ATELIER
          </text>
        </>
      )}
    </svg>
  );
}

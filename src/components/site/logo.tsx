/**
 * Saumya UI mark — the "copy" glyph (a filled square with a second square
 * peeking out behind it). Uses currentColor, so it follows the text color.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={className}
    >
      {/* back square — drawn as a top-left bracket so it reads as "behind" */}
      <path
        d="M8 18.5 V11 a3 3 0 0 1 3-3 H18.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* front square */}
      <rect x="12" y="12" width="12" height="12" rx="3.2" fill="currentColor" />
    </svg>
  );
}

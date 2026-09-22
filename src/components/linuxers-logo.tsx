import { useId } from "react";

/**
 * The Linuxers mark: a shell prompt caret and cursor forming a stylised "L".
 *
 * Drawn inline so it inherits the theme's blue -> gold gradient and stays
 * crisp at every size. The gradient id is generated per instance because the
 * mark renders more than once per page (header and footer), and duplicate ids
 * would be invalid markup.
 *
 * Decorative by default: pass `label` only where the mark is the sole content
 * of a control, so it does not double up on an ancestor's accessible name.
 */
export function LinuxersLogo({
  className = "size-8",
  label,
}: {
  className?: string;
  label?: string;
}) {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--blue)" />
          <stop offset="1" stopColor="var(--gold-ink)" />
        </linearGradient>
      </defs>

      {/* Rounded terminal window */}
      <rect
        x="1.25"
        y="1.25"
        width="29.5"
        height="29.5"
        rx="8"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.5"
      />

      {/* Shell prompt caret */}
      <path
        d="M9 11.5 13.5 16 9 20.5"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cursor underscore, doubling as the foot of the L */}
      <path
        d="M16.75 21.25H23"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

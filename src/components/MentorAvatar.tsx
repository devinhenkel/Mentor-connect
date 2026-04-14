import { mentorAvatarVariant } from "@/lib/mentorAvatarVariant";

type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, { className: string; px: number }> = {
  sm: { className: "h-12 w-12", px: 48 },
  md: { className: "h-14 w-14", px: 56 },
  lg: { className: "h-24 w-24 sm:h-28 sm:w-28", px: 112 },
};

/**
 * Flat illustration placeholder (faceless bust, split jacket) — suggests a
 * real person without using a photo. Brand orange appears on one lapel;
 * charcoal on the other, echoing the reference style.
 */
export function MentorAvatar({
  mentorId,
  size = "md",
  className = "",
  title,
}: {
  mentorId: string;
  size?: Size;
  className?: string;
  title?: string;
}) {
  const { className: sizeClass, px } = sizeMap[size];
  const v = mentorAvatarVariant(mentorId, 4);
  const orangeOnLeft = v % 2 === 0;
  const hairStyle = v;

  const leftLapel = orangeOnLeft ? "#ff6720" : "#3f3f46";
  const rightLapel = orangeOnLeft ? "#3f3f46" : "#ff6720";

  return (
    <span
      className={`inline-flex shrink-0 rounded-full bg-card p-0.5 ring-2 ring-border shadow-sm ${sizeClass} ${className}`}
      title={title}
    >
      <svg
        viewBox="0 0 100 100"
        width={px}
        height={px}
        className="h-full w-full rounded-full"
        role={title ? "img" : undefined}
        aria-label={title}
        aria-hidden={title ? undefined : true}
      >
        <circle
          cx="50"
          cy="50"
          r="49"
          className="fill-white dark:fill-zinc-800"
        />
        <circle
          cx="50"
          cy="52"
          r="46"
          className="fill-[#d6cbc2] opacity-45 dark:fill-zinc-600 dark:opacity-35"
        />

        {/* Split jacket */}
        <path
          d="M8 100 L8 80 Q10 66 22 62 L50 68 L50 100 Z"
          fill={leftLapel}
        />
        <path
          d="M92 100 L92 80 Q90 66 78 62 L50 68 L50 100 Z"
          fill={rightLapel}
        />

        {/* Shirt collar */}
        <path d="M38 58 L50 70 L62 58 L58 56 L50 66 L42 56 Z" fill="#f4f4f5" />
        <path d="M42 56 L50 52 L58 56 L50 66 Z" fill="#fafafa" />

        {/* Neck */}
        <path d="M42 56 L42 48 Q50 52 58 48 L58 56 Z" fill="#fec89a" />
        <path
          d="M54 50 L58 56 L58 48 Q52 46 50 48 Z"
          fill="#ff9552"
          opacity={0.8}
        />

        {/* Face (no features) */}
        <ellipse cx="50" cy="38" rx="20" ry="22" fill="#fec89a" />
        <ellipse
          cx="56"
          cy="40"
          rx="8"
          ry="10"
          fill="#ff9552"
          opacity={0.32}
        />

        {/* Hair */}
        {hairStyle === 0 ? (
          <path
            d="M30 38 Q30 18 50 16 Q70 18 70 38 Q68 28 50 26 Q32 28 30 38 Z"
            fill="#3f3f46"
          />
        ) : hairStyle === 1 ? (
          <path
            d="M28 40 Q28 17 50 15 Q72 17 72 40 Q70 30 50 27 Q30 30 28 40 Z"
            fill="#27272a"
          />
        ) : hairStyle === 2 ? (
          <path
            d="M32 42 Q32 16 50 14 Q68 16 68 42 L66 34 Q50 22 34 34 Z"
            fill="#3f3f46"
          />
        ) : (
          <path
            d="M29 36 Q32 14 50 12 Q68 14 71 36 Q69 24 50 20 Q31 24 29 36 Z"
            fill="#27272a"
          />
        )}
      </svg>
    </span>
  );
}

export function Logo({ className = "", size = "default" }: { className?: string; size?: "sm" | "default" | "lg" }) {
  const dimensions = {
    sm: { icon: 24, text: "text-sm", gap: "gap-1.5" },
    default: { icon: 30, text: "text-lg", gap: "gap-2" },
    lg: { icon: 38, text: "text-2xl", gap: "gap-2.5" },
  }[size];

  return (
    <span className={`inline-flex items-center ${dimensions.gap} ${className}`} data-testid="logo">
      <svg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M8 28 L14 12 L20 22 L26 8 L32 20"
          className="stroke-primary"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.85"
        />
        <circle cx="8" cy="28" r="3" className="fill-primary" opacity="0.5" />
        <circle cx="14" cy="12" r="3.5" className="fill-primary" opacity="0.7" />
        <circle cx="20" cy="22" r="4" className="fill-primary" opacity="0.9" />
        <circle cx="26" cy="8" r="3" className="fill-primary" opacity="0.65" />
        <circle cx="32" cy="20" r="3.5" className="fill-primary" />
        <line x1="14" y1="12" x2="20" y2="6" className="stroke-primary" strokeWidth="1" opacity="0.25" strokeLinecap="round" />
        <circle cx="20" cy="5" r="1.5" className="fill-primary" opacity="0.2" />
        <line x1="20" y1="22" x2="16" y2="30" className="stroke-primary" strokeWidth="1" opacity="0.25" strokeLinecap="round" />
        <circle cx="16" cy="31" r="1.5" className="fill-primary" opacity="0.2" />
        <line x1="26" y1="8" x2="32" y2="6" className="stroke-primary" strokeWidth="1" opacity="0.25" strokeLinecap="round" />
        <circle cx="33" cy="5.5" r="1.5" className="fill-primary" opacity="0.2" />
      </svg>
      <span className={`font-semibold tracking-tight ${dimensions.text}`}>
        <span className="text-foreground">Peptide</span>
        <span className="text-primary ml-0.5">Europe</span>
      </span>
    </span>
  );
}

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 28 L14 12 L20 22 L26 8 L32 20"
        className="stroke-primary"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
      />
      <circle cx="8" cy="28" r="3" className="fill-primary" opacity="0.5" />
      <circle cx="14" cy="12" r="3.5" className="fill-primary" opacity="0.7" />
      <circle cx="20" cy="22" r="4" className="fill-primary" opacity="0.9" />
      <circle cx="26" cy="8" r="3" className="fill-primary" opacity="0.65" />
      <circle cx="32" cy="20" r="3.5" className="fill-primary" />
    </svg>
  );
}

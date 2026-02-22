export function Logo({ className = "", size = "default" }: { className?: string; size?: "sm" | "default" | "lg" }) {
  const dimensions = {
    sm: { icon: 22, text: "text-sm", gap: "gap-1.5" },
    default: { icon: 28, text: "text-lg", gap: "gap-2" },
    lg: { icon: 36, text: "text-2xl", gap: "gap-2.5" },
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
        <circle cx="12" cy="12" r="4" className="fill-primary" opacity="0.9" />
        <circle cx="28" cy="12" r="3.5" className="fill-primary" opacity="0.7" />
        <circle cx="20" cy="28" r="4.5" className="fill-primary" />
        <circle cx="8" cy="26" r="2.5" className="fill-primary" opacity="0.5" />
        <circle cx="32" cy="26" r="2" className="fill-primary" opacity="0.4" />
        <circle cx="20" cy="14" r="2" className="fill-primary" opacity="0.6" />
        <line x1="12" y1="12" x2="28" y2="12" className="stroke-primary" strokeWidth="1.5" opacity="0.5" />
        <line x1="12" y1="12" x2="20" y2="28" className="stroke-primary" strokeWidth="1.5" opacity="0.5" />
        <line x1="28" y1="12" x2="20" y2="28" className="stroke-primary" strokeWidth="1.5" opacity="0.5" />
        <line x1="8" y1="26" x2="20" y2="28" className="stroke-primary" strokeWidth="1.2" opacity="0.3" />
        <line x1="32" y1="26" x2="20" y2="28" className="stroke-primary" strokeWidth="1.2" opacity="0.3" />
        <line x1="12" y1="12" x2="8" y2="26" className="stroke-primary" strokeWidth="1.2" opacity="0.3" />
        <line x1="28" y1="12" x2="32" y2="26" className="stroke-primary" strokeWidth="1.2" opacity="0.3" />
        <line x1="20" y1="14" x2="12" y2="12" className="stroke-primary" strokeWidth="1" opacity="0.4" />
        <line x1="20" y1="14" x2="28" y2="12" className="stroke-primary" strokeWidth="1" opacity="0.4" />
      </svg>
      <span className={`font-semibold tracking-tight ${dimensions.text}`}>
        <span className="text-foreground">Peptide</span>
        <span className="text-primary">Europe</span>
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
      <circle cx="12" cy="12" r="4" className="fill-primary" opacity="0.9" />
      <circle cx="28" cy="12" r="3.5" className="fill-primary" opacity="0.7" />
      <circle cx="20" cy="28" r="4.5" className="fill-primary" />
      <circle cx="8" cy="26" r="2.5" className="fill-primary" opacity="0.5" />
      <circle cx="32" cy="26" r="2" className="fill-primary" opacity="0.4" />
      <circle cx="20" cy="14" r="2" className="fill-primary" opacity="0.6" />
      <line x1="12" y1="12" x2="28" y2="12" className="stroke-primary" strokeWidth="1.5" opacity="0.5" />
      <line x1="12" y1="12" x2="20" y2="28" className="stroke-primary" strokeWidth="1.5" opacity="0.5" />
      <line x1="28" y1="12" x2="20" y2="28" className="stroke-primary" strokeWidth="1.5" opacity="0.5" />
      <line x1="8" y1="26" x2="20" y2="28" className="stroke-primary" strokeWidth="1.2" opacity="0.3" />
      <line x1="32" y1="26" x2="20" y2="28" className="stroke-primary" strokeWidth="1.2" opacity="0.3" />
      <line x1="12" y1="12" x2="8" y2="26" className="stroke-primary" strokeWidth="1.2" opacity="0.3" />
      <line x1="28" y1="12" x2="32" y2="26" className="stroke-primary" strokeWidth="1.2" opacity="0.3" />
    </svg>
  );
}

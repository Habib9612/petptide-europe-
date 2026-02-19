export function Logo({ className = "", size = "default" }: { className?: string; size?: "sm" | "default" | "lg" }) {
  const dimensions = {
    sm: { icon: 20, text: "text-sm" },
    default: { icon: 24, text: "text-lg" },
    lg: { icon: 32, text: "text-2xl" },
  }[size];

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" className="fill-primary" />
        <path
          d="M8 10h5.5c2.5 0 4 1.4 4 3.5S16 17 13.5 17H11v5H8V10zm3 5h2.2c1 0 1.6-.5 1.6-1.5S14.2 12 13.2 12H11v3z"
          fill="white"
        />
        <path
          d="M18.5 10h7v2.2h-4.2v2.6h3.6v2.2h-3.6v2.8h4.2V22h-7V10z"
          fill="white"
          opacity="0.85"
        />
      </svg>
      <span className={`font-semibold tracking-tight ${dimensions.text}`}>
        <span className="text-foreground">Peptide</span>
        <span className="text-primary">Europe</span>
      </span>
    </span>
  );
}

export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path
        d="M8 10h5.5c2.5 0 4 1.4 4 3.5S16 17 13.5 17H11v5H8V10zm3 5h2.2c1 0 1.6-.5 1.6-1.5S14.2 12 13.2 12H11v3z"
        fill="white"
      />
      <path
        d="M18.5 10h7v2.2h-4.2v2.6h3.6v2.2h-3.6v2.8h4.2V22h-7V10z"
        fill="white"
        opacity="0.85"
      />
    </svg>
  );
}

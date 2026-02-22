import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight, ShieldCheck, Truck, Award, FlaskConical } from "lucide-react";
import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import vialImage from "@assets/peptide_vial_transparent_1771703775626.gif";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#2563EB", "#3B82F6", "#60A5FA", "#1D4ED8", "#93C5FD"];
    const particles: Particle[] = [];
    const count = 50;
    const rect = canvas.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.15 + 0.03,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;

    let time = 0;
    const animate = () => {
      time += 1;
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = r.width + 10;
        if (p.x > r.width + 10) p.x = -10;
        if (p.y < -10) p.y = r.height + 10;
        if (p.y > r.height + 10) p.y = -10;

        const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.3 + 0.7;
        const currentAlpha = p.alpha * pulse;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        gradient.addColorStop(0, p.color + Math.round(currentAlpha * 255).toString(16).padStart(2, "0"));
        gradient.addColorStop(1, p.color + "00");
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.03 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}

function Vial3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [floatY, setFloatY] = useState(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / rect.width;
    const dy = (e.clientY - centerY) / rect.height;
    setOffset({ x: -dx * 25, y: -dy * 20 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const hero = containerRef.current?.closest("[data-testid='section-hero']");
    if (!hero) return;
    const el = hero as HTMLElement;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  useEffect(() => {
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.015;
      setFloatY(Math.sin(t) * 8);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center" aria-hidden="true">
      <div className="absolute w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(220 70% 55% / 0.08) 0%, transparent 70%)",
        }}
      />
      <div className="absolute w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full animate-pulse"
        style={{
          background: "radial-gradient(circle, hsl(220 70% 55% / 0.05) 0%, transparent 60%)",
        }}
      />
      <div
        className="relative w-[300px] h-[380px] lg:w-[380px] lg:h-[480px] xl:w-[420px] xl:h-[530px]"
        style={{
          transform: `translate(${offset.x}px, ${offset.y + floatY}px)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <img
          src={vialImage}
          alt="Peptide Europe research vial"
          className="w-full h-full object-contain"
          style={{
            filter: "drop-shadow(0 20px 60px hsl(220 70% 55% / 0.2)) drop-shadow(0 0 40px hsl(220 70% 55% / 0.1))",
          }}
          data-testid="img-hero-vial"
        />
      </div>
    </div>
  );
}

export function TrustBar() {
  const { t } = useLanguage();
  const badges = [
    { icon: Award, label: t("trust.purityLabel"), sub: t("trust.puritySub") },
    { icon: ShieldCheck, label: t("trust.coaLabel"), sub: t("trust.coaSub") },
    { icon: Truck, label: t("trust.freeShipLabel"), sub: t("trust.freeShipSub") },
    { icon: FlaskConical, label: t("trust.dispatchLabel"), sub: t("trust.dispatchSub") },
  ];

  return (
    <div className="border-y border-border bg-background" data-testid="section-trust-bar">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/50">
          {badges.map((badge, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-4 bg-background" data-testid={`trust-badge-${i}`}>
              <badge.icon className="h-5 w-5 text-primary shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold leading-tight text-foreground">{badge.label}</p>
                <p className="text-[11px] text-muted-foreground">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-background min-h-[100svh] flex flex-col" data-testid="section-hero">
      <ParticleBackground />

      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full -translate-x-1/3 -translate-y-1/3"
          style={{ background: "radial-gradient(circle, hsl(220 70% 50% / 0.04) 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full translate-x-1/4 translate-y-1/4"
          style={{ background: "radial-gradient(circle, hsl(220 60% 40% / 0.12) 0%, transparent 70%)" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(220 70% 50% / 0.03) 0%, transparent 50%)" }}
        />
      </div>

      <div className="relative flex-1 flex items-center">
        <div className="container mx-auto px-4 py-12 lg:py-0">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-4 items-center min-h-[calc(100svh-140px)]">

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:pr-4"
            >
              <motion.div
                variants={fadeInLeft}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-primary/20 bg-primary/5 mb-6"
                data-testid="badge-hero-verified"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-primary">
                  {t("hero.badge")}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInLeft}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] text-foreground"
                data-testid="text-hero-title"
              >
                {t("hero.mainTitle")}
              </motion.h1>

              <motion.div
                variants={fadeInLeft}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border"
              >
                {[
                  { value: "€10", label: t("hero.startingPrice") },
                  { value: "99%+", label: t("hero.purityHPLC") },
                  { value: "24h", label: t("hero.euDispatch") },
                ].map((stat, i) => (
                  <div key={i} data-testid={`text-hero-stat-${i}`}>
                    <p className="text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-foreground">{stat.value}</p>
                    <p className="text-[10px] lg:text-[11px] tracking-wide mt-1 text-muted-foreground uppercase">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="flex justify-center order-first lg:order-none"
            >
              <Vial3D />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:pl-4 flex flex-col lg:items-end lg:text-right"
            >
              <motion.p
                variants={fadeInRight}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base lg:text-lg leading-relaxed max-w-md text-muted-foreground mb-8"
                data-testid="text-hero-subtitle"
              >
                {t("hero.mainSubtitle")}
              </motion.p>

              <motion.div
                variants={fadeInRight}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center gap-3 lg:justify-end"
              >
                <Link href="/products">
                  <Button size="lg" className="gap-2 text-sm" data-testid="button-hero-cta">
                    {t("hero.browseAll")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/products" data-testid="link-hero-categories">
                  <Button size="lg" variant="outline" className="gap-2 text-sm" data-testid="button-hero-browse">
                    {t("hero.seePricing")}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight, ShieldCheck, Truck, Award, FlaskConical } from "lucide-react";
import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import vialImage from "@assets/peptide_vial_transparent_1771703775626.gif";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
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
    const count = 40;
    const rect = canvas.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.25 + 0.05,
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
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.04 * (1 - dist / 100)})`;
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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / rect.width;
    const dy = (e.clientY - centerY) / rect.height;
    setOffset({ x: -dx * 20, y: -dy * 15 });
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

  return (
    <div ref={containerRef} className="relative flex items-center justify-center" aria-hidden="true">
      <div className="absolute w-[320px] h-[320px] lg:w-[420px] lg:h-[420px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(220 70% 55% / 0.06) 0%, transparent 70%)",
        }}
      />
      <div className="absolute w-[250px] h-[250px] lg:w-[340px] lg:h-[340px] rounded-full animate-pulse"
        style={{
          background: "radial-gradient(circle, hsl(220 70% 55% / 0.04) 0%, transparent 60%)",
        }}
      />
      <div
        className="relative w-[280px] h-[350px] lg:w-[360px] lg:h-[450px]"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <img
          src={vialImage}
          alt="Peptide Europe research vial"
          className="w-full h-full object-contain"
          style={{
            filter: "drop-shadow(0 0 40px hsl(220 70% 55% / 0.15))",
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
    <section className="relative overflow-hidden bg-background" data-testid="section-hero">
      <ParticleBackground />

      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full -translate-x-1/3 -translate-y-1/3"
          style={{ background: "radial-gradient(circle, hsl(220 70% 50% / 0.03) 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full translate-x-1/4 translate-y-1/4"
          style={{ background: "radial-gradient(circle, hsl(220 60% 40% / 0.15) 0%, transparent 70%)" }}
        />
      </div>

      <div className="container relative mx-auto px-4 pt-16 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInDown}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-primary/20 bg-primary/5 mb-6"
              data-testid="badge-hero-verified"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-primary">
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold tracking-tight leading-[1.1] mb-5 text-foreground"
              data-testid="text-hero-title"
            >
              {t("hero.mainTitle")}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base leading-relaxed mb-8 max-w-lg text-muted-foreground"
              data-testid="text-hero-subtitle"
            >
              {t("hero.mainSubtitle")}
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <motion.div variants={fadeInUp} transition={{ duration: 0.4, delay: 0.3 }}>
                <Link href="/products">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="gap-2" data-testid="button-hero-cta">
                      {t("hero.browseAll")}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp} transition={{ duration: 0.4, delay: 0.4 }}>
                <Link href="/products" data-testid="link-hero-categories">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" variant="outline" className="gap-2" data-testid="button-hero-browse">
                      {t("hero.seePricing")}
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-border"
            >
              {[
                { value: "€10", label: t("hero.startingPrice") },
                { value: "99%+", label: t("hero.purityHPLC") },
                { value: "24h", label: t("hero.euDispatch") },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  data-testid={`text-hero-stat-${i}`}
                >
                  <p className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">{stat.value}</p>
                  <p className="text-[11px] tracking-wide mt-0.5 text-muted-foreground uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center"
          >
            <Vial3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

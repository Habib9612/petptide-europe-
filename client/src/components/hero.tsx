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

    const colors = ["#1a3a5c", "#1e4976", "#254d7a", "#1b3d66", "#2a5f8f"];
    const particles: Particle[] = [];
    const count = 40;
    const rect = canvas.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        radius: Math.random() * 1.2 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.08 + 0.02,
        pulseSpeed: Math.random() * 0.01 + 0.003,
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
            ctx.strokeStyle = `rgba(30, 73, 118, ${0.02 * (1 - dist / 120)})`;
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
      <div className="absolute w-[500px] h-[500px] lg:w-[600px] lg:h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)",
        }}
      />
      <div className="absolute w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] rounded-full animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 60%)",
        }}
      />
      <div
        className="relative w-[320px] h-[400px] sm:w-[380px] sm:h-[480px] lg:w-[440px] lg:h-[560px] xl:w-[480px] xl:h-[600px]"
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
            filter: "drop-shadow(0 30px 80px rgba(59, 130, 246, 0.15)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.08))",
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

  const marqueeItems = [...badges, ...badges];

  return (
    <div className="bg-[#0d0d14] border-t border-white/5 overflow-hidden" data-testid="section-trust-bar">
      <div className="relative py-4">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {marqueeItems.map((badge, i) => (
            <div key={i} className="flex items-center gap-2.5 shrink-0 px-4" data-testid={`trust-badge-${i}`}>
              <badge.icon className="h-4 w-4 text-blue-400/70 shrink-0" strokeWidth={1.5} />
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white/70 tracking-wide">{badge.label}</span>
                <span className="text-[10px] text-white/30">{badge.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] min-h-[100svh] flex flex-col" data-testid="section-hero">
      <ParticleBackground />

      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px]"
          style={{ background: "radial-gradient(ellipse, rgba(59, 130, 246, 0.04) 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
          style={{ background: "radial-gradient(ellipse, rgba(59, 130, 246, 0.03) 0%, transparent 60%)" }}
        />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/5 mb-8"
              data-testid="badge-hero-verified"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/60">
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[0.06em] leading-[1.05] text-white max-w-5xl"
              data-testid="text-hero-title"
            >
              {t("hero.mainTitle")}
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="my-6 lg:my-10"
          >
            <Vial3D />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl text-white/50 mb-8"
              data-testid="text-hero-subtitle"
            >
              {t("hero.mainSubtitle")}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-12"
            >
              <Link href="/products">
                <Button size="lg" className="gap-2 text-sm bg-white text-[#0a0a0f] border-white/20" data-testid="button-hero-cta">
                  {t("hero.browseAll")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products" data-testid="link-hero-categories">
                <Button size="lg" variant="outline" className="gap-2 text-sm border-white/20 text-white/80 bg-white/5 backdrop-blur-sm" data-testid="button-hero-browse">
                  {t("hero.seePricing")}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-8 lg:gap-16"
            >
              {[
                { value: "€10", label: t("hero.startingPrice") },
                { value: "99%+", label: t("hero.purityHPLC") },
                { value: "24h", label: t("hero.euDispatch") },
              ].map((stat, i) => (
                <div key={i} className="relative flex flex-col items-center" data-testid={`text-hero-stat-${i}`}>
                  {i > 0 && (
                    <div className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10" aria-hidden="true" />
                  )}
                  <p className="text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-white">{stat.value}</p>
                  <p className="text-[10px] lg:text-[11px] tracking-[0.15em] mt-1 text-white/40 uppercase">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";
import { ArrowRight, ShieldCheck, Truck, Award, FlaskConical } from "lucide-react";
import { useRef, useCallback, useState, useEffect } from "react";
import vialVideo from "@assets/peptide_vial_3d_rotating_1771609453361.MP4";

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

    const colors = ["#00F5FF", "#7D00FF", "#00F5FF", "#00C8D6", "#5B00CC"];
    const particles: Particle[] = [];
    const count = 60;
    const rect = canvas.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.005,
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
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        gradient.addColorStop(0, p.color + Math.round(currentAlpha * 255).toString(16).padStart(2, "0"));
        gradient.addColorStop(1, p.color + "00");
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
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
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.06 * (1 - dist / 120)})`;
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
          background: "radial-gradient(circle, rgba(0,245,255,0.08) 0%, rgba(125,0,255,0.04) 50%, transparent 70%)",
        }}
      />
      <div className="absolute w-[250px] h-[250px] lg:w-[340px] lg:h-[340px] rounded-full animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(125,0,255,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="relative w-[280px] h-[350px] lg:w-[360px] lg:h-[450px]"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <video
          src={vialVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
          style={{
            filter: "drop-shadow(0 0 60px rgba(0,245,255,0.3)) drop-shadow(0 0 120px rgba(125,0,255,0.15))",
            mixBlendMode: "screen",
            background: "transparent",
          }}
          data-testid="video-hero-vial"
        />
      </div>
    </div>
  );
}

export function TrustBar() {
  const badges = [
    { icon: Award, label: "98-99%+ Purity", sub: "HPLC verified" },
    { icon: ShieldCheck, label: "CoA Included", sub: "Every order" },
    { icon: Truck, label: "Free Shipping", sub: "Orders over €120" },
    { icon: FlaskConical, label: "20+ Peptides", sub: "In stock now" },
  ];

  return (
    <div className="border-y border-[#00F5FF]/10 bg-[#0A0F1E]" data-testid="section-trust-bar">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#00F5FF]/5">
          {badges.map((badge, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-4 bg-[#0A0F1E]" data-testid={`trust-badge-${i}`}>
              <badge.icon className="h-5 w-5 text-[#00F5FF] shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold leading-tight text-[#E0E8FF]">{badge.label}</p>
                <p className="text-[11px] text-[#8A94B6]">{badge.sub}</p>
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
    <section className="relative overflow-hidden bg-[#0A0F1E]" data-testid="section-hero">
      <ParticleBackground />

      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full -translate-x-1/3 -translate-y-1/3"
          style={{ background: "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full translate-x-1/4 translate-y-1/4"
          style={{ background: "radial-gradient(circle, rgba(125,0,255,0.04) 0%, transparent 70%)" }}
        />
      </div>

      <div className="container relative mx-auto px-4 pt-16 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#00F5FF]/20 bg-[#00F5FF]/5 mb-6" data-testid="badge-hero-verified">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
              <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#00F5FF]">
                Research-Grade Peptides
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold tracking-tight leading-[1.1] mb-5 text-[#E0E8FF]" data-testid="text-hero-title"
              style={{ textShadow: "0 0 40px rgba(125,0,255,0.3), 0 0 80px rgba(125,0,255,0.1)" }}
            >
              Premium peptides for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#00C8D6]">
                European research
              </span>
            </h1>

            <p className="text-base leading-relaxed mb-8 max-w-lg text-[#8A94B6]" data-testid="text-hero-subtitle">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Link href="/products">
                <Button size="lg" className="gap-2 bg-[#00F5FF] text-[#0A0F1E] font-semibold shadow-[0_0_20px_rgba(0,245,255,0.3)]" data-testid="button-hero-cta">
                  Shop All Peptides
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products" data-testid="link-hero-categories">
                <Button size="lg" variant="outline" className="gap-2 border-[#00F5FF]/20 text-[#00F5FF]" data-testid="button-hero-browse">
                  View Categories
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E0E8FF]/[0.06]">
              {[
                { value: "24h", label: "Shipping" },
                { value: "98-99%+", label: "Purity" },
                { value: "27", label: "EU Countries" },
              ].map((stat, i) => (
                <div key={i} data-testid={`text-hero-stat-${i}`}>
                  <p className="text-2xl lg:text-3xl font-bold tracking-tight text-[#00F5FF]"
                    style={{ textShadow: "0 0 20px rgba(0,245,255,0.3)" }}
                  >{stat.value}</p>
                  <p className="text-[11px] tracking-wide mt-0.5 text-[#8A94B6] uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Vial3D />
          </div>
        </div>
      </div>
    </section>
  );
}

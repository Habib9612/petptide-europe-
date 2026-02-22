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
  visible: { transition: { staggerChildren: 0.15 } }
};

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

  useEffect(() => {
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.012;
      setFloatY(Math.sin(t) * 10);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center h-full" aria-hidden="true">
      <div className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[440px] lg:h-[440px] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(45, 120, 115, 0.35) 0%, transparent 70%)",
        }}
      />
      <div className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[350px] lg:h-[350px] rounded-full animate-pulse opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(45, 120, 115, 0.3) 0%, transparent 60%)",
        }}
      />

      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[65%] h-[8px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(ellipse, rgba(200, 215, 200, 0.4) 0%, transparent 70%)",
          filter: "blur(6px)",
        }}
      />

      <div
        className="relative w-[220px] h-[300px] md:w-[300px] md:h-[400px] lg:w-[360px] lg:h-[480px] xl:w-[400px] xl:h-[520px]"
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
            filter: "drop-shadow(0 25px 50px rgba(20, 60, 55, 0.4)) drop-shadow(0 0 80px rgba(45, 120, 115, 0.15))",
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
    <div className="bg-[#1a2a28] border-t border-[#2d4a44]/30 overflow-hidden" data-testid="section-trust-bar">
      <div className="relative py-4">
        <div className="flex animate-marquee gap-16 whitespace-nowrap">
          {marqueeItems.map((badge, i) => (
            <div key={i} className="flex items-center gap-2.5 shrink-0 px-2" data-testid={`trust-badge-${i}`}>
              <badge.icon className="h-3.5 w-3.5 text-[#7a9e8e] shrink-0" strokeWidth={1.5} />
              <span className="text-[11px] font-medium text-[#c8d7c8]/70 tracking-[0.08em] uppercase">{badge.label}</span>
              <span className="text-[9px] text-[#c8d7c8]/30 tracking-wide">{badge.sub}</span>
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
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      className="relative overflow-hidden min-h-[100svh]"
      style={{
        background: "linear-gradient(135deg, #1a2e2a 0%, #1f3530 25%, #253d38 50%, #1a2e2a 75%, #162724 100%)",
      }}
      data-testid="section-hero"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[60%] h-full"
          style={{
            background: "linear-gradient(180deg, rgba(45, 100, 90, 0.15) 0%, rgba(35, 80, 70, 0.08) 50%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 w-full h-[40%]"
          style={{
            background: "linear-gradient(0deg, rgba(15, 25, 22, 0.5) 0%, transparent 100%)",
          }}
        />
        <div className="absolute top-[20%] left-[45%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(45, 120, 100, 0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative min-h-[100svh] flex items-center">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_1fr] min-h-[100svh] items-center">

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="px-6 sm:px-10 lg:px-12 xl:px-16 py-16 lg:py-0 flex flex-col justify-center order-2 lg:order-1"
            >
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none border border-[#7a9e8e]/20 bg-[#7a9e8e]/5 mb-8 w-fit"
                data-testid="badge-hero-verified"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#7a9e8e] animate-pulse" />
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#c8d7c8]/60">
                  {t("hero.badge")}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-[clamp(2.5rem,5vw,6rem)] font-bold tracking-[-0.02em] leading-[1.0] text-[#e8efe4]"
                data-testid="text-hero-title"
              >
                {t("hero.mainTitle")}
              </motion.h1>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-[#7a9e8e]/15"
              >
                {[
                  { value: "€10", label: t("hero.startingPrice") },
                  { value: "99%+", label: t("hero.purityHPLC") },
                  { value: "24h", label: t("hero.euDispatch") },
                ].map((stat, i) => (
                  <div key={i} data-testid={`text-hero-stat-${i}`}>
                    <p className="text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight text-[#e8efe4]">{stat.value}</p>
                    <p className="text-[9px] lg:text-[10px] tracking-[0.15em] mt-1 text-[#7a9e8e]/70 uppercase">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="relative flex items-center justify-center py-8 lg:py-0 order-1 lg:order-2 min-h-[350px] lg:min-h-0"
            >
              <div className="absolute inset-0 flex items-end justify-center pointer-events-none" aria-hidden="true">
                <div className="w-[70%] h-[15%] rounded-[50%] opacity-15"
                  style={{
                    background: "radial-gradient(ellipse, rgba(200, 215, 200, 0.3) 0%, transparent 70%)",
                    filter: "blur(10px)",
                  }}
                />
              </div>
              <Vial3D />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="px-6 sm:px-10 lg:px-12 xl:px-16 py-16 lg:py-0 flex flex-col justify-center order-3"
            >
              <motion.h2
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.1] text-[#e8efe4] mb-5"
              >
                {t("hero.title")}
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm leading-relaxed max-w-md text-[#c8d7c8]/50 uppercase tracking-[0.04em] mb-8"
                data-testid="text-hero-subtitle"
              >
                {t("hero.mainSubtitle")}
              </motion.p>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0.55 }}
              >
                <Link href="/products">
                  <Button
                    variant="outline"
                    className="gap-3 text-[11px] font-medium tracking-[0.2em] uppercase text-[#c8d7c8]/80 border-[#7a9e8e]/25 bg-transparent px-6 py-3.5 rounded-none"
                    data-testid="button-hero-cta"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7a9e8e]" />
                    {t("hero.browseAll")}
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7a9e8e]" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="mt-4"
              >
                <Link href="/products" data-testid="link-hero-categories">
                  <Button
                    variant="ghost"
                    className="gap-2 text-[11px] font-medium tracking-[0.15em] uppercase text-[#7a9e8e]/60 px-0"
                    data-testid="button-hero-browse"
                  >
                    {t("hero.seePricing")}
                    <ArrowRight className="h-3 w-3" />
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

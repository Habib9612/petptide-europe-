import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./language-context";

interface MoleculeNode {
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
  glowColor: string;
}

interface MoleculeBond {
  from: number;
  to: number;
}

interface MoleculeData {
  nodes: MoleculeNode[];
  bonds: MoleculeBond[];
}

function generateMolecule(seed: number): MoleculeData {
  const rng = (s: number) => {
    s = Math.sin(s) * 43758.5453123;
    return s - Math.floor(s);
  };

  const nodes: MoleculeNode[] = [];
  const bonds: MoleculeBond[] = [];
  const nodeCount = 12 + Math.floor(rng(seed) * 8);
  const colors = ["#2563EB", "#3B82F6", "#60A5FA", "#1D4ED8", "#93C5FD"];
  const glowColors = ["rgba(37,99,235,0.35)", "rgba(59,130,246,0.3)", "rgba(96,165,250,0.3)", "rgba(29,78,216,0.25)", "rgba(147,197,253,0.3)"];

  for (let i = 0; i < nodeCount; i++) {
    const angle1 = rng(seed + i * 7) * Math.PI * 2;
    const angle2 = rng(seed + i * 13) * Math.PI - Math.PI / 2;
    const dist = 40 + rng(seed + i * 3) * 50;
    nodes.push({
      x: Math.cos(angle1) * Math.cos(angle2) * dist,
      y: Math.sin(angle2) * dist,
      z: Math.sin(angle1) * Math.cos(angle2) * dist,
      radius: 3 + rng(seed + i * 19) * 4,
      color: colors[Math.floor(rng(seed + i * 23) * colors.length)],
      glowColor: glowColors[Math.floor(rng(seed + i * 23) * glowColors.length)],
    });
  }

  for (let i = 0; i < nodeCount; i++) {
    const next = (i + 1) % nodeCount;
    bonds.push({ from: i, to: next });
    if (i + 2 < nodeCount && rng(seed + i * 29) > 0.5) {
      bonds.push({ from: i, to: i + 2 });
    }
  }

  return { nodes, bonds };
}

function MoleculeCanvas({ molecule, hovered }: { molecule: MoleculeData; hovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 220;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;

    const animate = () => {
      angleRef.current += 0.008;
      ctx.clearRect(0, 0, size, size);

      const cosA = Math.cos(angleRef.current);
      const sinA = Math.sin(angleRef.current);
      const cosB = Math.cos(angleRef.current * 0.3);
      const sinB = Math.sin(angleRef.current * 0.3);

      const projected = molecule.nodes.map((n) => {
        const x1 = n.x * cosA - n.z * sinA;
        const z1 = n.x * sinA + n.z * cosA;
        const y1 = n.y * cosB - z1 * sinB;
        const z2 = n.y * sinB + z1 * cosB;
        const scale = 200 / (200 + z2);
        return {
          ...n,
          px: centerX + x1 * scale,
          py: centerY + y1 * scale,
          scale,
          z: z2,
        };
      });

      projected.sort((a, b) => a.z - b.z);

      for (const bond of molecule.bonds) {
        const fromP = projected[bond.from];
        const toP = projected[bond.to];
        if (!fromP || !toP) continue;

        ctx.beginPath();
        ctx.strokeStyle = hovered ? "rgba(37,99,235,0.2)" : "rgba(37,99,235,0.1)";
        ctx.lineWidth = hovered ? 1.5 : 1;
        ctx.moveTo(fromP.px, fromP.py);
        ctx.lineTo(toP.px, toP.py);
        ctx.stroke();
      }

      for (const p of projected) {
        const r = p.radius * p.scale;

        if (hovered) {
          ctx.beginPath();
          const glow = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, r * 3);
          glow.addColorStop(0, p.glowColor);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.arc(p.px, p.py, r * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.px - r * 0.3, p.py - r * 0.3, 0, p.px, p.py, r);
        grad.addColorStop(0, "rgba(255,255,255,0.3)");
        grad.addColorStop(0.4, p.color);
        grad.addColorStop(1, p.color + "66");
        ctx.fillStyle = grad;
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animRef.current);
  }, [molecule, hovered]);

  return <canvas ref={canvasRef} className="w-[220px] h-[220px]" />;
}

const showcaseData = [
  {
    name: "BPC-157",
    subtitle: "Pentadecapeptide",
    desc: "15-amino-acid body protection compound. One of the most studied peptides for tissue repair and gut health research.",
    descKey: "showcase.bpc157",
    seed: 42,
  },
  {
    name: "GHRP-6",
    subtitle: "Hexapeptide",
    desc: "Growth hormone releasing hexapeptide. Widely used in GH secretion, appetite regulation, and metabolic studies.",
    descKey: "showcase.ghrp6",
    seed: 137,
  },
  {
    name: "Semaglutide",
    subtitle: "GLP-1 Agonist",
    desc: "GLP-1 receptor agonist. The leading research compound for metabolic regulation and weight management studies.",
    descKey: "showcase.semaglutide",
    seed: 256,
  },
];

export function PeptideShowcase() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const molecules = showcaseData.map((d) => generateMolecule(d.seed));

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <motion.section 
      className="py-16 lg:py-24 bg-background relative overflow-hidden" 
      data-testid="section-showcase"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <div className="container relative mx-auto px-4">
        <motion.div className="text-center mb-12" variants={fadeInUp}>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">{t("showcase.label")}</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            data-testid="text-showcase-title"
          >
            {t("showcase.title")}
          </h2>
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" variants={staggerContainer}>
          {showcaseData.map((item, i) => (
            <motion.div
              key={item.name}
              className="rounded-xl border bg-card p-6 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              style={{
                borderColor: hoveredIndex === i ? "hsl(220 70% 50% / 0.3)" : "hsl(220 10% 90%)",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-testid={`card-showcase-${i}`}
              variants={fadeInUp}
            >
              <div className="mb-4">
                <MoleculeCanvas molecule={molecules[i]} hovered={hoveredIndex === i} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1" data-testid={`text-showcase-name-${i}`}>{item.name}</h3>
              <p className="text-xs font-medium text-muted-foreground mb-2 tracking-wider uppercase">{item.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

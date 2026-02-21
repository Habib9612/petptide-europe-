import { useEffect, useRef, useState } from "react";

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
  const colors = ["#00F5FF", "#00C8D6", "#7D00FF", "#5B00CC", "#00E5EF"];
  const glowColors = ["rgba(0,245,255,0.6)", "rgba(0,200,214,0.5)", "rgba(125,0,255,0.5)", "rgba(91,0,204,0.4)", "rgba(0,229,239,0.5)"];

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
        const a = projected.find((p) => p === projected[bond.from]) || projected[bond.from];
        const b = projected.find((p) => p === projected[bond.to]) || projected[bond.to];
        if (!a || !b) continue;

        const fromP = projected[bond.from];
        const toP = projected[bond.to];
        if (!fromP || !toP) continue;

        ctx.beginPath();
        ctx.strokeStyle = hovered ? "rgba(0,245,255,0.25)" : "rgba(0,245,255,0.12)";
        ctx.lineWidth = hovered ? 1.5 : 1;
        ctx.moveTo(fromP.px, fromP.py);
        ctx.lineTo(toP.px, toP.py);
        ctx.stroke();
      }

      for (const p of projected) {
        const r = p.radius * p.scale;

        if (hovered) {
          ctx.beginPath();
          const glow = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, r * 4);
          glow.addColorStop(0, p.glowColor);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.arc(p.px, p.py, r * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.px - r * 0.3, p.py - r * 0.3, 0, p.px, p.py, r);
        grad.addColorStop(0, "rgba(255,255,255,0.4)");
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
    desc: "15-residue peptide derived from body protection compound. Known for tissue-repair research applications.",
    seed: 42,
  },
  {
    name: "GHRP-6",
    subtitle: "Hexapeptide",
    desc: "Growth hormone releasing hexapeptide. Used in GH secretion and metabolic research studies.",
    seed: 137,
  },
  {
    name: "Semaglutide",
    subtitle: "GLP-1 Agonist",
    desc: "39-residue modified peptide analog. Leading compound in metabolic regulation research.",
    seed: 256,
  },
];

export function PeptideShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const molecules = showcaseData.map((d) => generateMolecule(d.seed));

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-[#0A0F1E] relative overflow-hidden" data-testid="section-showcase">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(125,0,255,0.04) 0%, transparent 60%)" }}
        />
      </div>
      <div className="container relative mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#00F5FF] mb-3">Molecular Research</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E0E8FF]"
            style={{ textShadow: "0 0 30px rgba(125,0,255,0.25)" }}
            data-testid="text-showcase-title"
          >
            Peptide Structures
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {showcaseData.map((item, i) => (
            <div
              key={item.name}
              className="rounded-xl border p-6 flex flex-col items-center text-center"
              style={{
                background: hoveredIndex === i
                  ? "linear-gradient(135deg, rgba(16,24,48,0.95), rgba(125,0,255,0.08))"
                  : "#101830",
                borderColor: hoveredIndex === i ? "rgba(0,245,255,0.25)" : "rgba(0,245,255,0.08)",
                boxShadow: hoveredIndex === i ? "0 0 40px rgba(125,0,255,0.15), 0 0 80px rgba(0,245,255,0.05)" : "none",
                transition: "all 0.4s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${i * 150}ms`,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-testid={`card-showcase-${i}`}
            >
              <div className="mb-4">
                <MoleculeCanvas molecule={molecules[i]} hovered={hoveredIndex === i} />
              </div>
              <h3 className="text-lg font-bold text-[#E0E8FF] mb-1" data-testid={`text-showcase-name-${i}`}>{item.name}</h3>
              <p className="text-xs font-medium text-[#00F5FF] mb-2 tracking-wider uppercase">{item.subtitle}</p>
              <p className="text-sm text-[#8A94B6] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

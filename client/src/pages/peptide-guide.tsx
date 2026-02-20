import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import {
  Search,
  FlaskConical,
  Dumbbell,
  Heart,
  Brain,
  Clock,
  Shield,
  Sparkles,
  TrendingDown,
  Flame,
  Syringe,
  Beaker,
  CalendarDays,
  Repeat,
  Info,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  peptideGuideData,
  peptideCategories,
  type PeptideCategory,
  type PeptideGuideEntry,
} from "@/lib/peptide-guide-data";

const categoryConfig: Record<
  string,
  { icon: typeof FlaskConical; color: string; bgColor: string }
> = {
  "Weight Loss": {
    icon: TrendingDown,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
  },
  "Fat Loss / Muscle": {
    icon: Flame,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
  },
  "Muscle Growth": {
    icon: Dumbbell,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  "Recovery & Repair": {
    icon: Heart,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/30",
  },
  Cognitive: {
    icon: Brain,
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
  },
  "Longevity & Anti-Aging": {
    icon: Clock,
    color: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-50 dark:bg-sky-950/30",
  },
  "Immune & Gut": {
    icon: Shield,
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-50 dark:bg-teal-950/30",
  },
  "Sexual Health": {
    icon: Sparkles,
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-50 dark:bg-pink-950/30",
  },
  "Skin & UV Protection": {
    icon: Sparkles,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
  },
};

function PeptideRow({
  entry,
  expanded,
  onToggle,
}: {
  entry: PeptideGuideEntry;
  expanded: boolean;
  onToggle: () => void;
}) {
  const config = categoryConfig[entry.category] || {
    icon: FlaskConical,
    color: "text-muted-foreground",
    bgColor: "bg-muted/30",
  };
  const Icon = config.icon;

  return (
    <div
      className="border-b border-border/50 last:border-b-0"
      data-testid={`guide-row-${entry.name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3.5 flex items-center gap-3"
        data-testid={`guide-toggle-${entry.name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-md ${config.bgColor} flex items-center justify-center`}
        >
          <Icon className={`h-4 w-4 ${config.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-sm">{entry.name}</span>
          <span className="ml-2 text-xs text-muted-foreground hidden sm:inline">
            {entry.dose}
          </span>
        </div>
        <Badge variant="secondary" className="text-[10px] hidden md:flex">
          {entry.category}
        </Badge>
        <span className="text-xs text-muted-foreground flex-shrink-0 hidden sm:block">
          {entry.cycle}
        </span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <DetailCell icon={Beaker} label="Vial Size" value={entry.vialSize} />
            <DetailCell
              icon={FlaskConical}
              label="Reconstitute"
              value={entry.reconstitute}
            />
            <DetailCell icon={Syringe} label="Dose" value={entry.dose} />
            <DetailCell
              icon={Repeat}
              label="Frequency"
              value={entry.frequency}
            />
            <DetailCell icon={CalendarDays} label="Cycle" value={entry.cycle} />
          </div>
          <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 rounded-md p-2.5">
            <Info className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
            <span>{entry.note}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailCell({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FlaskConical;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-muted/20 rounded-md p-2.5 border border-border/30">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="h-3 w-3 text-muted-foreground" />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
          {label}
        </span>
      </div>
      <span className="text-xs font-medium">{value}</span>
    </div>
  );
}

function CategorySummaryCard({
  category,
  count,
  isActive,
  onClick,
}: {
  category: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const config = categoryConfig[category] || {
    icon: FlaskConical,
    color: "text-muted-foreground",
    bgColor: "bg-muted/30",
  };
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-left ${
        isActive
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "border-border/50"
      }`}
      data-testid={`guide-filter-${category.toLowerCase().replace(/[\s\/&]+/g, "-")}`}
    >
      <div
        className={`w-7 h-7 rounded-md ${config.bgColor} flex items-center justify-center flex-shrink-0`}
      >
        <Icon className={`h-3.5 w-3.5 ${config.color}`} />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-medium truncate">{category}</div>
        <div className="text-[10px] text-muted-foreground">
          {count} peptide{count !== 1 ? "s" : ""}
        </div>
      </div>
    </button>
  );
}

export default function PeptideGuide() {
  const [activeCategory, setActiveCategory] = useState<PeptideCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const entry of peptideGuideData) {
      counts[entry.category] = (counts[entry.category] || 0) + 1;
    }
    return counts;
  }, []);

  const filteredPeptides = useMemo(() => {
    let results = peptideGuideData;

    if (activeCategory !== "All") {
      results = results.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.note.toLowerCase().includes(q),
      );
    }

    return results;
  }, [activeCategory, searchQuery]);

  const groupedPeptides = useMemo(() => {
    const groups: Record<string, PeptideGuideEntry[]> = {};
    for (const p of filteredPeptides) {
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category].push(p);
    }
    return groups;
  }, [filteredPeptides]);

  const toggleRow = (name: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedRows(new Set(filteredPeptides.map((p) => p.name)));
  };

  const collapseAll = () => {
    setExpandedRows(new Set());
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-[hsl(186,65%,12%)] to-[hsl(186,45%,18%)] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white/90 text-sm mb-6 transition-colors"
            data-testid="link-guide-back"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Syringe className="h-6 w-6 text-[hsl(186,65%,60%)]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Peptide Dosage Guide
              </h1>
              <p className="text-white/60 mt-2 text-sm sm:text-base max-w-2xl">
                Comprehensive reference for research peptide dosing, reconstitution, 
                cycle length, and administration frequency. For laboratory research use only.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[hsl(186,65%,60%)]">
                {peptideGuideData.length}
              </div>
              <div className="text-xs text-white/50 mt-1">Peptides</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[hsl(35,75%,55%)]">
                {Object.keys(categoryCounts).length}
              </div>
              <div className="text-xs text-white/50 mt-1">Categories</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[hsl(155,55%,50%)]">
                98%+
              </div>
              <div className="text-xs text-white/50 mt-1">Purity</div>
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl sm:text-3xl font-bold text-violet-400">
                HPLC
              </div>
              <div className="text-xs text-white/50 mt-1">Verified</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search peptides, categories, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-guide-search"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="text-xs text-muted-foreground"
              data-testid="button-expand-all"
            >
              Expand all
            </button>
            <span className="text-muted-foreground/40">|</span>
            <button
              onClick={collapseAll}
              className="text-xs text-muted-foreground"
              data-testid="button-collapse-all"
            >
              Collapse all
            </button>
            <Badge variant="outline" className="ml-2 text-[10px]">
              {filteredPeptides.length} result
              {filteredPeptides.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("All")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-left ${
              activeCategory === "All"
                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                : "border-border/50"
            }`}
            data-testid="guide-filter-all"
          >
            <div className="w-7 h-7 rounded-md bg-muted/50 flex items-center justify-center flex-shrink-0">
              <FlaskConical className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div>
              <div className="text-xs font-medium">All</div>
              <div className="text-[10px] text-muted-foreground">
                {peptideGuideData.length} peptides
              </div>
            </div>
          </button>
          {peptideCategories
            .filter((c) => c !== "All")
            .map((cat) => (
              <CategorySummaryCard
                key={cat}
                category={cat}
                count={categoryCounts[cat] || 0}
                isActive={activeCategory === cat}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === cat ? "All" : (cat as PeptideCategory),
                  )
                }
              />
            ))}
        </div>

        {Object.entries(groupedPeptides).map(([category, peptides]) => {
          const config = categoryConfig[category] || {
            icon: FlaskConical,
            color: "text-muted-foreground",
            bgColor: "bg-muted/30",
          };
          const Icon = config.icon;

          return (
            <div key={category} className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`h-4 w-4 ${config.color}`} />
                <h2 className="text-sm font-semibold">{category}</h2>
                <Badge variant="outline" className="text-[10px]">
                  {peptides.length}
                </Badge>
              </div>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {peptides.map((entry) => (
                    <PeptideRow
                      key={entry.name}
                      entry={entry}
                      expanded={expandedRows.has(entry.name)}
                      onToggle={() => toggleRow(entry.name)}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>
          );
        })}

        {filteredPeptides.length === 0 && (
          <div className="text-center py-16">
            <FlaskConical className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">
              No peptides found matching your search.
            </p>
          </div>
        )}

        <Card className="mt-8 border-amber-200/50 dark:border-amber-800/30 bg-amber-50/50 dark:bg-amber-950/10">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Research Use Only:</strong>{" "}
              This dosage guide is provided for informational and research
              reference purposes only. All peptides listed are intended
              exclusively for laboratory research and in-vitro studies. This
              information does not constitute medical advice, diagnosis, or
              treatment recommendations. Always consult relevant regulatory
              guidelines and institutional protocols before conducting research.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { ProductCard } from "@/components/product-card";
import { useLanguage } from "@/components/language-context";
import { products, getCategoryName } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

const categories = [
  { id: "all", name: "All Categories" },
  { id: "glp1", name: "GLP-1 Agonists" },
  { id: "healing", name: "Healing & Repair" },
  { id: "growth", name: "Growth Factors" },
  { id: "cosmetic", name: "Cosmetic Peptides" },
  { id: "nootropics", name: "Nootropics" },
];

export default function Products() {
  const { t } = useLanguage();
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const initialCategory = urlParams.get("category") || "all";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("name");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.codeName.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("name");
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "all" || sortBy !== "name";

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-muted/50 to-background border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-products-title">
            {t("products.title")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Premium research-grade peptides with HPLC-verified purity. All products are for laboratory research purposes only.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 mb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search peptides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48" data-testid="select-category">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id} data-testid={`option-category-${cat.id}`}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-40" data-testid="select-sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2" data-testid="button-clear-filters">
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>

        {selectedCategory !== "all" && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold" data-testid="text-category-name">
              {getCategoryName(selectedCategory)}
            </h2>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16" data-testid="text-no-results">
            <p className="text-lg text-muted-foreground mb-4">No products found</p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6" data-testid="text-results-count">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

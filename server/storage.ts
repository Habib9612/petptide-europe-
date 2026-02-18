import { randomUUID } from "crypto";
import type { Product, CartItem, Order, InsertOrder } from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  
  // Cart
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addCartItem(sessionId: string, productId: string, quantity: number): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: string): Promise<Order | undefined>;
}

// Product data
const productsData: Product[] = [
  {
    id: "tirzepatide-10mg",
    name: "Tirzepatide 10mg",
    codeName: "TRIZZY",
    price: 24.00,
    regularPrice: 28.00,
    category: "glp1",
    shortDescription: "A dual GIP and GLP-1 receptor agonist. Research indicates potential for significant weight management and glycemic control applications.",
    fullDescription: "Tirzepatide is a novel, dual-acting GIP and GLP-1 receptor agonist. This synthetic peptide has been the subject of extensive research for its potential to regulate blood glucose levels and influence body weight.",
    sequence: "Y-Aib-E-G-T-F-T-S-D-Y-S-I-A-M-D-K-I-H-Q-Q-D-F-V-N-W-L-L-A-Q-K-G-K-K-N-D-W-K-H-N-I-T-Q",
    casNumber: "2023788-19-2",
    molecularFormula: "C225H348N48O68",
    molecularWeight: "4813.45 g/mol",
    purity: "≥99.5% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 45,
    imageUrl: "/images/products/tirzepatide.png",
  },
  {
    id: "semaglutide-5mg",
    name: "Semaglutide 5mg",
    codeName: "SEMA",
    price: 14.00,
    regularPrice: 18.00,
    category: "glp1",
    shortDescription: "A GLP-1 receptor agonist. Studies suggest efficacy in metabolic regulation and appetite modulation.",
    fullDescription: "Semaglutide is a GLP-1 analogue modified to increase half-life. Research indicates it may play a significant role in metabolic health.",
    sequence: "H-Aib-E-G-T-F-T-S-D-V-S-S-Y-L-E-G-Q-A-A-K-E-F-I-A-W-L-V-R-G-R-G",
    casNumber: "910463-68-2",
    molecularFormula: "C187H291N45O59",
    molecularWeight: "4113.58 g/mol",
    purity: "≥99.5% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 62,
    imageUrl: "/images/products/semaglutide.png",
  },
  {
    id: "retatrutide-10mg",
    name: "Retatrutide 10mg",
    codeName: "RITA",
    price: 31.00,
    regularPrice: 35.00,
    category: "glp1",
    shortDescription: "A triple agonist (GLP-1, GIP, and Glucagon receptors). Emerging research highlights its potent metabolic effects.",
    fullDescription: "Retatrutide is a cutting-edge triple agonist peptide targeting multiple receptors simultaneously.",
    sequence: "Y-Aib-Q-G-T-F-T-S-D-Y-S-I-L-D-K-A-Q-A-A-E-F-V-N-W-L-L-A-G-G-P-S-S-G-A-P-P-P-S-NH2",
    casNumber: "2381089-83-2",
    molecularFormula: "C221H342N46O68",
    molecularWeight: "4731.33 g/mol",
    purity: "≥99.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 28,
    imageUrl: "/images/products/retatrutide.png",
  },
  {
    id: "bpc157-5mg",
    name: "BPC-157 5mg",
    codeName: "WOLVERINE",
    price: 10.00,
    regularPrice: 14.00,
    category: "healing",
    shortDescription: "Body Protection Compound-157. Research focuses on its regenerative properties in tendons, ligaments, and gut health.",
    fullDescription: "BPC-157 is a pentadecapeptide composed of 15 amino acids derived from a protective protein found in the stomach.",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Add-Asp-Asp-Ala-Gly-Leu-Val",
    casNumber: "137525-51-0",
    molecularFormula: "C62H98N16O22",
    molecularWeight: "1419.56 g/mol",
    purity: "≥99.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 89,
    imageUrl: "/images/products/bpc157.png",
  },
  {
    id: "tb500-10mg",
    name: "TB-500 10mg",
    codeName: "RECOVERY",
    price: 26.00,
    regularPrice: 30.00,
    category: "healing",
    shortDescription: "Synthetic fraction of Thymosin Beta-4. Investigated for its role in cellular migration and tissue repair.",
    fullDescription: "TB-500 is a synthetic version of Thymosin Beta-4, vital for building new blood vessels and cell migration.",
    sequence: "Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys",
    casNumber: "77591-33-4",
    molecularFormula: "C212H350N56O78S",
    molecularWeight: "4963.50 g/mol",
    purity: "≥99.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 54,
    imageUrl: "/images/products/tb500.png",
  },
  {
    id: "cjc1295-nodac-5mg",
    name: "CJC-1295 No DAC 5mg",
    codeName: "GROWTH-MOD",
    price: 11.00,
    regularPrice: 15.00,
    category: "growth",
    shortDescription: "A GHRH analogue. Research suggests it may amplify pulsatile growth hormone secretion.",
    fullDescription: "CJC-1295 without DAC is a synthetic GHRH analogue designed to stimulate growth hormone release.",
    sequence: "Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg-NH2",
    casNumber: "863288-34-0",
    molecularFormula: "C152H252N44O42",
    molecularWeight: "3367.97 g/mol",
    purity: "≥98.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 73,
    imageUrl: "/images/products/cjc1295.png",
  },
  {
    id: "ipamorelin-5mg",
    name: "Ipamorelin 5mg",
    codeName: "IPA",
    price: 11.00,
    regularPrice: 15.00,
    category: "growth",
    shortDescription: "A selective GH-Secretagogue. Known in research for specificity without significant cortisol or prolactin elevation.",
    fullDescription: "Ipamorelin is a pentapeptide and selective agonist of the ghrelin receptor, unique for its high specificity.",
    sequence: "Aib-His-D-2-Nal-D-Phe-Lys-NH2",
    casNumber: "170851-70-4",
    molecularFormula: "C38H49N9O5",
    molecularWeight: "711.85 g/mol",
    purity: "≥99.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 81,
    imageUrl: "/images/products/ipamorelin.png",
  },
  {
    id: "ghkcu-50mg",
    name: "GHK-Cu 50mg",
    codeName: "BLUE-GOLD",
    price: 16.00,
    regularPrice: 20.00,
    category: "cosmetic",
    shortDescription: "Copper peptide. Extensively studied for skin remodeling, wound healing, and anti-aging properties.",
    fullDescription: "GHK-Cu is a naturally occurring copper complex of the tripeptide glycyl-L-histidyl-L-lysine.",
    sequence: "Gly-His-Lys(Cu2+)",
    casNumber: "49557-75-7",
    molecularFormula: "C14H24N6O4Cu",
    molecularWeight: "403.94 g/mol",
    purity: "≥99.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 67,
    imageUrl: "/images/products/ghkcu.png",
  },
  {
    id: "melanotan2-10mg",
    name: "Melanotan II 10mg",
    codeName: "SUN-KISS",
    price: 8.00,
    regularPrice: 12.00,
    category: "cosmetic",
    shortDescription: "Synthetic analogue of alpha-MSH. Research focuses on melanogenesis (tanning) and libido effects.",
    fullDescription: "Melanotan II is a synthetic analogue of alpha-melanocyte-stimulating hormone.",
    sequence: "Ac-Nle-Asp-His-D-Phe-Arg-Trp-Lys-NH2",
    casNumber: "121062-08-6",
    molecularFormula: "C50H69N15O9",
    molecularWeight: "1024.18 g/mol",
    purity: "≥98.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 92,
    imageUrl: "/images/products/melanotan2.png",
  },
  {
    id: "pt141-10mg",
    name: "PT-141 (Bremelanotide) 10mg",
    codeName: "PASSION",
    price: 11.00,
    regularPrice: 15.00,
    category: "nootropics",
    shortDescription: "Melanocortin receptor agonist. Studied for its central effects on sexual arousal and desire.",
    fullDescription: "PT-141 acts on the central nervous system to directly increase sexual desire and arousal.",
    sequence: "Ac-Nle-Asp-His-D-Phe-Arg-Trp-Lys-OH",
    casNumber: "189691-06-3",
    molecularFormula: "C50H68N14O10",
    molecularWeight: "1025.2 g/mol",
    purity: "≥98.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 58,
    imageUrl: "/images/products/pt141.png",
  },
  {
    id: "nad-100mg",
    name: "NAD+ 100mg",
    codeName: "CELL-FUEL",
    price: 21.00,
    regularPrice: 25.00,
    category: "nootropics",
    shortDescription: "Nicotinamide Adenine Dinucleotide. Critical coenzyme essential for energy metabolism.",
    fullDescription: "NAD+ is a coenzyme central to metabolism, essential for sirtuin function and cellular health.",
    sequence: "N/A (Coenzyme)",
    casNumber: "53-84-9",
    molecularFormula: "C21H27N7O14P2",
    molecularWeight: "663.43 g/mol",
    purity: "≥99.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 44,
    imageUrl: "/images/products/nad.png",
  },
  {
    id: "epithalon-10mg",
    name: "Epithalon 10mg",
    codeName: "TIME-KEEPER",
    price: 14.00,
    regularPrice: 18.00,
    category: "nootropics",
    shortDescription: "Synthetic tetrapeptide. Research investigates its effects on telomerase activity and longevity.",
    fullDescription: "Epithalon is a synthetic tetrapeptide studied for its ability to activate telomerase.",
    sequence: "Ala-Glu-Asp-Gly",
    casNumber: "307297-39-8",
    molecularFormula: "C14H22N4O9",
    molecularWeight: "390.35 g/mol",
    purity: "≥98.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 71,
    imageUrl: "/images/products/epithalon.png",
  },
  {
    id: "motsc-10mg",
    name: "MOTS-c 10mg",
    codeName: "MITO-BURN",
    price: 18.00,
    regularPrice: 22.00,
    category: "glp1",
    shortDescription: "Mitochondrial-derived peptide. Studied for metabolic regulation and exercise mimetics.",
    fullDescription: "MOTS-c is a peptide encoded in mitochondrial DNA, acting as an exercise mimetic.",
    sequence: "Met-Arg-Trp-Q-E-M-G-Y-I-F-Y-P-R-K-L-R",
    casNumber: "1627580-64-6",
    molecularFormula: "C101H152N28O22S2",
    molecularWeight: "2174.6 g/mol",
    purity: "≥98.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 36,
    imageUrl: "/images/products/motsc.png",
  },
  {
    id: "kpv-10mg",
    name: "KPV 10mg",
    codeName: "CALM-GUT",
    price: 12.00,
    regularPrice: 16.00,
    category: "healing",
    shortDescription: "C-terminal tripeptide of alpha-MSH. Research highlights its potent anti-inflammatory properties.",
    fullDescription: "KPV retains potent anti-inflammatory properties without pigment-inducing effects.",
    sequence: "Lys-Pro-Val",
    casNumber: "67727-97-3",
    molecularFormula: "C16H32N6O4",
    molecularWeight: "372.46 g/mol",
    purity: "≥98.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 63,
    imageUrl: "/images/products/kpv.png",
  },
  {
    id: "thymosin-alpha1-5mg",
    name: "Thymosin Alpha-1 5mg",
    codeName: "IMMUNE-BOOST",
    price: 16.00,
    regularPrice: 20.00,
    category: "healing",
    shortDescription: "Peptide fragment. Clinically studied for immune system modulation and enhancement.",
    fullDescription: "Thymosin Alpha-1 is a potent modulator of immune function, enhancing T-cell activity.",
    sequence: "Ac-S-D-A-A-V-D-T-S-S-E-I-T-T-K-D-L-K-E-K-K-E-V-V-E-E-A-E-N",
    casNumber: "62304-98-7",
    molecularFormula: "C129H215N33O55",
    molecularWeight: "3108.3 g/mol",
    purity: "≥98.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 47,
    imageUrl: "/images/products/thymosinalpha1.png",
  },
];

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    
    // Initialize products
    productsData.forEach((product) => {
      this.products.set(product.id, product);
    });
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter((p) => p.category === category);
  }

  // Cart
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter((item) => item.sessionId === sessionId);
  }

  async addCartItem(sessionId: string, productId: string, quantity: number): Promise<CartItem> {
    const existing = Array.from(this.cartItems.values()).find(
      (item) => item.sessionId === sessionId && item.productId === productId
    );

    if (existing) {
      existing.quantity += quantity;
      return existing;
    }

    const id = randomUUID();
    const cartItem: CartItem = { id, productId, quantity, sessionId };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      return item;
    }
    return undefined;
  }

  async removeCartItem(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToDelete = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.sessionId === sessionId)
      .map(([id]) => id);
    
    itemsToDelete.forEach((id) => this.cartItems.delete(id));
  }

  // Orders
  async createOrder(orderData: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...orderData,
      id,
      status: "pending",
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();

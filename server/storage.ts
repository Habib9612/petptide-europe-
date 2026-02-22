import { randomUUID } from "crypto";
import type { Product, CartItem, Order, InsertOrder, NewsletterSubscriber, InsertNewsletter, UserBlogPost, InsertUserBlogPost } from "@shared/schema";
import { products, cartItems, orders, newsletterSubscribers, userBlogPosts } from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

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

  // Newsletter
  subscribeNewsletter(email: string): Promise<NewsletterSubscriber>;
  getNewsletterByEmail(email: string): Promise<NewsletterSubscriber | undefined>;
  validateDiscountCode(code: string): Promise<NewsletterSubscriber | undefined>;
  markDiscountUsed(code: string): Promise<void>;

  // User Blog Posts
  getUserBlogPosts(): Promise<UserBlogPost[]>;
  getUserBlogPostById(id: string): Promise<UserBlogPost | undefined>;
  createUserBlogPost(post: InsertUserBlogPost): Promise<UserBlogPost>;
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
  {
    id: "mk677-25mg",
    name: "MK-677 (Ibutamoren) 25mg",
    codeName: "HUNGER",
    price: 15.00,
    regularPrice: 19.00,
    category: "growth",
    shortDescription: "GHS and ghrelin receptor agonist. Research indicates its potential to increase IGF-1 and growth hormone levels.",
    fullDescription: "MK-677 is a non-peptide, orally active, potent, and selective agonist of the ghrelin receptor.",
    sequence: "N/A (Small Molecule)",
    casNumber: "159752-10-0",
    molecularFormula: "C27H36N4O5S",
    molecularWeight: "528.67 g/mol",
    purity: "≥99.0% (HPLC Verified)",
    storage: "Store at room temperature. Keep away from direct sunlight.",
    stock: 55,
    imageUrl: "/images/products/mk677.png",
  },
  {
    id: "igf1lr3-1mg",
    name: "IGF-1 LR3 1mg",
    codeName: "ANABOLIC-X",
    price: 28.00,
    regularPrice: 32.00,
    category: "growth",
    shortDescription: "Long arginine 3-IGF-1. A potent analogue of human IGF-1 with an extended half-life for research.",
    fullDescription: "IGF-1 LR3 is a synthetic protein and elongated analogue of human insulin-like growth factor 1 (IGF-1).",
    sequence: "83 amino acids",
    casNumber: "946870-92-4",
    molecularFormula: "C400H625N111O115S9",
    molecularWeight: "9111.6 g/mol",
    purity: "≥98.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 24,
    imageUrl: "/images/products/igf1lr3.png",
  },
  {
    id: "tesamorelin-10mg",
    name: "Tesamorelin 10mg",
    codeName: "LEAN-CORE",
    price: 32.00,
    regularPrice: 36.00,
    category: "growth",
    shortDescription: "GHRH analogue. Extensively researched for its role in reducing abdominal adiposity and enhancing GH secretion.",
    fullDescription: "Tesamorelin is a synthetic form of growth hormone-releasing hormone (GHRH).",
    sequence: "trans-3-Hexenoyl-Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-Gln-Gln-Gly-Glu-Ser-Asn-Gln-Glu-Arg-Gly-Ala-Arg-Ala-Arg-Leu-NH2",
    casNumber: "218949-48-5",
    molecularFormula: "C221H366N72O67S",
    molecularWeight: "5135.9 g/mol",
    purity: "≥98.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 31,
    imageUrl: "/images/products/tesamorelin.png",
  },
  {
    id: "sermorelin-5mg",
    name: "Sermorelin 5mg",
    codeName: "VITALITY",
    price: 13.00,
    regularPrice: 17.00,
    category: "growth",
    shortDescription: "GHRH fragment (1-29). Studied for its ability to stimulate the pituitary gland to produce growth hormone.",
    fullDescription: "Sermorelin is a truncated version of the growth hormone-releasing hormone (GHRH) consisting of the first 29 amino acids.",
    sequence: "Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-NH2",
    casNumber: "86168-78-7",
    molecularFormula: "C149H246N44O42S",
    molecularWeight: "3357.9 g/mol",
    purity: "≥99.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 68,
    imageUrl: "/images/products/sermorelin.png",
  },
  {
    id: "hexarelin-2mg",
    name: "Hexarelin 2mg",
    codeName: "HEART-GUARD",
    price: 10.00,
    regularPrice: 14.00,
    category: "growth",
    shortDescription: "Potent GHRP. Investigated for its cardioprotective properties and growth hormone secretagogue activity.",
    fullDescription: "Hexarelin is a highly potent synthetic hexapeptide growth hormone secretagogue (GHS).",
    sequence: "His-D-2-methyl-Trp-Ala-Trp-D-Phe-Lys-NH2",
    casNumber: "140703-51-1",
    molecularFormula: "C47H58N12O6",
    molecularWeight: "887.04 g/mol",
    purity: "≥98.0% (HPLC Verified)",
    storage: "Store at -20°C. Keep away from light.",
    stock: 42,
    imageUrl: "/images/products/hexarelin.png",
  },
];

export class DatabaseStorage implements IStorage {
  async init() {
    const existing = await db.select().from(products);
    if (existing.length === 0) {
      await db.insert(products).values(productsData);
    }
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const rows = await db.select().from(products).where(eq(products.id, id));
    return rows[0];
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return await db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
  }

  async addCartItem(sessionId: string, productId: string, quantity: number): Promise<CartItem> {
    const existing = await db.select().from(cartItems).where(
      and(eq(cartItems.sessionId, sessionId), eq(cartItems.productId, productId))
    );

    if (existing.length > 0) {
      const updated = await db.update(cartItems)
        .set({ quantity: existing[0].quantity + quantity })
        .where(eq(cartItems.id, existing[0].id))
        .returning();
      return updated[0];
    }

    const id = randomUUID();
    const rows = await db.insert(cartItems).values({ id, productId, quantity, sessionId }).returning();
    return rows[0];
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const rows = await db.update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return rows[0];
  }

  async removeCartItem(id: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }

  async clearCart(sessionId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
  }

  async createOrder(orderData: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const rows = await db.insert(orders).values({ ...orderData, id, status: "pending" }).returning();
    return rows[0];
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    const rows = await db.select().from(orders).where(eq(orders.id, id));
    return rows[0];
  }

  async subscribeNewsletter(email: string): Promise<NewsletterSubscriber> {
    const existing = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email));
    if (existing.length > 0) return existing[0];

    const id = randomUUID();
    const discountCode = "WELCOME10-" + randomUUID().slice(0, 8).toUpperCase();
    const rows = await db.insert(newsletterSubscribers).values({
      id,
      email,
      discountCode,
      subscribedAt: new Date().toISOString(),
      used: false,
    }).returning();
    return rows[0];
  }

  async getNewsletterByEmail(email: string): Promise<NewsletterSubscriber | undefined> {
    const rows = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email));
    return rows[0];
  }

  async validateDiscountCode(code: string): Promise<NewsletterSubscriber | undefined> {
    const rows = await db.select().from(newsletterSubscribers).where(
      and(eq(newsletterSubscribers.discountCode, code), eq(newsletterSubscribers.used, false))
    );
    return rows[0];
  }

  async markDiscountUsed(code: string): Promise<void> {
    await db.update(newsletterSubscribers)
      .set({ used: true })
      .where(eq(newsletterSubscribers.discountCode, code));
  }

  async getUserBlogPosts(): Promise<UserBlogPost[]> {
    return await db.select().from(userBlogPosts).orderBy(desc(userBlogPosts.createdAt));
  }

  async getUserBlogPostById(id: string): Promise<UserBlogPost | undefined> {
    const rows = await db.select().from(userBlogPosts).where(eq(userBlogPosts.id, id));
    return rows[0];
  }

  async createUserBlogPost(postData: InsertUserBlogPost): Promise<UserBlogPost> {
    const id = randomUUID();
    const rows = await db.insert(userBlogPosts).values({ ...postData, id }).returning();
    return rows[0];
  }
}

export const storage = new DatabaseStorage();
storage.init().catch(console.error);

import { pgTable, text, varchar, integer, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Product schema
export const products = pgTable("products", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  codeName: text("code_name").notNull(),
  price: real("price").notNull(),
  regularPrice: real("regular_price"),
  category: text("category").notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  sequence: text("sequence"),
  casNumber: text("cas_number"),
  molecularFormula: text("molecular_formula"),
  molecularWeight: text("molecular_weight"),
  purity: text("purity"),
  storage: text("storage"),
  stock: integer("stock").notNull().default(50),
  imageUrl: text("image_url"),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Cart item schema
export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey(),
  productId: varchar("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  sessionId: varchar("session_id").notNull(),
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true });
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;

// Order schema
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey(),
  email: text("email").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  postalCode: text("postal_code").notNull(),
  paymentMethod: text("payment_method").notNull(),
  subtotal: real("subtotal").notNull(),
  shipping: real("shipping").notNull(),
  discount: real("discount").notNull().default(0),
  total: real("total").notNull(),
  status: text("status").notNull().default("pending"),
  items: text("items").notNull(), // JSON string of cart items
});

export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, status: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Newsletter subscribers
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey(),
  email: text("email").notNull(),
  discountCode: text("discount_code").notNull(),
  subscribedAt: text("subscribed_at").notNull(),
  used: boolean("used").notNull().default(false),
});

export const insertNewsletterSchema = createInsertSchema(newsletterSubscribers).omit({ id: true, used: true });
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

// User blog posts
export const userBlogPosts = pgTable("user_blog_posts", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserBlogPostSchema = createInsertSchema(userBlogPosts).omit({ id: true });
export type InsertUserBlogPost = z.infer<typeof insertUserBlogPostSchema>;
export type UserBlogPost = typeof userBlogPosts.$inferSelect;

export const affiliates = pgTable("affiliates", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  website: text("website"),
  promotionMethod: text("promotion_method").notNull(),
  referralCode: text("referral_code").notNull(),
  commissionRate: real("commission_rate").notNull().default(10),
  totalClicks: integer("total_clicks").notNull().default(0),
  totalConversions: integer("total_conversions").notNull().default(0),
  totalEarnings: real("total_earnings").notNull().default(0),
  status: text("status").notNull().default("active"),
  createdAt: text("created_at").notNull(),
});

export const insertAffiliateSchema = createInsertSchema(affiliates).omit({ id: true, referralCode: true, totalClicks: true, totalConversions: true, totalEarnings: true, status: true });
export type InsertAffiliate = z.infer<typeof insertAffiliateSchema>;
export type Affiliate = typeof affiliates.$inferSelect;

export const affiliateReferrals = pgTable("affiliate_referrals", {
  id: varchar("id").primaryKey(),
  affiliateId: varchar("affiliate_id").notNull(),
  orderId: varchar("order_id"),
  orderTotal: real("order_total"),
  commission: real("commission"),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull(),
});

export const insertAffiliateReferralSchema = createInsertSchema(affiliateReferrals).omit({ id: true, status: true });
export type InsertAffiliateReferral = z.infer<typeof insertAffiliateReferralSchema>;
export type AffiliateReferral = typeof affiliateReferrals.$inferSelect;

// Categories
export const categories = [
  { id: "glp1", name: "GLP-1 Agonists", description: "Metabolic regulation peptides" },
  { id: "healing", name: "Healing & Repair", description: "Tissue regeneration peptides" },
  { id: "growth", name: "Growth Factors", description: "Growth hormone peptides" },
  { id: "cosmetic", name: "Cosmetic Peptides", description: "Skin & beauty peptides" },
  { id: "nootropics", name: "Nootropics", description: "Cognitive enhancement peptides" },
] as const;

export type Category = typeof categories[number];

// Supported languages
export const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
] as const;

export type Language = typeof languages[number];

// EU Countries for shipping
export const euCountries = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
  "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
  "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
  "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden",
  "Norway", "Switzerland", "United Kingdom"
] as const;

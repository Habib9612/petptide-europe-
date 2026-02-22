import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Products API
  app.get("/api/products", async (req, res) => {
    try {
      const { category } = req.query;
      let products;
      
      if (category && typeof category === "string") {
        products = await storage.getProductsByCategory(category);
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Cart API
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = req.headers["x-session-id"] as string || "default";
      const cartItems = await storage.getCartItems(sessionId);
      
      // Populate with product data
      const populatedItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProductById(item.productId);
          return { ...item, product };
        })
      );
      
      res.json(populatedItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const sessionId = req.headers["x-session-id"] as string || "default";
      const { productId, quantity = 1 } = req.body;
      
      if (!productId) {
        return res.status(400).json({ error: "Product ID is required" });
      }
      
      const product = await storage.getProductById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      const cartItem = await storage.addCartItem(sessionId, productId, quantity);
      res.json({ ...cartItem, product });
    } catch (error) {
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      
      if (typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json({ error: "Valid quantity is required" });
      }
      
      if (quantity === 0) {
        await storage.removeCartItem(req.params.id);
        return res.json({ deleted: true });
      }
      
      const cartItem = await storage.updateCartItem(req.params.id, quantity);
      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      await storage.removeCartItem(req.params.id);
      res.json({ deleted: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      const sessionId = req.headers["x-session-id"] as string || "default";
      await storage.clearCart(sessionId);
      res.json({ cleared: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  // Orders API
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = req.body;
      
      if (!orderData.email || !orderData.firstName || !orderData.lastName ||
          !orderData.address || !orderData.city || !orderData.country ||
          !orderData.postalCode || !orderData.paymentMethod) {
        return res.status(400).json({ error: "All fields are required" });
      }
      
      const order = await storage.createOrder(orderData);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  // Newsletter API
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ error: "Valid email is required" });
      }
      const subscriber = await storage.subscribeNewsletter(email);
      res.json({ discountCode: subscriber.discountCode, email: subscriber.email });
    } catch (error) {
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  app.post("/api/newsletter/validate", async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) return res.status(400).json({ error: "Discount code required" });
      const subscriber = await storage.validateDiscountCode(code);
      if (!subscriber) {
        return res.status(404).json({ error: "Invalid or already used discount code" });
      }
      res.json({ valid: true, discount: 10 });
    } catch (error) {
      res.status(500).json({ error: "Failed to validate code" });
    }
  });

  app.post("/api/newsletter/use-code", async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) return res.status(400).json({ error: "Code required" });
      await storage.markDiscountUsed(code);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to mark code as used" });
    }
  });

  // User Blog Posts API
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getUserBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const post = await storage.getUserBlogPostById(req.params.id);
      if (!post) return res.status(404).json({ error: "Post not found" });
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.post("/api/blog-posts", async (req, res) => {
    try {
      const { title, excerpt, content, author, category } = req.body;
      if (!title || !content || !author || !category) {
        return res.status(400).json({ error: "Title, content, author, and category are required" });
      }
      const post = await storage.createUserBlogPost({
        title,
        excerpt: excerpt || title,
        content,
        author,
        category,
        createdAt: new Date().toISOString(),
      });
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to create blog post" });
    }
  });

  app.get("/api/stripe/publishable-key", async (req, res) => {
    try {
      const { getStripePublishableKey } = await import("./stripeClient");
      const key = await getStripePublishableKey();
      res.json({ publishableKey: key });
    } catch (error) {
      res.status(500).json({ error: "Stripe not configured" });
    }
  });

  app.post("/api/stripe/create-checkout", async (req, res) => {
    try {
      const { getUncachableStripeClient } = await import("./stripeClient");
      const stripe = await getUncachableStripeClient();
      const { items, email, shipping, subtotal, discount, total, discountCode, customerInfo } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Cart items required" });
      }

      const lineItems = items.map((item: any) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      if (shipping > 0) {
        lineItems.push({
          price_data: {
            currency: 'eur',
            product_data: { name: 'Shipping' },
            unit_amount: Math.round(shipping * 100),
          },
          quantity: 1,
        });
      }

      const sessionParams: any = {
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        customer_email: email,
        success_url: `${req.protocol}://${req.get('host')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.protocol}://${req.get('host')}/checkout`,
        metadata: {
          subtotal: String(subtotal),
          shipping: String(shipping),
          discount: String(discount),
          total: String(total),
          discountCode: discountCode || '',
          items: JSON.stringify(items.map((i: any) => ({ productId: i.productId, quantity: i.quantity, price: i.price }))),
          customerFirstName: customerInfo?.firstName || '',
          customerLastName: customerInfo?.lastName || '',
          customerAddress: customerInfo?.address || '',
          customerCity: customerInfo?.city || '',
          customerCountry: customerInfo?.country || '',
          customerPostalCode: customerInfo?.postalCode || '',
        },
      };

      if (discount > 0) {
        const coupon = await stripe.coupons.create({
          amount_off: Math.round(discount * 100),
          currency: 'eur',
          duration: 'once',
          name: 'Order Discount',
        });
        sessionParams.discounts = [{ coupon: coupon.id }];
      }

      const session = await stripe.checkout.sessions.create(sessionParams);
      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe checkout error:", error.message);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  app.get("/api/stripe/session/:sessionId", async (req, res) => {
    try {
      const { getUncachableStripeClient } = await import("./stripeClient");
      const stripe = await getUncachableStripeClient();
      const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

      if (session.payment_status === "paid" && session.metadata) {
        const existingOrder = await storage.getOrderById(session.id);
        if (!existingOrder) {
          try {
            const orderData = {
              email: session.customer_email || "",
              firstName: session.metadata.customerFirstName || "",
              lastName: session.metadata.customerLastName || "",
              address: session.metadata.customerAddress || "",
              city: session.metadata.customerCity || "",
              country: session.metadata.customerCountry || "",
              postalCode: session.metadata.customerPostalCode || "",
              paymentMethod: "card",
              subtotal: parseFloat(session.metadata.subtotal || "0"),
              shipping: parseFloat(session.metadata.shipping || "0"),
              discount: parseFloat(session.metadata.discount || "0"),
              total: parseFloat(session.metadata.total || "0"),
              items: session.metadata.items || "[]",
            };
            await storage.createOrderWithId(session.id, { ...orderData, status: "paid" } as any);

            if (session.metadata.discountCode) {
              try { await storage.markDiscountUsed(session.metadata.discountCode); } catch {}
            }
          } catch {}
        }
      }

      res.json({
        id: session.id,
        payment_status: session.payment_status,
        customer_email: session.customer_email,
        amount_total: session.amount_total,
        currency: session.currency,
        metadata: session.metadata,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve session" });
    }
  });

  app.post("/api/affiliates/signup", async (req, res) => {
    try {
      const { name, email, website, promotionMethod } = req.body;
      if (!name || !email || !promotionMethod) {
        return res.status(400).json({ error: "Name, email, and promotion method are required" });
      }
      if (!email.includes("@")) {
        return res.status(400).json({ error: "Valid email is required" });
      }
      const affiliate = await storage.createAffiliate({
        name,
        email,
        website: website || null,
        promotionMethod,
        commissionRate: 10,
        createdAt: new Date().toISOString(),
      });
      res.json({ referralCode: affiliate.referralCode, email: affiliate.email, name: affiliate.name });
    } catch (error: any) {
      if (error.message === "Email already registered") {
        return res.status(409).json({ error: "This email is already registered as an affiliate" });
      }
      res.status(500).json({ error: "Failed to create affiliate account" });
    }
  });

  app.get("/api/affiliates/dashboard", async (req, res) => {
    try {
      const email = req.query.email as string;
      const code = req.query.code as string;
      if (!email || !code) {
        return res.status(400).json({ error: "Email and referral code are required" });
      }
      const dashboard = await storage.getAffiliateDashboard(email, code);
      if (!dashboard) {
        return res.status(404).json({ error: "Invalid email or referral code" });
      }
      res.json(dashboard);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard" });
    }
  });

  app.post("/api/affiliates/validate-code", async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) return res.status(400).json({ error: "Referral code required" });
      const affiliate = await storage.getAffiliateByCode(code);
      if (!affiliate || affiliate.status !== "active") {
        return res.status(404).json({ error: "Invalid referral code" });
      }
      res.json({ valid: true, discount: 5, affiliateId: affiliate.id });
    } catch (error) {
      res.status(500).json({ error: "Failed to validate code" });
    }
  });

  app.post("/api/affiliates/track-click", async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) return res.status(400).json({ error: "Referral code required" });
      await storage.incrementAffiliateClicks(code);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to track click" });
    }
  });

  return httpServer;
}

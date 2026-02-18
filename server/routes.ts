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

  return httpServer;
}

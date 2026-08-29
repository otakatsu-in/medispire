import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

import fs from "fs";

// Simple Vite plugin to mock the Cloudflare function locally
const mockApiPlugin = () => ({
  name: 'mock-api',
  configureServer(server) {
    // Manually parse .dev.vars for local testing
    let localEnv: Record<string, string> = {};
    try {
      const envContent = fs.readFileSync(path.resolve(import.meta.dirname, ".dev.vars"), "utf-8");
      envContent.split("\n").forEach(line => {
        const [key, ...val] = line.split("=");
        if (key && val.length > 0) {
          localEnv[key.trim()] = val.join("=").replace(/^"|"$/g, "").trim();
        }
      });
    } catch (e) {
      console.warn("Could not load .dev.vars - API mocking may fail");
    }

    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/create-order' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const parsedBody = JSON.parse(body);
            const { product, customer_name, customer_email, customer_phone } = parsedBody;
            
            let amount = 0;
            if (product === "consultation") amount = 8999;
            else if (product === "course") amount = 14999;
            else if (product === "course_9999") amount = 9999;
            else throw new Error("Invalid product");

            const customerId = `cust_${customer_phone?.replace(/\D/g, '') || Date.now()}`.substring(0, 50);

            const isProd = localEnv.CASHFREE_ENVIRONMENT === "PRODUCTION";
            const baseUrl = isProd ? "https://api.cashfree.com/pg/orders" : "https://sandbox.cashfree.com/pg/orders";

            const cfRes = await fetch(baseUrl, {
              method: "POST",
              headers: {
                "x-client-id": localEnv.CASHFREE_APP_ID || process.env.CASHFREE_APP_ID || "",
                "x-client-secret": localEnv.CASHFREE_SECRET_KEY || process.env.CASHFREE_SECRET_KEY || "",
                "x-api-version": "2023-08-01",
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                order_id: `order_${Date.now()}`,
                order_amount: amount,
                order_currency: "INR",
                customer_details: {
                  customer_id: customerId,
                  customer_phone: customer_phone || "9999999999",
                  customer_email: customer_email || "test@example.com",
                  customer_name: customer_name || "Test User"
                },
                order_meta: {
                  return_url: isProd 
                    ? "https://localhost:5173/?payment_status={order_id}" 
                    : "http://localhost:5173/?payment_status={order_id}"
                }
              })
            });
            const data = await cfRes.json();
            if (!cfRes.ok) throw new Error(data.message || "Cashfree API error");
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          } catch (e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
        return;
      }
      next();
    });
  }
});

const port = Number(process.env.PORT || 5173);
const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    mockApiPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});


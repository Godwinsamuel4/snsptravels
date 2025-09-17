var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default;
var init_vite_config = __esm({
  async "vite.config.ts"() {
    "use strict";
    vite_config_default = defineConfig({
      plugins: [
        react(),
        runtimeErrorOverlay(),
        ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
          await import("@replit/vite-plugin-cartographer").then(
            (m) => m.cartographer()
          )
        ] : []
      ],
      resolve: {
        alias: {
          "@": path.resolve(import.meta.dirname, "client", "src"),
          "@shared": path.resolve(import.meta.dirname, "shared"),
          "@assets": path.resolve(import.meta.dirname, "attached_assets")
        }
      },
      root: path.resolve(import.meta.dirname, "client"),
      build: {
        outDir: path.resolve(import.meta.dirname, "dist/public"),
        emptyOutDir: true
      },
      server: {
        fs: {
          strict: true,
          deny: ["**/.*"]
        }
      }
    });
  }
});

// server/vite_middleware.ts
var vite_middleware_exports = {};
__export(vite_middleware_exports, {
  log: () => log,
  setupVite: () => setupVite
});
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { nanoid } from "nanoid";
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
var viteLogger;
var init_vite_middleware = __esm({
  async "server/vite_middleware.ts"() {
    "use strict";
    await init_vite_config();
    viteLogger = createLogger();
  }
});

// server/index.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { fileURLToPath } from "url";

// server/routes.ts
import { createServer } from "http";
import nodemailer from "nodemailer";
async function registerRoutes(app2) {
  app2.get("/health", (req, res) => {
    res.status(200).json({
      status: "healthy",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      uptime: process.uptime()
    });
  });
  app2.post("/api/flight-booking", async (req, res) => {
    try {
      const bookingData = req.body;
      const message = formatBookingMessage(bookingData);
      const whatsappUrl = `https://wa.me/2347032615370?text=${encodeURIComponent(message)}`;
      await sendConfirmationEmail(bookingData);
      console.log("Booking received:", bookingData);
      console.log("WhatsApp message would be sent:", message);
      console.log("WhatsApp URL:", whatsappUrl);
      res.json({
        success: true,
        message: "Booking request received successfully",
        whatsappUrl
      });
    } catch (error) {
      console.error("Error processing booking:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process booking request"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}
function formatBookingMessage(data) {
  const fromCountry = data.from ? `(${data.from.toUpperCase()})` : "";
  const toCountry = data.to ? `(${data.to.toUpperCase()})` : "";
  return `\u{1F6EB} NEW FLIGHT BOOKING REQUEST

\u{1F464} Name: ${data.fullName}
\u{1F4E7} Email: ${data.email}
\u{1F4F1} Phone: ${data.phone}

\u2708\uFE0F FLIGHT DETAILS:
\u{1F4CD} From: ${fromCountry}
\u{1F4CD} To: ${toCountry}
\u{1F4C5} Departure: ${data.departureDate}
\u{1F4C5} Return: ${data.returnDate || "One way"}
\u{1F465} Passengers: ${data.passengers}
\u{1F3AB} Class: ${data.class}

\u{1F4AC} Special Requests: ${data.specialRequests || "None"}

Please contact the customer within 24 hours.`;
}
async function sendConfirmationEmail(bookingData) {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransporter({
    host: "smtp.ethereal.email",
    // Use your actual SMTP server in production
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
  const mailOptions = {
    from: '"SN-SP Travel" <noreply@snsp.com>',
    to: bookingData.email,
    subject: "Flight Booking Request Confirmation - SN-SP Travel",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Thank you for your flight booking request!</h2>
        
        <p>Dear ${bookingData.fullName},</p>
        
        <p>We have successfully received your flight booking request. Our team will review your requirements and contact you within 24 hours with personalized flight options.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #374151;">Your Booking Details:</h3>
          <p><strong>From:</strong> ${bookingData.from ? bookingData.from.toUpperCase() : "Not specified"}</p>
          <p><strong>To:</strong> ${bookingData.to ? bookingData.to.toUpperCase() : "Not specified"}</p>
          <p><strong>Departure Date:</strong> ${bookingData.departureDate}</p>
          <p><strong>Return Date:</strong> ${bookingData.returnDate || "One way"}</p>
          <p><strong>Passengers:</strong> ${bookingData.passengers}</p>
          <p><strong>Class:</strong> ${bookingData.class}</p>
          ${bookingData.specialRequests ? `<p><strong>Special Requests:</strong> ${bookingData.specialRequests}</p>` : ""}
        </div>
        
        <p>If you have any immediate questions, please don't hesitate to contact us:</p>
        <ul>
          <li>WhatsApp: +234 703 261 5370</li>
          <li>Email: info@snsp.com</li>
        </ul>
        
        <p>Thank you for choosing SN-SP Travel!</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="color: #6b7280; font-size: 14px;">
          This is an automated confirmation email. Please do not reply to this email.
        </p>
      </div>
    `
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}

// server/index.ts
await init_vite_middleware();
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
function serveStatic(app2) {
  const distPath = path3.resolve(path3.dirname(fileURLToPath(import.meta.url)), "..", "dist", "public");
  const attachedAssetsPath = path3.resolve(path3.dirname(fileURLToPath(import.meta.url)), "..", "attached_assets");
  app2.use("/attached_assets", express.static(attachedAssetsPath));
  if (fs2.existsSync(distPath)) {
    app2.use(express.static(distPath));
    app2.get("*", (req, res) => {
      if (!req.path.startsWith("/api")) {
        res.sendFile(path3.join(distPath, "index.html"));
      }
    });
  } else {
    log("Build directory not found. Please run 'npm run build' first.");
  }
}
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  const currentDir = path3.dirname(fileURLToPath(import.meta.url));
  app.use("/attached_assets", express.static(path3.join(currentDir, "../attached_assets")));
  if (app.get("env") === "development") {
    const { setupVite: setupVite2 } = await init_vite_middleware().then(() => vite_middleware_exports);
    await setupVite2(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();

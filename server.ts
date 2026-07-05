import "dotenv/config";
import express from "express";
import path from "path";

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const PORT = isProduction ? 3010 : 3011;

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Futuristic Finance Hub API is active" });
});

app.post("/api/telegram/webhook", (req, res) => {
  console.log("Telegram Webhook received:", req.body);
  res.sendStatus(200);
});

if (isProduction) {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  const label = isProduction ? "Server" : "API";
  console.log(`${label} running on http://localhost:${PORT}`);
});

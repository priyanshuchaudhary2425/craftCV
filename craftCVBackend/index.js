import express from "express";
import googleGeminiApi from "./gemini.js";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import { db, creatTables, incrementUsageCount, getUsageCOunt } from "./database.js";

const app = express();
const PORT = 3000;

try {
  await creatTables();
} catch (err) {
  console.warn("⚠️ Skipping DB table creation:", err.message);
}

app.use(cors());
app.use(express.json());

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Non-blocking optimize route
app.post("/api/optimize", upload.single("resume"), async (req, res) => {
  let filePath;
  try {
    filePath = req.file?.path;
    const jobDescription = req.body.jobDescription;

    if (!filePath) {
      return res.status(400).json({ error: "No resume uploaded" });
    }

    // Call Gemini first (don’t wait for DB here)
    const result = await googleGeminiApi(jobDescription, filePath);

    if (result.startsWith("❌ Error:")) {
      return res.status(400).json({ error: result });
    }

    const cleanJson = result.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanJson);

    // Send response back quickly (usageCount = null until DB wakes)
    res.json({ ...parsed, usageCount: null });

    // ✅ Update DB in background (non-blocking)
    (async () => {
      try {
        await incrementUsageCount();
        const usageCount = await getUsageCOunt();
        console.log("Updated usage count:", usageCount);
      } catch (dbErr) {
        console.warn("⚠️ DB update skipped:", dbErr.message);
      }
    })();
  } catch (err) {
    console.error("API Error:", err.message);
    res.status(500).json({ error: "Failed to process resume" });
  } finally {
    if (filePath) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("❌ Error removing file:", err.message);
        else console.log("✅ File removed successfully");
      });
    }
  }
});

// ✅ Add ping route (to warm up Render + Neon)
app.get("/api/ping", (req, res) => {
  res.json({ status: "ok" });
});


app.post("/api/feedback", async (req, res) => {
  const { text } = req.body;
  const trimmedText = text?.trim();

  if (!trimmedText) {
    return res.status(400).json({ error: "Feedback text is required" });
  }

  console.log("📩 New Feedback:", trimmedText);

  try {
    await db.query(`INSERT into feedback (feedbackText) VALUES ($1)`, [
      trimmedText,
    ]);
    res.status(201).json({ message: "Thanks for suggestion 💗" });
  } catch (err) {
    console.warn("⚠️ Feedback not saved (DB unavailable):", err.message);
    res
      .status(201) // still return success so UI doesn’t break
      .json({ message: "Thanks for suggestion 💗 (not saved due to DB issue)" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

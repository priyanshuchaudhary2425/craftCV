import express from "express";
import googleGeminiApi from "./gemini.js";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import { db, creatTables, incrementUsageCount, getUsageCOunt } from "./database.js";

const app = express();
const PORT = 3000;

// Try to create tables, but don’t crash if DB is unavailable
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

// Set up disk storage (to get file path)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // unique filename
  },
});
const upload = multer({ storage });

// Routing
app.post("/api/optimize", upload.single("resume"), async (req, res) => {
  let filePath;
  try {
    filePath = req.file?.path;
    const jobDescription = req.body.jobDescription;

    if (!filePath) {
      return res.status(400).json({ error: "No resume Uploaded" });
    }

    // Call Gemini API
    const result = await googleGeminiApi(jobDescription, filePath);

    if (result.startsWith("❌ Error:")) {
      return res.status(400).send(result);
    } else {
      const cleanJson = result.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanJson);

      // Try DB usage count, skip if DB fails
      let usageCount = null;
      try {
        await incrementUsageCount();
        usageCount = await getUsageCOunt();
        console.log("Used by: ", usageCount);
      } catch (dbErr) {
        console.warn("⚠️ Skipping DB usage count:", dbErr.message);
      }

      res.json({ ...parsed, usageCount });
    }
  } catch (err) {
    console.error("Api Error:", err.message);
    res.status(500).json({ error: "Failed to proceed Resume!!!" });
  } finally {
    if (filePath) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("❌ Error removing File", err.message);
        } else {
          console.log("✅ File removed succesfully!!!");
        }
      });
    }
  }
});


// ✅ Simple health check endpoint
app.get("/api/ping", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
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

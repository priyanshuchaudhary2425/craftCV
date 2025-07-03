import express from "express";
import googleGeminiApi from "./gemini.js";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import { db, creatTables, incrementUsageCount, getUsageCOunt } from "./database.js";

const app = express();
const PORT = 3000;

await creatTables();

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
    return res.status(400).json({error: "No resume Uploaded"});
  }

  // Calling Gemini API
  const result = await googleGeminiApi(jobDescription, filePath);

  if (result.startsWith("❌ Error:")) {
  // Show the plain message to the user
  return res.status(400).send(result); 
} else {
  const cleanJson = result.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleanJson);

  await incrementUsageCount();
  const usageCount = await getUsageCOunt();
  console.log("Used by: ",usageCount);
  
  res.json({...parsed, usageCount});
}
} catch (err) {
  console.error("Api Error:", err.message);
  res.status(500).json({ error: "Failed to proceed Resume!!!"});
} finally {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("❌Error removing File", err.message);
      return;
    } else {
      console.log("✅File removed succesfully!!!");
    }
  })
}
});


app.post("/api/feedback", async (req, res) => {
  const { text } = req.body;
  const trimmedText = text?.trim();

  if(!trimmedText) {
    return res.status(400).json({ error: "Feedback text is required"});
  }

    console.log("✅ Incoming /api/feedback");
    console.log("req.body:", req.body);
    console.log("trimmedText:", trimmedText);


  console.log("📩 New Feedback:", trimmedText);

  try {
    await db.query(`INSERT into feedback (feedbackText) VALUES ($1)`, [text.trim()]);
    res.status(201).json({ message: "Thanks for suggetion 💗" });
  } catch (err) {
    console.error("❌ Error saving feedback:", err.message);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
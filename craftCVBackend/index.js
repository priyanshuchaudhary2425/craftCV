import express from "express";
import googleGeminiApi from "./gemini.js";
import multer from "multer";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3000;

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

// COunting Usage
let usageCount = 0;

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

  usageCount += 1;
  console.log(usageCount);
  
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


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
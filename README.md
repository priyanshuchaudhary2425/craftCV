## 🚀 Try It Live

👉 [CraftCV is live!](https://craft-cv.vercel.app/)

# 🚀 CraftCV — AI Resume Analyzer (V1)

Upload your resume, paste your job description, and get AI-powered feedback instantly.


**CraftCV** is a lightweight AI tool that helps job seekers get instant, actionable feedback on their resume, match it to a job description, and generate a personalized cover letter — all without needing to sign up or store any data.

---

## ✨ What it does

✅ Upload your PDF resume  
✅ Paste or write a job description (JD)  
✅ Click **“Analyze Resume”**  
✅ Get:
  - 📌 Clear feedback on your resume’s strengths & weaknesses
  - 📌 An AI-generated cover letter draft
  - 📌 A match percentage (0–100%) indicating how well your resume fits the JD

---

## ⚙️ Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **AI:** Gemini API (`file_data` support for PDF parsing)
- **File Upload:** `multer` for handling resume files

---

## 🔐 How we handle files (V1)

- We **do not parse the PDF** ourselves — your resume goes directly to Gemini, which extracts the text securely.
- Uploaded PDFs are saved **temporarily** in a secure `uploads/` folder.
- Files are deleted immediately after the result is returned.
- No resumes or job descriptions are stored in a database — your data stays private.

---

## 🚫 No user accounts (V1)

- No signups.
- No passwords.
- No stored personal info.
- Just upload → analyze → get feedback.

---

## 🛠️ Clone the Project

```bash
# Clone the repo
git clone https://github.com/priyanshuchaudhary2425/craftCV.git
cd craftCV


import { useState } from "react";
import ResultDisplay from "../component/result.jsx";
import Feedback from "../component/feedback.jsx";
import styles from "./home.module.css";
import { MdFileUpload } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { AiFillExperiment } from "react-icons/ai";

function Home({ result, setResult }) {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(""); // ✅ show status visibly

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
        if (selected) {
            setStatus(`Selected: ${selected.name} (${selected.type}, ${selected.size} bytes)`);
        } else {
            setStatus("No file selected.");
        }
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setStatus("❌ Please upload a Resume!");
            return;
        }

        const formData = new FormData();
        formData.append("resume", file);
        formData.append("jobDescription", text);

        setLoading(true);
        setStatus("📤 Sending request...");

        try {
            const response = await fetch("https://craftcv-raa7.onrender.com/api/optimize", {
                method: "POST",
                body: formData,
            });

            setStatus(`✅ Got response: ${response.status}`);

            if (!response.ok) {
                const errorText = await response.text();
                setStatus(`❌ Error: ${errorText}`);
                return;
            }

            const data = await response.json();
            setResult(data);
            setStatus("🎉 Success!");
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            setStatus(`⚠️ Failed: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.banner}>
                <h1>"Upload. Review. Stand Out."</h1>
                <p>“Not sure if your resume is good enough? We show you exactly what works, what doesn’t, and help you fix it — fast.”</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.resumeUploadContainer}>
                    <label>
                        <MdFileUpload className="icons" />
                        Upload Your Resume
                    </label>
                    <input
                        className={styles.resumeInput}
                        type="file"
                        accept="application/pdf,.pdf"
                        required
                        onChange={handleFileChange}
                    />
                </div>

                <div className={styles.descriptionContainer}>
                    <label>
                        <MdEditNote className="icons" />
                        Job Description
                    </label>
                    <textarea
                        value={text}
                        onChange={handleTextChange}
                        rows="8"
                        cols="40"
                        placeholder="Please paste job description here...."
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    <AiFillExperiment className="buttonIcons" />
                    {loading ? "Analyzing..." : "Analyze Resume"}
                </button>
            </form>

            {/* ✅ Show status visibly */}
            {status && <p style={{ marginTop: "10px", color: "red" }}>{status}</p>}

            <ResultDisplay result={result} />

            {result && (
                <h3 className={styles.userGreeting}>
                    You’re our #{result.usageCount} user — Thanks for believing in us!!!
                </h3>
            )}

            <Feedback />
        </div>
    );
}

export default Home;

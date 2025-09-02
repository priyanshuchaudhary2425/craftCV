import { useState } from "react";
import ResultDisplay from "../component/result.jsx";
import Feedback from "../component/feedback.jsx";
import styles from "./home.module.css";
import { MdFileUpload } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { AiFillExperiment } from "react-icons/ai";




function Home({ result, setResult}) {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [result, setResult] = useState(null);


    const handleFileChange = (e) => {
        console.log("Selected file: ", e.target.files[0]);
        setFile(e.target.files[0]);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please upload a Resume!!!");

        const formData = new FormData();
        formData.append("resume", file);
        formData.append("jobDescription", text);

        setLoading(true);

        try {
            const response = await fetch("https://craftcv-raa7.onrender.com/api/optimize", {
                method: "POST",
                body: formData,
            });

             if (!response.ok) {
            const errorText = await response.text();
            alert(errorText);
            return;
        }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error("Error Uploading:", err);
            const message = err instanceof Error ? err.message: String(err);
            alert(`Failed beacuase ${message}`);
        } finally {
            setLoading(false);
        }

    }

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

                    Upload Your Resume</label>
                <input 
                className={styles.resumeInput}
                type="file"
                accept=".pdf,application/pdf,application/octet-stream"
                required 
                onChange={handleFileChange}
                />
                </div>

                <div className={styles.descriptionContainer}>
                    <label>
                        <MdEditNote className="icons"/>
                        Job Description</label>
                    <textarea 
                    value={text}
                    onChange={handleTextChange}
                    rows="8"
                    cols="40"
                    placeholder="Please paste job description here...."
                    required
                    />
                </div>

                <button 
                type="submit" 
                disabled={loading}>
                    <AiFillExperiment className="buttonIcons" />
                    {loading ? "Analyzing..." : "Analyze Resume"}
                </button>
            </form>

            <ResultDisplay result={result} />

            {result && 
                <h3 className={styles.userGreeting}>You’re our #{result.usageCount} user — Thanks for believing in us!!!</h3>
            }

            <Feedback />

        </div>
    );
}

export default Home;
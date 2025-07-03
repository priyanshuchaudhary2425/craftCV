import { useState } from "react"
import styles from "./feedback.module.css";
import { VscFeedback } from "react-icons/vsc";


function Feedback() {
   const [feedbackText, setfeedbackText] = useState("");
   const [loading, setLoading] = useState(false);

   const handleText = (e) => {
    setfeedbackText(e.target.value);
   }

   const handleSubmit = async () => {
    setLoading(true);
    try {
        await fetch("https://craftcv-raa7.onrender.com/api/feedback", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ text: feedbackText})
        });
        alert("Thanks for your Suggestion 💗");
        setfeedbackText("");
    } catch (err) {
        console.error("❌ Error", err);
    } finally {
        setLoading(false);
    }
   };

    return (
        <div className={styles.feedbackContainer}>
            <label>
                <VscFeedback className="icons" />
                Feedback</label>
            <textarea
            value={feedbackText}
            onChange={handleText}
            rows="8"
            cols="40"
            placeholder="Write your thoughts… What did you like? What can we do better?"
            />

            <button 
            disabled={loading}
            style={{ marginTop: "1rem" }} type="submit">Submit</button>
        </div>
    );
}

export default Feedback;
import { useState } from "react"
import styles from "./feedback.module.css";
import { VscFeedback } from "react-icons/vsc";


function Feedback() {
   const [feedbackText, setfeedbackText] = useState("");
   const [loading, setLoading] = useState(false);

   const handleText = (e) => {
    setfeedbackText(e.target.value);
   }

   const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedFeedback = feedbackText.trim();

    if (trimmedFeedback.length === 0) {
        alert("Feedback can't be empty! ✍️");
        return;
    }

    setLoading(true);
    try {
        const result = await fetch("https://craftcv-raa7.onrender.com/api/feedback", {
            method: "POST",
            headers: {
                        "Content-Type": "application/json" 
                    },
            body: JSON.stringify({ text: trimmedFeedback})
        });

        const data = await result.json();

        if (result.ok) {
            alert(`${data.message}`);
            setfeedbackText("");
        } else {
            alert(`${data.message}`);
        }

    } catch (err) {
        console.error("❌ Error", err);
    } finally {
        setLoading(false);
    }
   };

    return (

        <form onSubmit={handleSubmit} className={styles.feedbackContainer}>

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
     </form>
    );
}

export default Feedback;
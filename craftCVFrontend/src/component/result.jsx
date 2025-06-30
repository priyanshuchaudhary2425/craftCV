import ReactMarkdown from "react-markdown";
import styles from "./result.module.css";
import { FaPercent } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";


function ResultDisplay({ result }) {
  return (
    <div className="resultContainer">

      <div className={styles.feedbackContainer}>
      <h3> 
        <FaPercent className="icons"/>
        Match Score</h3>
      <div className={styles.feedbackContent}>
        {result?.matchPercentage !== undefined && result?.matchPercentage !== null
          ? `${result.matchPercentage}`
          : <p>match percentage will help you understand how well your resume aligns with the job description.</p>
        }
      </div>
      </div>
      
      <div className={styles.feedbackContainer}>
      <h3>
        <MdFeedback className="icons"/>
        Feedback</h3>
      <div className={styles.feedbackContent}>
        {result?.feedback 
          ? <ReactMarkdown>{result.feedback}</ReactMarkdown>
          : <p>Your feedback will appear here once your resume is processed.</p>
        }
      </div>
      </div>

      <div className={styles.feedbackContainer}>
      <h3>
        <SlEnvolopeLetter className="icons"/>
        Cover Letter</h3>
      <div className={styles.feedbackContent}>
        {result?.coverLetter
          ? <ReactMarkdown>{result.coverLetter}</ReactMarkdown>
          : <p>A customized cover letter draft will be generated and shown here.</p>
        }
      </div>
      </div>

    </div>
  );
}

export default ResultDisplay;

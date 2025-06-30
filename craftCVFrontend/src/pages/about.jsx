import styles from "./about.module.css";

function About() {
    return (
        <div className={styles.mainContainer}>
            <section>
                <h2>Who We Are</h2>
                <p>
                    CraftCV is your practical, no-login-needed companion for making sure your resume doesn’t just exist — it stands out.
                    We’re a small, ambitious team that believes every professional deserves fair, honest feedback on their CV without paying a coach or guessing what recruiters want.
                </p>
                <p>
                    This idea was born after seeing so many talented people get rejected — not because they lacked skills, but because their resumes didn’t tell their story the right way.
                    A great resume can open doors, but an average one can close them, often without you ever knowing why.
                </p>
            </section>

            <section>
            <h2>What Problem Do We Solve?</h2>
            <p>Too often, job seekers:</p>
            <ul>
                <li>Apply blindly, not knowing if their resume matches the role</li>
                <li>Waste hours rewriting without clear guidance</li>
                <li>Get ghosted, and never know what went wrong</li>
            </ul>
            <p>
                CraftCV fixes this. With just a simple upload:
            </p>
            <ul>
                <li>You get <strong>instant, unbiased feedback</strong> on your resume’s strengths and gaps.</li>
                <li>See a <strong>clear match percentage</strong> — no more guesswork.</li>
                <li>Get a <strong>tailored cover letter</strong>, written in your voice, for your next application.</li>
            </ul>
            <p>No accounts. No complicated dashboards. Just honest insights, fast.</p>
            </section>

            <section>
            <h2>Our Vision</h2>
            <p>
                Today, CraftCV gives you <strong>feedback</strong>, a <strong>match score</strong>, and a <strong>personalized cover letter</strong> — in seconds.
            </p>
            <p>
                But we’re not stopping there. Over the coming versions, CraftCV will grow into a complete, human-focused career polishing tool that:
            </p>
            <ul>
                <li>Highlights weak sections automatically</li>
                <li>Suggests bullet-wise improvements</li>
                <li>Helps you rewrite sections to be ATS-friendly</li>
                <li>Exports multiple versions of your CV and cover letter for different roles</li>
                <li>Lets you chat with a “virtual recruiter” who explains exactly why you’re a good fit — or not</li>
                <li>All with zero login friction — because your data is yours</li>
            </ul>
            <p>
                We want CraftCV to feel like your personal, trusted resume coach — available anytime, free to start, and built to help you succeed.
            </p>
            </section>

            <section>
            <h2>Why We’re Building CraftCV</h2>
            <p>
                Because great people deserve better tools.
                Because it shouldn’t be so hard to know how your CV looks to a recruiter or an ATS.
                Because you shouldn’t have to pay hundreds for generic templates or spammy coaching calls.
            </p>
            <p>
                We believe:
            </p>
            <ul>
                <li><strong>Transparency beats guesswork.</strong></li>
                <li><strong>Privacy matters.</strong> That’s why we don’t force signups.</li>
                <li><strong>Feedback should be actionable</strong>, not just fluffy praise.</li>
            </ul>
            </section>

            <section>
            <h2>Our Promise</h2>
            <p>
                We’re just getting started — but we’ll always keep CraftCV:
            </p>
            <ul>
                <li>Simple to use</li>
                <li>Transparent and honest</li>
                <li>Focused on real improvement, not empty buzzwords</li>
            </ul>
            <p>
                If you have ideas, feedback, or just want to share your job hunt story, we’d love to hear it.
                Together, let’s make your next “Congratulations, you’re hired!” email one step closer.
            </p>
            </section>

            <section>
            <h2>Contact Us</h2>
            <p>
                Have questions or ideas? Reach out at <a href="mailto:priyanshuc2425@gmail.com">Email</a>.
            </p>
            </section>
        </div>
    );
}

export default About;
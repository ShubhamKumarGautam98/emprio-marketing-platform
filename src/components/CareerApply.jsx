import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { styles } from "../data/careerStyles";

export default function CareerApply() {

  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  /* Job list */
  const jobs = [
    { title: "Account Manager" },
    { title: "Senior Account Executive" },
    { title: "Senior Strategist" },
    { title: "Creative Lead" },
    { title: "Account Director" },
    { title: "Marketing Analyst" },
    { title: "UX Designer" },
    { title: "Data Scientist" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const file = formRef.current.resume.files[0];

    /* Optional file size limit */
    if (file && file.size > 5 * 1024 * 1024) {
      alert("Resume must be smaller than 5MB");
      return;
    }

    setLoading(true);
    setSent(false);

    emailjs
      .sendForm(
        "service_92zz08e",
        "template_jtkpqou",
        formRef.current,
        "fxl7XczeaeiA-8doV"
      )
      .then(() => {
        setSent(true);
        setLoading(false);
        formRef.current.reset();
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <section style={styles.applySection}>
      <h3 style={styles.applyHeading}>Apply for a Position</h3>

      <form ref={formRef} style={styles.form} onSubmit={handleSubmit}>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Full Name</label>
          <input
            style={styles.formInput}
            type="text"
            name="name"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Email</label>
          <input
            style={styles.formInput}
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Position Applying For</label>
          <select
            style={styles.formSelect}
            name="position"
            required
          >
            <option value="">Select a position</option>

            {jobs.map((job, index) => (
              <option key={index} value={job.title}>
                {job.title}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Resume (PDF)</label>
          <input
            style={styles.formFile}
            type="file"
            name="resume"
            accept=".pdf"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Cover Letter or Message</label>
          <textarea
            style={styles.formTextarea}
            name="message"
            rows="4"
            placeholder="Tell us why you're interested in this position..."
            required
          />
        </div>

        <button style={styles.formButton} type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>

        {sent && (
          <p style={{ marginTop: 15, color: "#4CAF50" }}>
            Application submitted successfully.
          </p>
        )}

      </form>
    </section>
  );
}
import React from "react";
import { Link } from "react-router-dom";

export default function CaseStudyNav({ prev, next }) {
  return (
    <section style={styles.nav}>
      {prev && (
        <Link to={prev.link} style={styles.link}>
          ← {prev.label}
        </Link>
      )}

      {next && (
        <Link to={next.link} style={styles.link}>
          {next.label} →
        </Link>
      )}
    </section>
  );
}

const styles = {
  nav: {
    minHeight: "40vh",
    background: "#000",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 8vw",
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "20px",
    letterSpacing: "1px",
    opacity: 0.85,
    transition: "opacity 0.3s ease",
  },
};
<CaseStudyNav
  prev={{ label: "Previous Case", link: "/case-study/prev" }}
  next={{ label: "Next Case", link: "/case-study/next" }}
/>

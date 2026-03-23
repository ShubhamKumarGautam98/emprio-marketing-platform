import React from "react";
import { useNavigate } from "react-router-dom";

export default function TransitionLinks() {
  const navigate = useNavigate();

  return (
    <section style={styles.section}>
      <div style={styles.row}>
        {/* COMPILE */}
        <span
          className="transition-word"
          style={styles.word}
          onClick={() => window.open("/compile", "_blank")}
        >
          COMPILE
        </span>

        <span style={styles.x}>X</span>

        {/* CONNECT */}
        <span
          className="transition-word"
          style={styles.word}
          onClick={() => navigate("/services")}
        >
          CONNECT
        </span>

        <span style={styles.x}>X</span>

        {/* CONSULT */}
        <span
          className="transition-word"
          style={styles.word}
          onClick={() => navigate("/contact")}
        >
          CONSULT
        </span>
      </div>
    </section>
  );
}

const styles = {
  section: {
    minHeight: "100vh",
    backgroundColor: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",          // ✅ allows wrapping
  gap: "32px",
  maxWidth: "1200px",        // ✅ prevents overflow
  padding: "0 24px",         // ✅ mobile breathing space
  textAlign: "center",
  fontSize: "clamp(28px, 6vw, 110px)", // ✅ responsive scaling
  fontWeight: 700,
  letterSpacing: "1px",
  color: "#fff",
},

  word: {
    cursor: "pointer",
  transition: "opacity 0.3s ease",
  },
  x: {
  fontWeight: 800,
  opacity: 0.6,
  fontSize: "0.9em",
},

};

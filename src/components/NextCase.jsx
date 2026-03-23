import React from "react";
import { useNavigate } from "react-router-dom";

export default function NextCase({ nextCase }) {
  const navigate = useNavigate();

  return (
    <section style={styles.wrapper} onClick={() => navigate(`/case/${nextCase.id}`)}>
      <div
        style={{
          ...styles.bg,
          backgroundImage: `url(${nextCase.images.hero})`,
        }}
      />

      <div style={styles.overlay} />

      <div style={styles.content}>
        <p style={styles.label}>NEXT CASE</p>
        <h1 style={styles.title}>{nextCase.title}</h1>
        <p style={styles.subtitle}>{nextCase.subtitle}</p>
      </div>
    </section>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    position: "relative",
    cursor: "pointer",
    scrollSnapAlign: "start",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  bg: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transform: "scale(1.1)",
    transition: "transform 1.2s ease",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
  },

  content: {
    position: "relative",
    color: "#fff",
    textAlign: "center",
    maxWidth: 700,
  },

  label: {
    letterSpacing: "4px",
    opacity: 0.7,
    marginBottom: 16,
  },

  title: {
    fontSize: "64px",
    marginBottom: 12,
  },

  subtitle: {
    opacity: 0.8,
  },
};

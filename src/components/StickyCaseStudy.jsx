import React from "react";

export default function StickyCaseStudy({ study }) {
  if (!study) return null; // 🛡️ safety guard

  return (
    <section style={styles.wrapper}>
      <div
        style={{
          ...styles.image,
          backgroundImage: `url(${study.image})`,
        }}
      />

      <div style={styles.overlay}>
        <h1 style={styles.title}>{study.title}</h1>
        <p style={styles.subtitle}>{study.subtitle}</p>
      </div>
    </section>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
  },

  image: {
    position: "fixed",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
  },

  overlay: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "12vw",
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.1) 100%)",
  },

  title: {
    fontSize: "72px",
    fontWeight: 800,
    marginBottom: "16px",
  },

  subtitle: {
    fontSize: "18px",
    maxWidth: "420px",
    opacity: 0.85,
  },
};

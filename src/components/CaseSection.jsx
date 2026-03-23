import React from "react";

export default function CaseSection({ image, children }) {
  return (
    <section style={{ ...styles.section, backgroundImage: `url(${image})` }}>
      <div style={styles.overlay} />
      <div style={styles.content}>{children}</div>
    </section>
  );
}

const styles = {
  section: {
    minHeight: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    scrollSnapAlign: "start",
    display: "flex",
    alignItems: "center",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0) 100%)",
  },

  content: {
    position: "relative",
    zIndex: 2,
    color: "#fff",
    paddingLeft: "12vw",
    maxWidth: "640px",
  },
};

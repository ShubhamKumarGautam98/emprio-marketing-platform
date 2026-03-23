import React from "react";

export default function ServicesHero() {
  return (
    <section style={styles.hero}>
      <h1 style={styles.heading}>
        <span style={styles.red}>OUR</span>
        <span style={styles.white}>SERVICES</span>
      </h1>

      <div style={styles.line} />
    </section>
  );
}

const styles = {
  hero: {
    /* ✅ Responsive top padding: scales from 24px (mobile) to 48px (desktop) */
    paddingTop: "clamp(24px, 5vw, 48px)",  // Reduced min for mobile compactness

    background: "#111",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",

    /* Add min-height for better centering on tall screens (e.g., iPad landscape) */
    minHeight: "clamp(200px, 30vh, 400px)",  // Prevents squishing on mobile
  },

  heading: {
    /* ✅ More aggressive clamp for font size: smaller on mobile/tablet */
    fontSize: "clamp(32px, 8vw, 96px)",  // Min 32px for mobile readability, max 96px for desktop
    fontWeight: 700,
    letterSpacing: "clamp(1px, 0.5vw, 2px)",  // Scales letter spacing
    margin: 0,  // Prevents browser default margin
    textAlign: "center",  // Ensures centering on narrow screens
  },

  red: {
    color: "#e10600",
    marginRight: "clamp(6px, 1vw, 12px)",  // Scales spacing between words
  },

  white: {
    color: "#ffffff",
  },

  line: {
    /* ✅ Responsive height and margin: shorter on mobile */
    width: "1px",
    height: "clamp(60px, 15vh, 120px)",  // Scales from 60px (mobile) to 120px (desktop)
    background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0))",
    marginTop: "clamp(16px, 3vw, 32px)",  // Scales top margin
  },
};
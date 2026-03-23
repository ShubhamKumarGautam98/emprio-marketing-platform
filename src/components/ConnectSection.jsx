import React from "react";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

export default function ConnectSection() {
  const [ref, visible] = useRevealOnScroll(0.35);
  const items = [
    "Social Media Marketing",
    "Performance Marketing",
    "Search Engine Optimization",
    "Creative Campaigns",
    "Video Production",
    "Motion Graphics Production",
    "Moment Marketing",
    "Brand Activations",
    "Online Reputation Management & PR",
    "Influencer Collaborations",
  ];

  return (
    <section style={styles.wrapper}>
      {/* Title */}
      <h1 style={styles.title}>
        CONNECT
      </h1>

      {/* Scope */}
      <p style={styles.scope}>SCOPE OF WORK</p>

      <div ref={ref} style={styles.list}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.item,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `all 0.6s ease ${index * 0.12}s`,
            }}
          >
            <span style={styles.bullet} />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  wrapper: {
    /* ✅ Responsive minHeight and padding: scales down on mobile */
    minHeight: "clamp(80vh, 100vh, 100vh)",  // Allows shorter height on very small screens
    background: "#ffffff",
    color: "#000",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "clamp(60px, 10vw, 120px) 20px clamp(80px, 15vw, 160px)",  // Scales top/bottom padding
  },

  title: {
    /* ✅ Responsive fontSize: smaller on mobile/tablet */
    fontSize: "clamp(60px, 10vw, 120px)",  // Min 60px (mobile), scales to 120px (desktop)
    fontWeight: 800,
    letterSpacing: "clamp(1px, 0.5vw, 2px)",  // Scales letter spacing
    marginBottom: "clamp(12px, 2vw, 24px)",  // Scales margin
    display: "flex",
    alignItems: "center",
    gap: "clamp(10px, 2vw, 20px)",  // Scales gap
  },

  infinity: {
    /* ✅ Responsive fontSize for any infinity symbol (if used) */
    fontSize: "clamp(60px, 10vw, 120px)",
    fontWeight: 800,
    lineHeight: 1,
  },

  scope: {
    fontSize: "clamp(12px, 2vw, 14px)",  // Scales from 12px (mobile) to 14px (desktop)
    letterSpacing: "clamp(2px, 0.5vw, 3px)",  // Scales letter spacing
    opacity: 0.7,
    marginBottom: "clamp(40px, 8vw, 80px)",  // Scales margin
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(12px, 2vw, 18px)",  // Scales gap between items
    alignItems: "center",
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(8px, 1.5vw, 16px)",  // Scales gap between bullet and text
    fontSize: "clamp(14px, 3vw, 18px)",  // Scales font size
    fontWeight: 400,
    opacity: 0.9,
    textAlign: "center",  // Ensures readability on narrow screens
  },

  bullet: {
    width: "clamp(4px, 1vw, 6px)",  // Scales bullet size
    height: "clamp(4px, 1vw, 6px)",
    borderRadius: "50%",
    background: "#000",
    flexShrink: 0,
  },
};
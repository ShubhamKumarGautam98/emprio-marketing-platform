import React from "react";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

export default function ServicesDetail() {
  const [ref, visible] = useRevealOnScroll(0.35);

  const items = [
    "Websites & Microsites",
    "Marketplace Development",
    "Web Apps",
    "Mobile Apps (Android & iOS)",
    "Artificial Intelligence Solutions",
    "Mixed Reality Solutions",
    "Web3",
  ];

  return (
    <section style={styles.wrapper}>
      {/* Title */}
      <h1 style={styles.title}>COMPILE</h1>

      {/* Scope */}
      <p style={styles.scope}>SCOPE OF WORK</p>

      {/* 👇 IMPORTANT: ref added here */}
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
    minHeight: "clamp(40vh, 50vh, 50vh)",  // Allows shorter height on very small screens (from original 50vh)
    background: "#111",
    color: "#fff",
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
    textAlign: "center",  // Ensures readability on narrow screens
  },

  bullet: {
    width: "clamp(4px, 1vw, 6px)",  // Scales bullet size
    height: "clamp(4px, 1vw, 6px)",
    borderRadius: "50%",
    background: "#fff",  // Kept white for contrast on dark background
    flexShrink: 0,
  },
};
import React, { useEffect, useRef, useState } from "react";

export default function CinematicServiceSection({ title, items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length); // Loop through items
    }, 2000); // Change every 2 seconds for smooth pacing

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <section style={styles.wrapper}>
      <h1 style={styles.title}>{title}</h1>
      <p style={styles.scope}>SCOPE OF WORK</p>

      <div style={styles.container}>
        {/* Progress Line */}
        <div style={styles.line}>
          <div
            style={{
              ...styles.lineFill,
              height: `${((activeIndex + 1) / items.length) * 100}%`,
            }}
          />
        </div>

        {/* Items */}
        <div style={styles.list}>
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;
            const isFuture = index > activeIndex;

            return (
              <div
                key={index}
                style={{
                  ...styles.item,
                  opacity: isActive ? 1 : 0.35,
                  filter: isFuture ? "blur(0px)" : "blur(0px)",
                  transform: isActive
                    ? "translateY(0)"
                    : isPast
                    ? "translateY(-10px)"
                    : "translateY(20px)",
                }}
              >
                <span
                  style={{
                    ...styles.bullet,
                    background: isActive ? "#fff" : "#444",
                  }}
                />
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#111",
    color: "#fff",
    padding: "140px 20px",
    scrollSnapAlign: "start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  title: {
    textAlign: "center",
    fontSize: "clamp(48px, 8vw, 120px)",
    fontWeight: 800,
    marginBottom: 24,
  },

  scope: {
    textAlign: "center",
    letterSpacing: "3px",
    opacity: 0.6,
    marginBottom: 120,
  },

  container: {
    display: "flex",
    justifyContent: "center",
    gap: 60,
    maxWidth: 900,
    margin: "0 auto",
  },

  line: {
    width: 2,
    background: "#333",
    position: "relative",
  },

  lineFill: {
    width: "100%",
    background: "#fff",
    position: "absolute",
    top: 0,
    left: 0,
    transition: "height 1.5s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth easing
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 44,
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    fontSize: "clamp(16px, 2vw, 20px)",
    transition:
      "transform 1.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1), filter 2s cubic-bezier(0.4, 0, 0.2, 1)", // Longer, smoother transitions
    willChange: "transform, opacity, filter",
  },

  bullet: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    transition: "background 1s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth
    flexShrink: 0,
  },
};
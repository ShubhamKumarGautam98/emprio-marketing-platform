import React, { useEffect, useRef, useState } from "react";
import Footer from "./Footer";

export default function CaseStudySection({
  title,
  subtitle,
  content,
  image,
  reverse = false,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        ...styles.section,
        flexDirection: reverse ? "row-reverse" : "row",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
      }}
    >
      {/* TEXT */}
      <div style={styles.textBlock}>
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
        {title && <h2 style={styles.title}>{title}</h2>}
        <p style={styles.content}>{content}</p>
      </div>

      {/* IMAGE */}
      <div
        style={{
          ...styles.image,
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(0,0,0,0.75),
              rgba(0,0,0,0.35)
            ),
            url(${image})
          `,
        }}
      />
      <footer></footer>
    </section>
  );
}

const styles = {
  section: {
    minHeight: "100vh",
    display: "flex",
    background: "#111",
    transition: "all 0.9s ease",
  },

  textBlock: {
    width: "45%",
    padding: "120px 8vw",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  subtitle: {
    letterSpacing: "3px",
    opacity: 0.6,
    fontSize: "13px",
    marginBottom: "16px",
  },

  title: {
    fontSize: "56px",
    fontWeight: 600,
    marginBottom: "32px",
    lineHeight: 1.1,
  },

  content: {
    fontSize: "18px",
    lineHeight: 1.8,
    maxWidth: "520px",
    opacity: 0.9,
  },

  image: {
    width: "55%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

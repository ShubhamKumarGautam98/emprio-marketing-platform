import React, { useEffect, useRef } from "react";

export default function CinematicSection({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        } else {
          el.style.opacity = "0";
          el.style.transform = "translateY(60px)";
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        scrollSnapAlign: "start",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 10vw",
        opacity: 0,
        transform: "translateY(60px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        {children}
      </div>
    </section>
  );
}

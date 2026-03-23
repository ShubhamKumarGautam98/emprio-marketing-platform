// src/components/ScrollSection.jsx
import React, { useEffect, useRef } from "react";

export default function ScrollSection({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const section = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.style.position = "sticky";
          section.style.top = "0";
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}

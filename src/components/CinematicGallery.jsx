import React, { useEffect, useRef, useState } from "react";

export default function CinematicGallery({ images = [] }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      const totalScroll = images.length * vh;
      const scrolled = vh - rect.top;

      const progress = Math.min(
        Math.max(scrolled / totalScroll, 0),
        0.999 // prevents overflow to non-existent index
      );

      const index = Math.floor(progress * images.length);
      setActiveIndex(index);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [images.length]);

  return (
    <section
      ref={containerRef}
      style={{
        height: `${images.length * 100}vh`,
        background: "#000",
      }}
    >
      <div style={styles.sticky}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            style={{
              ...styles.image,
              opacity: index === activeIndex ? 1 : 0,
              transform:
                index === activeIndex ? "scale(1)" : "scale(1.04)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

const styles = {
  sticky: {
    position: "sticky",
    top: 0,
    height: "100vh",
    width: "100%",
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  },
};

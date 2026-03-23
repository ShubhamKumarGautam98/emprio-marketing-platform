import React, { useEffect, useRef, useState } from "react";
import "./ClientsSection.css";

const clientLogos = [
  "thumbsup",
  "kingfisher",
  "charged",
  "nestle",
  "microsoft",
  "vlcc",
  "vijohn",
  "hero",
  "hongkong-tourism",
  "lays",
  "superyou",
  "baileys",
  "bajaj",
  "jimbeam",
  "auto1",
  "gmr",
  "rkmarble",
  "simba",
  "royalcrest",
  "sawaeed",
  "baraka",
  "hyatt",
  "pnb",
  "sunscoop",
  "waymo",
  "waisl",
  "stl",
  "miniso",
  "ap",
];


export default function ClientsSection() {
  const ref = useRef(null);

  const [active, setActive] = useState(false);
  const [autoIndex, setAutoIndex] = useState(-1);
  const [animationDone, setAnimationDone] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const lastScrollY = useRef(0);
  
  useEffect(() => {
  const handleScroll = () => {
    const currentY = window.scrollY;

    if (currentY > lastScrollY.current) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }

    lastScrollY.current = currentY;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  /* Intersection observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  /* Reset state when scrolled out of view so it plays again */
  useEffect(() => {
    if (!active) {
      setAnimationDone(false);
      setAutoIndex(-1);
    }
  }, [active]);

  /* AUTO POP SEQUENCE - strictly independent of hover */
 useEffect(() => {
  if (!active) return;
  if (animationDone) return;

  const lastIndex = clientLogos.length - 1;
  const isDown = scrollDirection === "down";

  const timer = setTimeout(() => {
    setAutoIndex((prev) => {

      // ⭐ SCROLL DOWN → FIRST → LAST
      if (isDown) {
        if (prev < lastIndex) return prev + 1;
        return prev;
      }

      // ⭐ SCROLL UP → START FROM LAST → GO BACKWARDS
      if (!isDown) {
        // IMPORTANT: start from last when animation begins
        if (prev === -1) return lastIndex;

        if (prev > 0) return prev - 1;

        return prev;
      }
    });
  }, 120);

  // ⭐ RESET AFTER SEQUENCE COMPLETES
  let resetTimer;
  if (
    (isDown && autoIndex >= lastIndex) ||
    (!isDown && autoIndex === 0)
  ) {
    resetTimer = setTimeout(() => {
      setAnimationDone(true);
      setAutoIndex(-1); // reset all to grayscale
    }, 1000);
  }

  return () => {
    clearTimeout(timer);
    clearTimeout(resetTimer);
  };
}, [active, autoIndex, animationDone, scrollDirection]);

  return (
    <section ref={ref} className="clients-wrapper">
      <h1 className={`clients-title ${active ? "active" : ""}`}>
        CLIENTS
      </h1>

      <div className={`clients-grid ${active ? "active" : ""}`}>
        {clientLogos.map((name, i) => {
          // Auto-color is active during intro sequence
          const lastIndex = clientLogos.length - 1;

const isAutoActive =
  !animationDone &&
  (
    scrollDirection === "down"
      ? i <= autoIndex           // first → last
      : i >= autoIndex           // last → first
  );
          
          return (
            <img
              key={name}
              src={`/images/clients/${name}.webp`}
              alt={`${name} logo`}
              data-logo={name}
              className={`client-logo
                ${isAutoActive ? "auto-active" : ""}
              `}
              loading="lazy"
            />
          );
        })}
      </div>
    </section>
  );
}
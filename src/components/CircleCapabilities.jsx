import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/emprio-hero1.webp";
import "./CircleCapabilities.css";

const ITEMS = [
  "Web Development",
  "App Development",
  "SEO & AEO",
  "Social Media Marketing",
  "Performance Marketing",
  "Influencers",
  "Creative Design",
  "Strategy",
  "Branding",
  "Public Relations",
  "Events",
  "Consulting",
  "Media Buying",
  "Guerrilla Marketing",
];

const LINK_MAP = {
  /*Strategy: "/case-study/nykaa",
  "Creative Design": "/case-study/nykaa",
  "Performance Marketing": "/case-study/nykaa",
  Branding: "/compile",*/
};

const COUNT = 14;

export default function CircleCapabilities() {
  const navigate = useNavigate();
  const raf = useRef(null);

  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [vw, setVw] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = vw < 768;
  const isTablet = vw >= 768 && vw < 1024;

  const effectiveCount = isMobile ? Math.min(COUNT, 8) : COUNT;
  const effectiveItems = ITEMS.slice(0, effectiveCount);
  const angleStep = (2 * Math.PI) / effectiveCount;

  useEffect(() => {
    let last = performance.now();

    const tick = (now) => {
      const delta = now - last;
      last = now;

      if (!paused) {
        setTime((t) => t + delta * (isMobile ? 0.0002 : 0.00035));
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [paused, isMobile]);

  // Function to check if item is at center position
  const isCenterPosition = (angle, isMobileView) => {
    if (isMobileView) {
      // MOBILE: Highlight at TOP (angle = -PI/2 or 3*PI/2, which is 270 degrees)
      // Normalize angle to 0-2PI range
      const normalizedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      // Top position is at 3*PI/2 (270 degrees) or -PI/2
      const topAngle = (3 * Math.PI) / 2;
      const diff = Math.abs(normalizedAngle - topAngle);
      // Also check wrap-around case
      const diffWrap = Math.abs(normalizedAngle - (topAngle - 2 * Math.PI));
      return Math.min(diff, diffWrap, Math.abs(2 * Math.PI - diff)) < 0.3;
    } else {
      // DESKTOP: Highlight at LEFT (horizontal line)
      const diff = Math.abs(((angle + Math.PI) % (2 * Math.PI)) - Math.PI);
      return diff < 0.25;
    }
  };

  return (
   <div className={"circle-capabilities-wrapper" + (isMobile ? " mobile" : "")}>
  {/* TEXT SECTION - On bottom for mobile */}
  <div className={"circle-text-section" + (isMobile ? " mobile" : "")}>
    <h1 className="circle-title">
      Designing Meaningful Brand Experiences
    </h1>

    <p className="circle-description">
      More than services, we create purposeful experiences that shape how brands
      connect, communicate, and grow.
      <br /><br />
      Experiences designed to deliver measurable business outcomes — influencing
      consumer behaviour, strengthening perception, and building lasting brand
      affinity across every touchpoint.
      <br /><br />
      In a multi-dimensional landscape where brands exist everywhere at once,
      marketing cannot remain one-dimensional. It demands clarity, cultural
      relevance, and a cohesive vision that resonates beyond the moment.
      <br /><br />
      From the first impression to long-term impact, we craft thoughtful,
      future-focused solutions — blending strategy, creativity, and execution to
      help brands move with confidence and intention.
    </p>
  </div>

      {/* CIRCLE SECTION - On top for mobile */}
      <div className={"circle-section" + (isMobile ? " mobile" : "")}>
        {/* IMAGE */}
        <img
          src={heroImage}
          alt="Emprio Branding Hero"
          className="circle-hero-image"
          loading="lazy"
        />

        {/* ORBIT */}
        <div
          className="circle-orbit-container"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          role="region"
          aria-label="Services orbit animation"
        >
          <div className="circle-orbit-ring" />

          {effectiveItems.map((label, i) => {
            const angle = time + i * angleStep;
            const x = Math.cos(angle) * 1;
            const y = Math.sin(angle) * 1;

            const isCenter = isCenterPosition(angle, isMobile);

            return (
              <div
                key={label}
                className="circle-item-wrapper"
                style={{
                  transform: "translate(calc(" + x + " * var(--orbit-radius)), calc(" + y + " * var(--orbit-radius)))",
                }}
              >
                
                <button
                 
                  className={"circle-item" + (isCenter ? " center" : "")}
                  aria-label={"Navigate to " + label}
                >
                  {label}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
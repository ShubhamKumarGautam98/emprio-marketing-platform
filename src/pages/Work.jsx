import React, { useEffect, useRef, useState } from "react";
import "./Work.css";
/* LEFT CIRCLE — CLIENT LOGOS */
const CLIENT_ITEMS = [
  { key: "drink", name: "Thums Up" },
  { key: "flag", name: "Kingfisher" },
  { key: "health", name: "MAX" },
  { key: "usa", name: "Each Person" },
  { key: "dermo", name: "VLCC" },
  { key: "bike", name: "Bajaj" },
  { key: "tourism", name: "Hong Kong" },
  { key: "chip", name: "Lay's" },
  { key: "vodka", name: "Jim Beam" },
  { key: "realstate", name: "Baraka" },
  { key: "tech", name: "Waymo" },
  { key: "anime", name: "Miniso" },
];
/* RIGHT — EVENTS (WORK) */
const EVENT_ITEMS = [
  { key: "thumbsup", name: "Thunder Wheels" },
  { key: "kingfisher", name: "Ultra Night" },
  { key: "max", name: "Max Health" },
  { key: "eachperson", name: "Person Expo" },
  { key: "vlcc", name: "VLCC Transform" },
  { key: "bajaj", name: "Bajaj Launch" },
  { key: "hongkong-tourism", name: "HK Roadshow" },
  { key: "lays", name: "Lay's Carnival" },
  { key: "jimbeam", name: "Beam Experience" },
  { key: "baraka", name: "Baraka Iftar" },
  { key: "waymo", name: "Waymo Showcase" },
  { key: "miniso", name: "Miniso Fest" },
];
/* WRITE UPS */
const WRITE_UPS = {
  drink: "Its versatile nature and wide range of flavours allow us to customise it our own way. But foodies miss it when they actually go out to eat.",
  flag: "Kingfisher's Ultra Night showcased premium vibes with seamless execution and crowd excitement.",
  health: "Max health care promoted health and nutrition through impactful community activations.",
  usa: "Each Person Expo highlighted innovation with a tech-forward global showcase.",
  dermo: "VLCC's Transformation Meet inspired beauty journeys through creative storytelling.",
  bike: "Bajaj's Launch Event revved up excitement with dynamic displays and audience interaction.",
  tourism: "Hong Kong Tourism's Roadshow captivated travelers with curated cultural highlights.",
  chip: "Lay's Carnival brought fun and flavor to life with playful brand moments.",
  vodka: "Jim Beam Experience elevated premium spirits with immersive tasting events.",
  realstate: "Baraka's Iftar Evening fostered community through culturally rich gatherings.",
  tech: "Waymo's Tech Showcase demonstrated autonomous innovation with cutting-edge tech.",
  anime: "Miniso's Brand Fest highlighted trendy lifestyle products driving retail buzz.",
};
const brandImageScaleMap = {
  drink: 1.1, flag: 1.0, health: 1.1, usa: 1.2, dermo: 1.2, bike: 1.1,
  tourism: 1.3, chip: 1.1, vodka: 1.0, realstate: 1.2, tech: 1.2, anime: 1.2,
};
const eventImageScaleMap = {
  thumbsup: 1.0, kingfisher: 1.0, max: 1.0, eachperson: 1.0, vlcc: 1.0, bajaj: 1.0,
  "hongkong-tourism": 1.0, lays: 1.0, jimbeam: 1.0, baraka: 1.0, waymo: 1.0, miniso: 1.0,
};
export default function Work() {
  const holdTimeout = useRef(null);
  const raf = useRef(null);
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [vw, setVw] = useState(window.innerWidth);
  const timeRef = useRef(0);
  const lastSnapIndex = useRef(-1);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  // === DEVICE DETECTION ===
  const isTabletPortrait =
    vw >= 768 &&
    vw < 1024 &&
    window.matchMedia("(orientation: portrait)").matches;
  const isTabletLandscape =
    vw >= 768 &&
    vw < 1024 &&
    window.matchMedia("(orientation: landscape)").matches;
  const isIpadProPortrait = 
    vw >= 820 && 
    vw <= 1180 && 
    window.matchMedia("(orientation: portrait)").matches;
  const isIpadProLandscape = 
    vw >= 1024 && 
    vw <= 1366 && 
    window.matchMedia("(orientation: landscape)").matches;
  const isDesktop = vw >= 1024 && !isIpadProPortrait;
  // === DESKTOP ORBIT SIZES ===
  let leftOrbitRadius = "380px";
  let rightOrbitRadius = "350px";
  if (isIpadProLandscape) {
    leftOrbitRadius = "380px";
    rightOrbitRadius = "330px";
  } else if (isIpadProPortrait) {
    leftOrbitRadius = "240px";
    rightOrbitRadius = "220px";
  }
  
  // === 1. ADJUST ORBIT ARC WIDTH AND HEIGHT HERE ===
  const mobileOrbitX =
    vw < 768 ? 120 :
    isIpadProPortrait ? 300 : 
    isTabletPortrait ? 170 :
    isIpadProLandscape ? 380 :
    isTabletLandscape ? 220 :
    100;
  const mobileOrbitY =
    vw < 768 ? 80 :
    isIpadProPortrait ? 240 : 
    isTabletPortrait ? 110 :
    isIpadProLandscape ? 280 :
    isTabletLandscape ? 140 :
    120;
  // === 2. ADJUST EVENT IMAGE SIZES HERE ===
  const eventScaleCenter = 
    isIpadProPortrait ? 0.3 : 
    isIpadProLandscape ? 0.6 :
    isTabletPortrait ? 0.4 :
    isTabletLandscape ? 0.4 :
    0.3; // Default mobile
  const eventScaleSide = 
    isIpadProPortrait ? 0.09 : 
    isIpadProLandscape ? 0.25 :
    isTabletPortrait ? 0.15 :
    isTabletLandscape ? 0.15 :
    0.1; // Default mobile
  const itemCount = CLIENT_ITEMS.length;
  const step = (2 * Math.PI) / itemCount;
  useEffect(() => {
    let last = performance.now();
    const tick = (now) => {
      const delta = now - last;
      last = now;
      if (!paused) {
        const speed = isDesktop ? 0.00035 : 0.0003;
        const increment = delta * speed;
        const prevTime = timeRef.current;
        const nextTime = prevTime + increment;
        const nextStepIndex = Math.floor(nextTime / step);
        if (nextStepIndex !== lastSnapIndex.current) {
          lastSnapIndex.current = nextStepIndex;
          const targetTime = nextStepIndex * step;
          timeRef.current = targetTime;
          setTime(targetTime);
          setPaused(true);
          if (holdTimeout.current) clearTimeout(holdTimeout.current);
          holdTimeout.current = setTimeout(() => setPaused(false), 800);
        } else {
          timeRef.current = nextTime;
          setTime(nextTime);
        }
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [paused, isDesktop, step]);
  const normalizedTime = ((time % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const centeredIndex =
    (((itemCount - Math.round(timeRef.current / step)) % itemCount) + itemCount) % itemCount;
  const activeKey = CLIENT_ITEMS[centeredIndex]?.key;
  if (isDesktop) {
    return (
      <div className="work-wrapper">
        <div className="work-page-title">
          <h1>what we do</h1>
          <h2>BRINGS IMPACT</h2>
        </div>
        <div className="work-side-label work-side-label-left">BRANDS</div>
        
        {/* LEFT SECTION */}
        <div className="work-section left">
          <div className="work-orbit-container work-orbit-left"
               onMouseEnter={() => setPaused(true)}
               onMouseLeave={() => setPaused(false)}
               style={{ "--work-orbit-radius": leftOrbitRadius }}> 
            {CLIENT_ITEMS.map((item, i) => {
              const angle = time + i * step;
              const x = Math.cos(angle);
              const y = Math.sin(angle) * 0.92;
              const isCenter = i === centeredIndex && paused;
              return (
                <div key={item.key} className="work-item-wrapper"
                     style={{ transform: `translate(calc(${x} * var(--work-orbit-radius)), calc(${y} * var(--work-orbit-radius)))` }}>
                  <div className={`work-item work-item-circle ${isCenter ? "center" : ""}`}>
                    <img src={"/images/clients/" + item.key + ".webp"} className="work-image" alt={item.name}
                         style={{ "--logo-scale": brandImageScaleMap[item.key] || 1 }}
                         onError={(e) => (e.target.style.display = "none")} />
                  </div>
                </div>
              );
            })}
            {CLIENT_ITEMS[centeredIndex] && (
              <div className="work-central-label work-central-label-left-pos">
                <span className="work-central-name">{CLIENT_ITEMS[centeredIndex].name}</span>
                <span className="work-central-subtitle">End to End Fabrication</span>
              </div>
            )}
          </div>
        </div>
        <div className="work-side-label work-side-label-right">WORK</div>
        {/* RIGHT SECTION */}
        <div className="work-section right">
          <div className="work-orbit-container work-orbit-right"
               style={{ "--work-orbit-radius-right": rightOrbitRadius }}>
            {EVENT_ITEMS.map((item, i) => {
              const angle = time + i * step;
              const x = -Math.cos(angle);
              const y = Math.sin(angle);
              const isCenter = i === centeredIndex && paused;
              return (
                <div key={item.key} className="work-item-wrapper-right"
                     style={{ transform: `translate(calc(${x} * var(--work-orbit-radius-right)), calc(${y} * var(--work-orbit-radius-right)))` }}>
                  <div className={`work-item work-item-square ${isCenter ? "center" : ""}`}>
                    <img src={"/images/events/" + item.key + ".webp"} className="work-image" alt={item.name}
                         style={{ transform: `scale(${eventImageScaleMap[item.key] || 1})` }}
                         onError={(e) => (e.target.style.display = "none")} />
                  </div>
                </div>
              );
            })}
            {EVENT_ITEMS[centeredIndex] && (
              <div className="work-central-label work-central-label-right">
                {EVENT_ITEMS[centeredIndex].name}
              </div>
            )}
          </div>
        </div>
        {activeKey && WRITE_UPS[activeKey] && (
          <div className="work-writeup">
            <p className="work-writeup-text">{WRITE_UPS[activeKey]}</p>
            <a href={"/work/" + activeKey} className="work-writeup-link">Read →</a>
          </div>
        )}
      </div>
    );
  }
  /* =====================
     MOBILE/TABLET LAYOUT
  ===================== */
  const mobileCenteredIndex =
    Math.round((itemCount - (normalizedTime - Math.PI / 2) / step) % itemCount) %
    itemCount;
  const mobileActiveKey = CLIENT_ITEMS[mobileCenteredIndex]?.key;
  const isItemInVisibleRange = (itemIndex, centerIndex, totalItems) => {
    const diff = Math.abs(itemIndex - centerIndex);
    const wrapDiff = totalItems - diff;
    const minDiff = Math.min(diff, wrapDiff);
    return minDiff <= 2;
  };
  return (
    // Added position relative, minHeight 100dvh to act as the bounding box for the absolute bottom anchor
    <div className="work-page-mobile" style={{ position: "relative", minHeight: "100dvh", overflowX: "hidden" }}>
      
      {/* TOP SECTION - BRANDS ARC */}
      <div className="work-brands-section">
        <div className="work-section-label"></div>
        <div
          className="work-brands-arc"
          style={{ position: "relative" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
            {/* BRANDS label positioned at the top of the orbit arc */}
          {(isIpadProPortrait || vw < 768) && (
            <div className="work-side-label work-side-label-left" style={{ position: "absolute", top: vw < 768 ? "60px" : "50px", left: "50%", transform: "translateX(-50%)", writingMode: "horizontal-tb", textAlign: "center",fontSize: vw < 768 ? "32px" : "48px" , zIndex: 20 }}>
              BRANDS
            </div>
          )}
          {CLIENT_ITEMS.map((item, i) => {
            const angle = time + i * step;
            const x = Math.cos(angle);
            const y = Math.sin(angle);
            const isCenter = i === mobileCenteredIndex && paused;
            const isVisible = isItemInVisibleRange(i, mobileCenteredIndex, itemCount);
            
            return (
              <div
                key={item.key}
                className={`work-brand-item ${isCenter ? "center" : ""} ${isVisible ? "visible" : "hidden"}`}
                style={{
                  transform: `translate(${x * mobileOrbitX}px, ${y * mobileOrbitY}px)`,
                  opacity: isVisible ? 1 : 0,
                  pointerEvents: isVisible ? "auto" : "none",
                  zIndex: isCenter ? 10 : 1,
                }}
              >
                <div
                  className={`work-brand-circle ${isCenter ? "center" : ""}`}
                  style={{
                    background: isCenter ? "#fff" : "transparent",
                    border: isCenter ? "1px solid rgba(0,0,0,0.1)" : "none",
                    boxShadow: isCenter ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  <img
                    src={"/images/clients/" + item.key + ".webp"}
                    className="work-brand-image"
                    alt={item.name}
                    style={
                      isIpadProPortrait 
                        ? { transform: `scale(${isCenter ? 2.5 : 1.8})` } 
                        : {}
                    }
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              </div>
            );
          })}
          {CLIENT_ITEMS[mobileCenteredIndex] && (
            <div
              className="work-brand-center-label"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                zIndex: 5,
                pointerEvents: "none",
              }}
            >
              <span className="work-brand-name">
                {CLIENT_ITEMS[mobileCenteredIndex].name}
              </span>
              <span className="work-brand-subtitle">End to End Fabrication</span>
            </div>
          )}
        </div>
      </div>
      {/* MIDDLE SECTION - TITLE & WRITEUP */}
      {isIpadProPortrait ? (
        <div 
          className="work-middle-section" 
          style={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            width: "100%", 
            zIndex: 20, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center" 
          }}
        >
          <div className="work-page-title" style={{ position: "relative", top: "auto", left: "auto", transform: "none", textAlign: "center" }}>
            <h1>what we do</h1>
            <h2>BRINGS IMPACT</h2>
          </div>
          {mobileActiveKey && WRITE_UPS[mobileActiveKey] && (
            <div className="work-writeup-content" style={{ textAlign: "center", marginTop: "2rem" }}>
              <p className="work-writeup-text-mobile">
                {WRITE_UPS[mobileActiveKey]}
              </p>
              <a href={"/work/" + mobileActiveKey} className="work-read-link">
                Read More <span className="work-arrow">→</span>
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="work-middle-section">
          <h1 className="work-title-mobile">what we do</h1>
          <h2 className="work-subtitle-mobile">BRINGS IMPACT</h2>
          {mobileActiveKey && WRITE_UPS[mobileActiveKey] && (
            <div className="work-writeup-content">
              <p className="work-writeup-text-mobile">
                {WRITE_UPS[mobileActiveKey]}
              </p>
              <a href={"/work/" + mobileActiveKey} className="work-read-link">
                Read More <span className="work-arrow">→</span>
              </a>
            </div>
          )}
        </div>
      )}
      {/* === 3. BOTTOM SECTION - EVENTS ARC (NOW ANCHORED TO BOTTOM) === */}
      <div 
        className="work-brands-section" 
        style={{ 
          position: "absolute", // <-- Anchors it exactly to the bottom
          bottom: "0",          // <-- Sticks to the bottom edge
          left: "0", 
          width: "100%", 
          paddingBottom: "40px" // <-- CHANGE THIS VALUE to move it slightly higher/lower off the exact bottom edge
        }}
      >
        <div className="work-section-label"></div>
        <div
          className="work-brands-arc"
          style={{ position: "relative" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
            {(isIpadProPortrait || vw < 768) && (
            <div className="work-side-label work-side-label-left" style={{ position: "absolute", top: vw < 768 ? "130px" : "150px", left: "50%", transform: "translateX(-50%)", writingMode: "horizontal-tb", textAlign: "center",fontSize: vw < 768 ? "32px" : "48px" , zIndex: 20 }}>
              WORK
            </div>
          )}
          {EVENT_ITEMS.map((item, i) => {
            const angle = time + i * step;
            const x = Math.cos(angle);
            const y = -Math.sin(angle);
            const isCenter = i === mobileCenteredIndex && paused;
            const isVisible = isItemInVisibleRange(i, mobileCenteredIndex, itemCount);
            
            return (
              <div
                key={item.key}
                className={`work-brand-item ${isCenter ? "center" : ""} ${isVisible ? "visible" : "hidden"}`}
                style={{
                  transform: `translate(${x * mobileOrbitX}px, ${y * mobileOrbitY}px)`,
                  opacity: isVisible ? 1 : 0,
                  pointerEvents: isVisible ? "auto" : "none",
                  zIndex: isCenter ? 10 : 1,
                }}
              >
                  <img
                    src={"/images/events/" + item.key + ".webp"}
                    className="work-event-image"
                    alt={item.name}
                    style={{
                      transform: `scale(${isCenter ? eventScaleCenter : eventScaleSide})`,
                      opacity: isCenter ? 1 : 0.7,
                      filter: isCenter ? "grayscale(0%)" : "grayscale(100%)",
                      zIndex: isCenter ? 10 : 1,
                      objectFit: "contain",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
            );
          })}
          {EVENT_ITEMS[mobileCenteredIndex] && (
            <div
              className="work-brand-center-label"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                zIndex: 5,
                pointerEvents: "none",
              }}
            >
              <span className="work-brand-name">
                {EVENT_ITEMS[mobileCenteredIndex].name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
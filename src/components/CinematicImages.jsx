import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CinematicImages.css";

// Assuming your imports match your project structure
import img1 from "../assets/gallery1.webp";
import img2 from "../assets/gallery2.webp";
import img3 from "../assets/gallery3.webp";
import img4 from "../assets/gallery4.webp";
import img5 from "../assets/gallery5.webp";
import img6 from "../assets/gallery6.webp";
import img7 from "../assets/gallery7.webp";
import img8 from "../assets/gallery8.webp";
import img9 from "../assets/gallery9.webp";
import img10 from "../assets/vlcc.webp";
import img11 from "../assets/gallery10.webp";
import img12 from "../assets/gallery11.webp";
import img13 from "../assets/gallery12.webp";
import img14 from "../assets/vlcc-mobile.webp";
import img15 from "../assets/gallery4-mobile.webp";
import img16 from "../assets/gallery11-mobile.webp";

export default function CinematicImages() {
  const sliderRef = useRef(null);
  const desktopSectionRef = useRef(null); // Ref for desktop intersection observer

  const [isMobile, setIsMobile] = useState(false);
  
  // Mobile state
  const [activeSlide, setActiveSlide] = useState(0);
  const [colorStep, setColorStep] = useState(0);

  // Desktop state
  const [isDesktopInView, setIsDesktopInView] = useState(false);
  const [desktopColorIndex, setDesktopColorIndex] = useState(-1);
  const [scrollDirection, setScrollDirection] = useState("down");
  const lastScrollY = useRef(0);

  /* ===============================
     MOBILE CHECK
  =============================== */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
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

/* ===============================
   DESKTOP VISIBILITY OBSERVER
================================ */
useEffect(() => {
  if (isMobile) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsDesktopInView(true);
      }
    },
    {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0,
    }
  );

  if (desktopSectionRef.current) {
    observer.observe(desktopSectionRef.current);
  }

  return () => observer.disconnect();
}, [isMobile]);
  /* ===============================
     IMAGE DATA
  =============================== */
  const mobileImages = [
  { src: img1, alt: "Gallery image 1" },
  { src: img2, alt: "Gallery image 2" },
  { src: img3, alt: "Gallery image 3" },
  { src: img15, alt: "Gallery image 4" }, // replaced
  { src: img5, alt: "Gallery image 5" },
  { src: img6, alt: "Gallery image 6" },
  { src: img7, alt: "Gallery image 7" },
  { src: img8, alt: "Gallery image 8" },
  { src: img9, alt: "Gallery image 9" },
  { src: img14, alt: "Gallery image 10" }, // replaced
  { src: img16, alt: "Gallery image 11" }, // replaced
  { src: img13, alt: "Gallery image 12" },
];

  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const imageChunks = chunkArray(mobileImages, 4);

  /* ===============================
     MOBILE COLOR SEQUENCE
  =============================== */
  useEffect(() => {
    if (!isMobile) return;

    setColorStep(0);
    let step = 0;

    const interval = setInterval(() => {
      step += 1;
      setColorStep(step);

      if (step >= 4) {
        clearInterval(interval);
        setTimeout(() => {
          sliderRef.current?.slickNext();
        }, 900);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [activeSlide, isMobile]);

  /* ===============================
     DESKTOP COLOR SEQUENCE
  =============================== */
  // 1. Detect when desktop view is visible
  useEffect(() => {
  if (isMobile || !isDesktopInView) return;

  const totalImages = 13;
  let step = 0;

  setDesktopColorIndex(-1);

  const interval = setInterval(() => {
    const index =
      scrollDirection === "down"
        ? step                // FIRST → LAST
        : totalImages - 1 - step; // LAST → FIRST

    setDesktopColorIndex(index);

    step++;

    if (step >= totalImages) {
      clearInterval(interval);

      setTimeout(() => {
        setDesktopColorIndex(-1); // reset to grey
      }, 1500);
    }
  }, 300);

  return () => clearInterval(interval);
}, [isDesktopInView, scrollDirection, isMobile]);

  // 2. Run animation loop when visible
  

  /* ===============================
     CAROUSEL SETTINGS
  =============================== */
  const carouselSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: (_, next) => setActiveSlide(next),
    customPaging: () => (
      <div className="custom-dot">
        <span className="dot-inner"></span>
        <span className="dot-progress"></span>
      </div>
    ),
    appendDots: (dots) => (
      <div className="custom-dots-container">
        <ul className="custom-dots-list">{dots}</ul>
      </div>
    ),
  };

  /* ===============================
     COMPONENT
  =============================== */
  // Helper for desktop classes
  const getDesktopClass = (baseClass, index) => {
  if (desktopColorIndex === -1) return baseClass;

  const shouldColor =
    scrollDirection === "down"
      ? index <= desktopColorIndex
      : index >= desktopColorIndex;

  return `${baseClass} ${shouldColor ? "is-colored" : ""}`;
};

  return (
    <section className="cinematic" ref={desktopSectionRef}>
      <h2 className="cinematic-title">WHAT WE DO BRINGS IMPACT</h2>

      {isMobile ? (
        <div className="cinematic-carousel">
          <Slider ref={sliderRef} {...carouselSettings}>
            {imageChunks.map((chunk, slideIndex) => (
              <div key={slideIndex} className="carousel-slide-grid">
                {/* TOP ROW */}
                {/* TOP ROW */}
{/* TOP ROW */}
<div className="grid-row top-row">
  {chunk.slice(0, 2).map((img, idx) => (
    <div
      key={idx}
      className={`grid-image-card ${
        idx <= colorStep ? "is-colored" : ""
      }`}
    >
      <img src={img.src} alt={img.alt} loading="lazy" />
    </div>
  ))}
</div>

{/* BOTTOM ROW */}
<div className="grid-row bottom-row">
  {chunk.slice(2, 4).map((img, idx) => (
    <div
      key={idx + 2}
      className={`grid-image-card ${
        idx + 2 <= colorStep ? "is-colored" : ""
      }`}
    >
      <img src={img.src} alt={img.alt} loading="lazy" />
    </div>
  ))}
</div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="cinematic-editorial">
          {/* Row 1 */}
          <div className={getDesktopClass("cinematic-card img1", 0)}><img src={img1} alt="" /></div>
          <div className={getDesktopClass("cinematic-card img2", 1)}><img src={img2} alt="" /></div>
          <div className={getDesktopClass("cinematic-card img3", 2)}><img src={img3} alt="" /></div>
          <div className={getDesktopClass("cinematic-card img4", 3)}><img src={img4} alt="" /></div>
          
          {/* Row 2 */}
          <div className={getDesktopClass("cinematic-card img5", 4)}><img src={img5} alt="" /></div>
          <div className={getDesktopClass("cinematic-card img6", 5)}><img src={img6} alt="" /></div>

          {/* Row 3 */}
          <div className="row5-6">
            <div className={getDesktopClass("cinematic-card img7", 6)}><img src={img7} alt="" /></div>
            <div className={getDesktopClass("cinematic-card img8", 7)}><img src={img8} alt="" /></div>
            <div className={getDesktopClass("cinematic-card img9", 8)}><img src={img9} alt="" /></div>
          </div>

          {/* Row 4 */}
          <div className={getDesktopClass("cinematic-card img10", 9)}><img src={img10} alt="" /></div>

          {/* Row 5 */}
          <div className="row11-13">
            <div className={getDesktopClass("cinematic-card img11", 10)}><img src={img11} alt="" /></div>
            <div className={getDesktopClass("cinematic-card img12", 11)}><img src={img12} alt="" /></div>
            <div className={getDesktopClass("cinematic-card img13", 12)}><img src={img13} alt="" /></div>
          </div>
        </div>
      )}
    </section>
  );
}
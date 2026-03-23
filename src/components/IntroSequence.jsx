import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const frameCount = 41; // must match your actual frames

export default function IntroSequence({ onFinish }) {
  const canvasRef = useRef(null);
  const images = useRef([]);
  const frame = useRef({ current: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Lock scroll
    document.body.style.overflow = "hidden";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ----------------------------
    // RENDER FRAME
    // ----------------------------
    const render = () => {
      const img = images.current[frame.current.current];
      if (!img) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );

      const x = canvas.width / 2 - (img.width / 2) * scale;
      const y = canvas.height / 2 - (img.height / 2) * scale;

      context.drawImage(
        img,
        x,
        y,
        img.width * scale,
        img.height * scale
      );
    };

    // ----------------------------
    // RUN TIMELINE AFTER MEASUREMENT
    // ----------------------------
    const runTimeline = (oCenterX, oCenterY, oRadius) => {
      const tl = gsap.timeline();

      tl.to(frame.current, {
        current: frameCount - 1,
        snap: "current",
        ease: "none",
        duration: 1.5,
        onUpdate: render
      })
      .to(".mask-container", {
        clipPath: `circle(${oRadius}px at ${oCenterX}px ${oCenterY}px)`,
        duration: 0.8,
        ease: "power3.inOut"
      })
      .to(".intro-wrapper", {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          document.body.style.overflow = "auto";
          if (onFinish) onFinish();
        }
      });
    };

    // ----------------------------
    // START ANIMATION
    // ----------------------------
    const startAnimation = () => {
      requestAnimationFrame(() => {
        const logo = document.querySelector(".hero-logo");
        if (!logo) return;

        const rect = logo.getBoundingClientRect();

        // O position inside logo (adjust if needed)
        const oOffsetX = rect.width * 0.82;
        const oOffsetY = rect.height * 0.5;

        const oCenterX = rect.left + oOffsetX;
        const oCenterY = rect.top + oOffsetY;

        // Radius proportional to logo size
        const oRadius = rect.height * 0.20;

        // Start full screen
        gsap.set(".mask-container", {
          clipPath: "circle(150% at 50% 50%)"
        });

        runTimeline(oCenterX, oCenterY, oRadius);
      });
    };

    // ----------------------------
    // PRELOAD IMAGES
    // ----------------------------
    const loadImages = () => {
      let loaded = 0;

      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `/intro-frames/frame_${String(i).padStart(4, "0")}.webp`;

        img.onload = () => {
          loaded++;
          if (loaded === frameCount) {
            startAnimation();
          }
        };

        images.current.push(img);
      }
    };

    loadImages();

    return () => {
      document.body.style.overflow = "auto";
    };

  }, [onFinish]);

  return (
    <div className="intro-wrapper">
      <div className="mask-container">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
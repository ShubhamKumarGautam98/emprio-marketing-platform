import { useState, useEffect } from "react";

export function useBackgroundDetection(ref, dependencies = []) {
  const [isLightBackground, setIsLightBackground] = useState(false);

  useEffect(() => {
    const detectBackgroundBrightness = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      
      // Check multiple points for accuracy
      const checkPoints = [
        { x: window.innerWidth * 0.75, y: rect.bottom + 5 },
        { x: window.innerWidth * 0.5, y: rect.bottom + 5 },
        { x: window.innerWidth * 0.25, y: rect.bottom + 5 }
      ];

      let lightCount = 0;
      let darkCount = 0;

      checkPoints.forEach(point => {
        const originalPointerEvents = ref.current.style.pointerEvents;
        ref.current.style.pointerEvents = "none";
        
        const elementBehind = document.elementFromPoint(point.x, point.y);
        
        ref.current.style.pointerEvents = originalPointerEvents;

        if (!elementBehind) return;

        const getActualBackgroundColor = (element) => {
          let current = element;
          let attempts = 0;
          
          while (current && current !== document.documentElement && attempts < 10) {
            const style = window.getComputedStyle(current);
            const bgColor = style.backgroundColor;
            const bgImage = style.backgroundImage;
            
            if (bgImage && bgImage !== "none") {
              return "rgb(0, 0, 0)";
            }
            
            if (bgColor && bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
              return bgColor;
            }
            
            current = current.parentElement;
            attempts++;
          }
          
          const bodyBg = window.getComputedStyle(document.body).backgroundColor;
          if (bodyBg && bodyBg !== "rgba(0, 0, 0, 0)" && bodyBg !== "transparent") {
            return bodyBg;
          }
          
          return "rgb(0, 0, 0)";
        };

        const bgColor = getActualBackgroundColor(elementBehind);
        const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        
        if (rgbMatch) {
          const r = parseInt(rgbMatch[1]);
          const g = parseInt(rgbMatch[2]);
          const b = parseInt(rgbMatch[3]);
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
          
          if (brightness > 128) {
            lightCount++;
          } else {
            darkCount++;
          }
        }
      });

      const shouldUseLightTheme = lightCount > darkCount;
      
      if (isLightBackground !== shouldUseLightTheme) {
        setIsLightBackground(shouldUseLightTheme);
        console.log(`Background detected: ${shouldUseLightTheme ? 'LIGHT' : 'DARK'}`);
      }
    };

    const initialTimeout = setTimeout(detectBackgroundBrightness, 150);

    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        detectBackgroundBrightness();
        scrollTimeout = null;
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", detectBackgroundBrightness);
    
    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", detectBackgroundBrightness);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [...dependencies, isLightBackground]);

  return isLightBackground;
}
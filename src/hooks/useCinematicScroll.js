import { useEffect, useRef, useState } from "react";

export default function useCinematicScroll(index) {
  const ref = useRef(null);
  const [state, setState] = useState("future"); // future | active | past

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.6) setState("active");
        else if (entry.boundingClientRect.top < 0) setState("past");
        else setState("future");
      },
      { threshold: [0.2, 0.6] }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, state];
}

import React, { useEffect, useRef, useState } from "react";
import "./ProcessTimeline.css";

/* ---------------- Data ---------------- */

const STAGES = [
  {
    title: "STAGE 1: DISCOVERY",
    content:
      "Gathering and finalizing requirements and goals for your project. Discuss project timeline and key milestones. Learning and understanding the problems to be solved.",
  },
  {
    title: "STAGE 2: RESEARCH",
    content:
      "Defining and closing gaps in knowledge through investigation and research of behaviors, needs, and motivations. Understanding competitive landscapes, markets, industries, and informing an effective project strategy.",
  },
  {
    title: "STAGE 3: STRATEGY",
    content:
      "Marrying the results of the Discovery and Research stages into a cohesive project plan. Refining the functional requirements for the Design and Development stages.",
  },
  {
    title: "STAGE 4: IDENTITY DESIGN",
    content: "Making the business strategy visible through design.",
  },
  {
    title: "STAGE 5: TOUCHPOINTS",
    content:
      "Developing a touchpoint program that will ensure an effective brand experience for the targeted audience.",
  },
  {
    title: "STAGE 6: ASSETS",
    content:
      "Accepting the project as complete, according to specifications, and ready for release to its intended audience.",
  },
];

/* ---------------- Main Component ---------------- */

export default function ProcessTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="process-wrapper">
      <div className="process-timeline">
        {/* Progressive line */}
        <div
          className="process-line"
          style={{
            height: `${Math.max(
              0,
              (activeIndex / (STAGES.length - 1)) * 100
            )}%`,
          }}
        />

        {STAGES.map((stage, index) => (
          <AnimatedStage
            key={index}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            number={index + 1}
            title={stage.title}
            content={stage.content}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------------- Stage Component ---------------- */

function AnimatedStage({
  index,
  activeIndex,
  setActiveIndex,
  number,
  title,
  content,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveIndex(index);
        } else {
          setActiveIndex((prev) => (prev === index ? index - 1 : prev));
        }
      },
      {
        threshold: 0.5,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index, setActiveIndex]);

  let stageClass = "stage future";
  if (index === activeIndex) stageClass = "stage active";
  if (index < activeIndex) stageClass = "stage previous";

  return (
    <div ref={ref} className={stageClass}>
      <div className="stage-left">
        <span className="stage-number">{number}</span>
        <div className="stage-label">{title}</div>
      </div>

      <div className="stage-dot" />

      <div className="stage-content">{content}</div>
    </div>
  );
}
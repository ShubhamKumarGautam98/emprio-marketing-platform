import React, { useEffect, useCallback, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./IdeasSection.css";

const ideas = [
  {
    type: "READ",
    title: "B2B Marketing in 2026: What Still Works, What's Dead, and What's Next",
    author: "Emprio Insights",
    date: "01/26/2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    description:
      "Lead gen is changing fast. Here's how B2B brands should rethink digital marketing in 2026 to drive real demand, not just downloads.",
    content: [
      "Lead generation is no longer about gated PDFs and generic webinars. Buyers expect value before they ever share an email address.",
      "Modern B2B brands must invest in brand authority, strong positioning, and consistent educational content.",
      "The shift from volume metrics to revenue impact is what separates high-growth companies from stagnant ones."
    ],
    cta: "More →",
  },

  {
    type: "READ",
    title: "Full-Funnel Marketing Isn't a Buzzword. Here's What It Actually Looks Like.",
    author: "Emprio Strategy Team",
    date: "01/18/2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    description:
      "From first impression to final conversion, we break down what a full-funnel strategy really involves and where most brands get it wrong.",
    content: [
      "A full-funnel strategy ensures your messaging evolves as the customer moves through awareness, consideration, and decision stages.",
      "Brands often overspend on acquisition while ignoring nurturing and retention.",
      "True funnel optimization aligns marketing, sales, and product experiences."
    ],
    cta: "More →",
  },

  {
    type: "READ",
    title: "In-House or Agency? The Marketing Decision That Can Make or Break Growth",
    author: "Emprio Consulting",
    date: "01/10/2026",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    description:
      "Hiring internally or partnering with an agency isn't just about cost. Here's how growing brands should decide what actually works.",
    content: [
      "Internal teams offer control and long-term consistency.",
      "Agencies bring cross-industry exposure and faster execution.",
      "The right choice depends on stage, ambition, and operational maturity."
    ],
    cta: "More →",
  },

  {
    type: "READ",
    title: "How Smart Brands Scale Marketing Without Spending More on Ads",
    author: "Growth Team",
    date: "01/04/2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    description:
      "Growth doesn't always need bigger budgets. It needs better strategy, sharper execution, and smarter use of what's already working.",
    content: [
      "Scaling efficiently means improving conversion rates before increasing spend.",
      "Optimizing funnels, creative testing, and audience refinement drive smarter growth.",
      "Better strategy often outperforms bigger budgets."
    ],
    cta: "More →",
  },

  {
    type: "READ",
    title: "If Your Marketing Feels Busy but Not Effective, Read This",
    author: "Editorial",
    date: "12/22/2025",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    description:
      "Posting regularly but seeing no real growth? These are the clear signs it's time to bring in a marketing agency",
    content: [
      "Activity does not equal impact.",
      "Without strategic clarity, even consistent execution leads nowhere.",
      "Strong direction, positioning, and alignment are critical for measurable results."
    ],
    cta: "More →",
  },

  {
    type: "READ",
    title: "High CAC Is a Symptom. Here's How to Actually Fix It",
    author: "Performance Strategy Team",
    date: "12/12/2025",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    description:
      "If acquiring customers is getting more expensive, the problem isn't just ads. Here's how brands can lower CAC without cutting growth.",
    content: [
      "Rising CAC usually signals deeper strategic issues.",
      "Improving positioning and messaging lowers acquisition friction.",
      "Strong brand equity reduces performance pressure."
    ],
    cta: "More →",
  },

  {
    type: "READ",
    title: "D2C Marketing That Goes Beyond Discounts and Performance Ads",
    author: "Commerce Strategy Team",
    date: "12/02/2025",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    description:
      "Best practices that drive loyaltyWinning D2C brands don't rely only on offers. We break down the best practices that drive loyalty, repeat purchases, and long-term value.",
    content: [
      "Sustainable D2C growth depends on retention, not flash sales.",
      "Brand storytelling and community engagement create lasting loyalty.",
      "Customer lifetime value matters more than first purchase ROAS."
    ],
    cta: "More →",
  },

  {
    type: "READ",
    title: "Rebranding Isn't a Logo Change. It's a Business Decision",
    author: "Brand Strategy Team",
    date: "11/20/2025",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description:
      "How brands should approach rebrandingFrom knowing when it's necessary to executing it right, here's how brands should approach rebranding without losing trust or momentum..",
    content: [
      "Rebranding affects perception, positioning, and internal culture.",
      "Clear strategic reasoning must precede visual updates.",
      "Execution must protect existing brand equity."
    ],
    cta: "More →",
  },

  {
    type: "READ",
    title: "Luxury in the Digital Age: Exclusive, Yet Everywhere",
    author: "Luxury & Culture Team",
    date: "11/05/2025",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    description:
      "Luxury brands walk a fine line onlineLuxury brands walk a fine line online. Here's how they can stay aspirational while still building reach, relevance, and engagement.",
    content: [
      "Digital presence must balance accessibility with exclusivity.",
      "Scarcity and storytelling remain core pillars of luxury.",
      "Modern luxury blends heritage with innovation."
    ],
    cta: "More →",
  },

  {
    type: "READ",
    title: "Reels or Long-Form Content? The Answer Isn't What You Think",
    author: "Content Strategy Team",
    date: "10/22/2025",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    description:
      "Short-form grabs attention, long-form builds trust. We break down what brands should actually focus on based on business goals.",
    content: [
      "Short-form creates reach; long-form builds authority.",
      "The right mix depends on business objectives.",
      "Strategic distribution amplifies both formats."
    ],
    cta: "More →",
  },
];

export default function IdeasSection() {
  /* ===============================
     MOBILE EMBLA
  =============================== */
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [colorStep, setColorStep] = useState(0);
  const [activeIdea, setActiveIdea] = useState(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  /* ===============================
     MOBILE CINEMATIC COLOR + SWIPE
  =============================== */
  useEffect(() => {
    if (!emblaApi) return;

    setColorStep(0);
    let step = 0;

    const interval = setInterval(() => {
      step += 1;
      setColorStep(step);

      if (step >= 2) {
        clearInterval(interval);
        setTimeout(() => {
          emblaApi.scrollNext();
        }, 900);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [selectedIndex, emblaApi]);

  /* ===============================
     TABLET PORTRAIT AUTO SCROLL
  =============================== */
  const tabletGridRef = useRef(null);

  useEffect(() => {
    const isPortraitTablet =
      window.innerWidth >= 901 &&
      window.innerWidth <= 1024 &&
      window.matchMedia("(orientation: portrait)").matches;

    if (!isPortraitTablet) return;

    const el = tabletGridRef.current;
    if (!el) return;

    let rafId;
    let scrollPos = 0;

    const autoScroll = () => {
      scrollPos += 0.25;
      el.scrollLeft = scrollPos;

      if (scrollPos >= el.scrollWidth - el.clientWidth) {
        scrollPos = 0;
      }

      rafId = requestAnimationFrame(autoScroll);
    };

    rafId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(rafId);
  }, []);

  /* ===============================
     DESKTOP CINEMATIC ANIMATION
  =============================== */
  const [desktopFinished, setDesktopFinished] = useState(false);
  const [desktopStep, setDesktopStep] = useState(0);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.35 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop || !isVisible) return;

    setDesktopStep(0);
    setDesktopFinished(false);

    let step = 0;

    const interval = setInterval(() => {
      step += 1;
      setDesktopStep(step);

      if (step >= 10) {
        clearInterval(interval);
        setTimeout(() => {
          setDesktopFinished(true);
        }, 600);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isVisible]);

  /* ===============================
     LOCK SCROLL WHEN MODAL OPEN
  =============================== */
  useEffect(() => {
    document.body.style.overflow = activeIdea ? "hidden" : "auto";
  }, [activeIdea]);

  /* ===============================
     ESC CLOSE
  =============================== */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setActiveIdea(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* ===============================
     COMPONENT
  =============================== */
  return (
    <section ref={sectionRef} className="ideas">
      <div className="ideas-header">
        <h2>Ideas</h2>
        <div className="ideas-line" />
      </div>

      {/* DESKTOP GRID */}
      <div ref={tabletGridRef} className="ideas-grid ideas-desktop-tablet">
        {ideas.slice(0, 10).map((item, index) => (
          <div
            key={index}
            className={`idea-card ${
              !desktopFinished && index < desktopStep ? "is-colored" : ""
            }`}
            onClick={() => setActiveIdea(item)}
          >
            <div className="idea-cover">
              <span className="idea-type">{item.type}</span>
              <h3>{item.title}</h3>
            </div>

            <div className="idea-meta">
              <span>{item.author}</span>
              <span>{item.date}</span>
            </div>

            <p className="idea-desc">{item.description}</p>
            <span className="idea-cta">{item.cta}</span>
          </div>
        ))}
      </div>

      {/* MOBILE CAROUSEL */}
      <div className="ideas-mobile">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {ideas.map((item, index) => (
              <div key={index} className="embla__slide">
                <div
                  className={`idea-card ${
                    (index === selectedIndex ||
                      index === selectedIndex + 1) &&
                    index - selectedIndex < colorStep
                      ? "is-colored"
                      : ""
                  }`}
                  onClick={() => setActiveIdea(item)}
                >
                  <div className="idea-cover">
                    <span className="idea-type">{item.type}</span>
                    <h3>{item.title}</h3>
                  </div>

                  <div className="idea-meta">
                    <span>{item.author}</span>
                    <span>{item.date}</span>
                  </div>

                  <p className="idea-desc">{item.description}</p>
                  <span className="idea-cta">{item.cta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`embla__dot ${
                index === selectedIndex ? "is-selected" : ""
              }`}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
 {activeIdea && (
  <div
    className="idea-modal-overlay"
    onClick={() => setActiveIdea(null)}
  >
    <div
      className="idea-modal-card"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="idea-modal-close"
        onClick={() => setActiveIdea(null)}
      >
        ×
      </button>

      <span className="idea-modal-label">
        Listen
      </span>

      <h1 className="idea-modal-title">
        {activeIdea.title}
      </h1>

      <div className="idea-modal-meta">
        <span>{activeIdea.date}</span>
        <span>
          by{" "}
          <a href="#" className="idea-author-link">
            {activeIdea.author}
          </a>
        </span>
      </div>

      {/* TEXT : IMAGE GRID START */}
      <div className="idea-modal-grid">

        {/* LEFT COLUMN — TEXT */}
        <div className="idea-modal-content">
          <p>{activeIdea.description}</p>

          {activeIdea.content &&
            activeIdea.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}

          <p className="idea-highlight">
            Listen and subscribe now on{" "}
            <a href="#">Apple Podcasts</a> and{" "}
            <a href="#">Spotify Podcasts</a>.
          </p>

          <p className="idea-newsletter">
            <a href="#">
              Interested in bigger, bolder ideas? Sign up for our newsletter
              for more insights on how brands can make an impact on the world.
            </a>
          </p>

          <div className="idea-divider" />

          <p className="idea-footnote">
            {activeIdea.author} is part of the Emprio Strategy Team.
          </p>

          <div className="idea-share">
            Share
          </div>
        </div>

        {/* RIGHT COLUMN — IMAGE */}
        <div className="idea-modal-image">
          <img
            src={activeIdea.image}
            alt={activeIdea.title}
          />
        </div>

      </div>
      {/* TEXT : IMAGE GRID END */}

    </div>
  </div>
)}
    </section>
  );
}
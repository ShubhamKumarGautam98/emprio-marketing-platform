import React from "react";
import { useParams, Link } from "react-router-dom";
import StickyCaseStudy from "../components/StickyCaseStudy";
import CinematicGallery from "../components/CinematicGallery";
import { caseStudies } from "../data/caseStudies";
import useScrollTop from "../hooks/useScrollTop";
import Footer from "../components/Footer";
import "./CaseStudy.css";

export default function CaseStudy() {
  useScrollTop();

  const { slug } = useParams();
  const study = caseStudies[slug];

  if (!study) {
    return (
      <p className="case-not-found">
        Case study not found
      </p>
    );
  }

  return (
    <>
      {/* HERO */}
      <StickyCaseStudy study={study} />

      {/* CINEMATIC IMAGE SEQUENCE */}
      {study.gallery && (
        <CinematicGallery images={study.gallery} />
      )}

      {/* END MESSAGE – show only when NOT nykaa */}
      {slug !== "nykaa" && (
        <section className="case-end">
          <p className="case-end-text">
            For more case studies, download our brochure.
          </p>

          <a
            href="/brochure/emprio-brochure.pdf"
            download
            className="case-download-link"
          >
            DOWNLOAD BROCHURE
          </a>
        </section>
      )}

      {/* NEXT CASE */}
      {study.next && (
        <section className="case-next">
          <Link
            to={`/case-study/${study.next}`}
            className="case-next-link"
          >
            NEXT CASE STUDY →
          </Link>
        </section>
      )}

      <Footer />
    </>
  );
}
import React from "react";
import "./AboutGrowthEngines.css";

import clickcease from "../assets/clickcease.webp";
import surfer from "../assets/surfer.webp";
import clarity from "../assets/clarity.webp";
import looker from "../assets/looker.webp";
import ga from "../assets/google-analytics.webp";
import ahrefs from "../assets/ahrefs.webp";
import figma from "../assets/figma.webp";
import devops from "../assets/devops.webp";

import gamma from "../assets/gamma.webp";
import gcloud from "../assets/google-cloud.webp";
import ads from "../assets/google-ads.webp";
import oracle from "../assets/oracle.webp";
import runway from "../assets/runway.webp";
import midjourney from "../assets/midjourney.webp";
import kling from "../assets/kling.webp";

import veo from "../assets/veo.webp";
import grammarly from "../assets/grammarly.webp";
import davinci from "../assets/davinci.webp";
import photoshop from "../assets/photoshop.webp";
import illustrator from "../assets/illustrator.webp";
import premiere from "../assets/premiere.webp";
import aftereffects from "../assets/aftereffects.webp";
import lightroom from "../assets/lightroom.webp";

import tag from "../assets/Google Tag Manager.webp";

const logoScaleMap = {
  clickcease: 2.4,
  surfer: 1.6,
  clarity: 1.6,
  looker: 1.9,
  ga: 1.75,
  ahrefs: 1.55,
  figma: 1.95,
  devops: 1.9,
  gamma: 1.65,
  gcloud: 1.35,
  ads: 1.45,
  oracle: 1.29,
  runway: 1.15,
  midjourney: 1.1,
  kling: 1.0,
  veo: 1.5,
  grammarly: 2.0,
  davinci: 2.1,
  photoshop: 2.0,
  illustrator: 1.9,
  premiere: 2.5,
  aftereffects: 2.17,
  lightroom: 2.0,
  tag: 1.75,
};

const tools = [
  { src: clickcease, key: "clickcease" },
  { src: surfer, key: "surfer" },
  { src: clarity, key: "clarity" },
  { src: looker, key: "looker" },
  { src: ga, key: "ga" },
  { src: ahrefs, key: "ahrefs" },
  { src: figma, key: "figma" },
  { src: devops, key: "devops" },
  { src: gamma, key: "gamma" },
  { src: gcloud, key: "gcloud" },
  { src: ads, key: "ads" },
  { src: oracle, key: "oracle" },
  { src: runway, key: "runway" },
  { src: midjourney, key: "midjourney" },
  { src: kling, key: "kling" },
  { src: veo, key: "veo" },
  { src: grammarly, key: "grammarly" },
  { src: davinci, key: "davinci" },
  { src: photoshop, key: "photoshop" },
  { src: illustrator, key: "illustrator" },
  { src: premiere, key: "premiere" },
  { src: aftereffects, key: "aftereffects" },
  { src: lightroom, key: "lightroom" },
  { src: tag, key: "tag" },
];

export default function AboutGrowthEngines() {
  return (
    <section className="growth-section">
      <h2 className="growth-heading">Our Growth Engines</h2>

      <div className="growth-engines-grid">
        {tools.map(({ src, key }, index) => (
          <div key={index} className="growth-circle">
            <img
              src={src}
              alt={key}
              className="growth-logo"
              style={{ transform: "scale(" + (logoScaleMap[key] || 1) + ")" }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

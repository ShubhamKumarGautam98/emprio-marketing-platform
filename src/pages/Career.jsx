import React from "react";
import Footer from "../components/Footer";
import Opportunities from "../components/Opportunities";

import CareerHero from "../components/CareerHero";
import CareerStory from "../components/CareerStory";
import CareerApply from "../components/CareerApply";

export default function Career() {
  return (
    <>
      <CareerHero />
      <CareerStory />
      <Opportunities />
      <CareerApply />
      <Footer />
    </>
  );
}
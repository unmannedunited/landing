"use client";

import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AboutHero from "../components/about/AboutHero";
import WhoWeAre from "../components/about/WhoWeAre";
import EachMember from "../components/about/EachMember";
import TeamPic from "../components/about/TeamPic";
import WhatWe from "../components/about/WhatWe";
import ContactForm from "../components/ContactForm";
import EverythingWeBuild from "../components/about/EverythingWeBuild";

export default function About() {

  return (
    <div className="relative w-full bg-white ">
      <Navigation />
      
      <div className="md:pt-0 pt-16">
        <AboutHero scrollY={scrollY} />
      </div>
      <WhoWeAre scrollY={scrollY} />


      <EachMember />

      <TeamPic />
      <WhatWe />
      <EverythingWeBuild />

      <ContactForm offset={0} />
      <Footer />
    </div>
  );
}

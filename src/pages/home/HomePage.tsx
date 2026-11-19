import { HomeHero } from '../../components/home/HomeHero';
import { HomeBenefits } from '../../components/home/HomeBenefits';
import { HomeTreeCarousel } from '../../components/home/HomeTreeCarousel';
import { HomeHowItWorks } from '../../components/home/HomeHowItWorks';
import { HomeMission } from '../../components/home/HomeMission';

import { useEffect } from "react";
import { useLocation } from "react-router";


export function HomePage() {
    const { hash, key } = useLocation();

useEffect(() => {
  const sectionIds: Record<string, string> = {
    "#comment-ca-marche": "comment-ca-marche",
    "#nos-arbres": "nos-arbres",
    "#notre-mission": "notre-mission",
  };

  const sectionId = sectionIds[hash];

  if (!sectionId) return;

  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, [hash, key]);

return (
    <>
        <HomeHero />
        <HomeBenefits />
        <HomeTreeCarousel />
        <HomeHowItWorks />
        <HomeMission />
    </>
    );
}
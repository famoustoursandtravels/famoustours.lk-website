"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

// Below-the-fold / heavy animation sections — load after first paint
const WelcomeSection = dynamic(() => import("@/components/WelcomeSection"));
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const ThingsToDo = dynamic(() => import("@/components/ThingsToDo"));
const PackageSection = dynamic(() => import("@/components/PackageSection"));
const Gallery = dynamic(() => import("@/components/Gallery"));
const VelocityMarqueeSection = dynamic(
  () => import("@/components/VelocityMarqueeSection")
);

export default function HomeContent() {
  const router = useRouter();
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("visited");

    if (!hasVisited) {
      sessionStorage.setItem("visited", "true");
      router.push("/splash");
    } else {
      setShowHome(true);
    }
  }, [router]);

  if (!showHome) return null;

  return (
    <>
      <Navbar />
      <Hero />
      <WelcomeSection />
      <WhyChooseUs />
      <ThingsToDo />
      <PackageSection />
      <Gallery />
      <VelocityMarqueeSection />
      <Footer />
    </>
  );
}

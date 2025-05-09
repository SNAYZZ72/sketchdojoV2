"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';
import { Header } from "@/components/landing-page/home/header";
import { Hero } from "@/components/landing-page/home/hero";
import { Features } from "@/components/landing-page/home/features";
import { HowItWorks } from "@/components/landing-page/home/how-it-works";
import { Showcase } from "@/components/landing-page/home/showcase";
import { Testimonials } from "@/components/landing-page/home/testimonials";
// import { MobileAppPreview } from "@/components/landing-page/home/mobile-app-preview";
// import { Partners } from "@/components/landing-page/home/partners";
import { Pricing } from "@/components/landing-page/home/pricing";
import { Faq } from "@/components/landing-page/home/faq";
import { Cta } from "@/components/landing-page/home/cta";
import { Footer } from "@/components/landing-page/home/footer";
import { motion, useScroll, useTransform } from "framer-motion";

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    
    window.addEventListener('mousemove', moveCursor);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);
  
  return null;
};

// Enhanced scroll animations
const ScrollAnimations = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementTop = (element as HTMLElement).getBoundingClientRect().top;
        const elementHeight = (element as HTMLElement).offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (elementTop <= windowHeight - elementHeight / 4) {
          element.classList.add('animate-fadeIn');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return null;
};

// Parallax background effect
const ParallaxBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  return (
    <motion.div 
      ref={ref}
      style={{ y, opacity }}
      className="fixed inset-0 pointer-events-none z-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,115,255,0.15),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(91,115,255,0.1),transparent_70%)]"></div>
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(194,63,220,0.1),transparent_60%)] rounded-full blur-3xl"></div>
      <div className="absolute top-[60%] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(91,115,255,0.1),transparent_60%)] rounded-full blur-3xl"></div>
    </motion.div>
  );
};

export default function Home() {
  const t = useTranslations();
  
  return (
    <main className="min-h-screen bg-sketchdojo-bg overflow-x-hidden">
      {/* Visual effects */}
      <CustomCursor />
      <ScrollAnimations />
      <ParallaxBackground />
      
      {/* Header Navigation */}
      <Header />
      
      {/* Main content sections */}
      <Hero />
      <Features />
      <HowItWorks />
      <Showcase />
      <Testimonials />
      {/* <MobileAppPreview /> */}
      {/* <Partners /> */}
      <Pricing />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
"use client";

import { useEffect } from "react";
import { Header } from "@/components/landing-page/home/header";
import { Hero } from "@/components/landing-page/home/hero";

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

export default function Home() {  
  return (
    <main className="min-h-screen bg-sketchdojo-bg overflow-hidden">      
      {/* Custom effects */}
      <CustomCursor />
      <ScrollAnimations />
      
      {/* Header Navigation */}
      <Header />
      
      {/* Hero */}
      <Hero />
    </main>
  );
}
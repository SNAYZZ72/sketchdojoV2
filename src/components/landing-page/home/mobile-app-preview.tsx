"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from '@/i18n/navigation';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const phoneVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.3,
      duration: 0.8
    }
  }
};

export const MobileAppPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section id="mobile-app" className="relative py-20 md:py-32 bg-gradient-to-b from-sketchdojo-bg/90 to-black/90 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sketchdojo-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-sketchdojo-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Content */}
          <motion.div variants={itemVariants}>
            <div className="inline-block mb-6">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-white/90 backdrop-blur-sm border border-white/10">
                Create Anywhere
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              SketchDojo in Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-sketchdojo-primary to-sketchdojo-accent">Pocket</span>
            </h2>
            
            <p className="text-lg text-white/70 mb-8 max-w-lg">
              Take your manga creation on the go with our mobile app. Get all the powerful features of SketchDojo in a beautifully designed mobile experience.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                "Create manga anywhere, anytime",
                "Optimized for touch interface",
                "Access your entire manga library",
                "Push notifications for new features",
                "Offline mode for creating without internet"
              ].map((feature, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  className="flex items-center"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-sketchdojo-primary to-sketchdojo-accent flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/90">{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a href="#" className="transform transition-transform hover:scale-105 duration-300">
                <Image 
                  src="/images/app-store-badge.png" 
                  alt="Download on the App Store" 
                  width={160}
                  height={53}
                  className="h-[53px] w-auto"
                />
              </a>
              <a href="#" className="transform transition-transform hover:scale-105 duration-300">
                <Image 
                  src="/images/google-play-badge.png" 
                  alt="Get it on Google Play" 
                  width={180}
                  height={53}
                  className="h-[53px] w-auto"
                />
              </a>
            </motion.div>
          </motion.div>
          
          {/* Mobile devices */}
          <motion.div
            variants={phoneVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Primary phone */}
              <div className="relative z-20 rounded-[32px] overflow-hidden shadow-2xl border-8 border-black w-[280px] md:w-[300px]">
                <Image 
                  src="/images/mobile-app-screen-1.png" 
                  alt="SketchDojo mobile app" 
                  width={300}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                
                {/* Phone details */}
                <div className="absolute top-0 left-0 w-full h-6 bg-black rounded-t-2xl"></div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black rounded-b-xl"></div>
                <div className="absolute bottom-0 left-0 w-full h-5 bg-black"></div>
              </div>
              
              {/* Secondary phone (smaller and behind) */}
              <div className="absolute top-[10%] -left-[15%] z-10 rounded-[32px] overflow-hidden shadow-2xl border-8 border-black w-[220px] md:w-[240px]">
                <Image 
                  src="/images/mobile-app-screen-2.png" 
                  alt="SketchDojo mobile app second screen" 
                  width={240}
                  height={500}
                  className="w-full h-auto object-cover"
                />
                
                {/* Phone details */}
                <div className="absolute top-0 left-0 w-full h-5 bg-black rounded-t-2xl"></div>
                <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-20 h-3 bg-black rounded-b-xl"></div>
                <div className="absolute bottom-0 left-0 w-full h-4 bg-black"></div>
              </div>
              
              {/* Phone glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-sketchdojo-primary/30 via-sketchdojo-accent/30 to-sketchdojo-primary/30 rounded-full blur-3xl opacity-30 z-0 animate-pulse-slow"></div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute top-1/4 right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
                  <Download className="w-4 h-4 text-white" />
                </div>
                <div className="text-white">
                  <div className="text-xs font-medium">Downloads</div>
                  <div className="text-sm font-bold">100K+</div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-1/4 -left-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="text-white">
                  <div className="text-xs font-medium">Rating</div>
                  <div className="text-sm font-bold">4.8/5</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileAppPreview;
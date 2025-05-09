"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

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

// Partners data
const partners = [
  {
    name: "Adobe Creative Cloud",
    logo: "/images/partners/adobe-logo.svg",
    description: "Export your manga directly to Adobe Photoshop or Illustrator for advanced editing"
  },
  {
    name: "Procreate",
    logo: "/images/partners/procreate-logo.svg",
    description: "Seamless integration with Procreate for detailed touchups on iPad"
  },
  {
    name: "Clip Studio Paint",
    logo: "/images/partners/clipstudio-logo.svg",
    description: "Export panels to Clip Studio Paint for professional manga refinement"
  },
  {
    name: "Canva",
    logo: "/images/partners/canva-logo.svg",
    description: "Easily import your manga into Canva for social media and marketing materials"
  },
  {
    name: "Wordpress",
    logo: "/images/partners/wordpress-logo.svg",
    description: "Publish your manga directly to WordPress with our plugin"
  },
  {
    name: "Webtoon",
    logo: "/images/partners/webtoon-logo.svg",
    description: "Format and publish your manga to Webtoon with a single click"
  }
];

export const Partners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section id="partners" className="relative py-20 md:py-28 bg-gradient-to-b from-black/90 to-sketchdojo-bg/90">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 left-1/4 w-[600px] h-[600px] bg-sketchdojo-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sketchdojo-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-white/90 backdrop-blur-sm border border-white/10 mb-4">
              Seamless Workflow
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Works With Your Favorite Tools
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            SketchDojo integrates with popular design and publishing platforms to fit perfectly into your creative workflow.
          </p>
        </div>
        
        {/* Logos grid */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 relative mb-4 flex items-center justify-center">
                <Image 
                  src={partner.logo} 
                  alt={partner.name} 
                  width={80}
                  height={80}
                  className="w-full h-auto object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{partner.name}</h3>
              <p className="text-white/70 text-sm">{partner.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Marquee logos row */}
        <div className="mt-20 overflow-hidden relative">
          <p className="text-center text-lg font-medium text-white mb-8">Trusted by creators around the world</p>
          
          {/* Marquee container */}
          <div className="relative">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-black to-transparent"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-black to-transparent"></div>
            
            {/* First marquee row */}
            <div className="flex animate-scroll">
              {[...Array(12)].map((_, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 mx-8 w-24 h-12 bg-white/5 rounded-md backdrop-blur-sm flex items-center justify-center"
                >
                  <Image 
                    src={`/images/clients/client-${(index % 6) + 1}.svg`} 
                    alt={`Client logo ${index + 1}`} 
                    width={80}
                    height={40}
                    className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
            
            {/* Second marquee row (reverse direction) */}
            <div className="flex animate-scroll-reverse mt-8">
              {[...Array(12)].map((_, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 mx-8 w-24 h-12 bg-white/5 rounded-md backdrop-blur-sm flex items-center justify-center"
                >
                  <Image 
                    src={`/images/clients/client-${((index + 3) % 6) + 1}.svg`} 
                    alt={`Client logo ${index + 7}`} 
                    width={80}
                    height={40}
                    className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
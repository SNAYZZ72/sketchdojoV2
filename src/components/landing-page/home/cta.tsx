"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from '@/i18n/navigation';
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

export const Cta = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <section id="cta" className="relative py-24 md:py-32 bg-gradient-to-b from-sketchdojo-bg/90 to-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,115,255,0.2),transparent_70%)]"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sketchdojo-primary via-sketchdojo-accent to-sketchdojo-primary bg-size-200 animate-gradient"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          {/* Main CTA card */}
          <motion.div 
            variants={itemVariants}
            className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              {/* Content */}
              <div className="w-full md:w-3/5">
                <motion.div 
                  variants={itemVariants}
                  className="mb-6 inline-flex items-center"
                >
                  <Sparkles className="h-5 w-5 mr-2 text-sketchdojo-primary" />
                  <span className="text-white/80 font-medium">Start Creating Today</span>
                </motion.div>
                
                <motion.h2 
                  variants={itemVariants}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
                >
                  Turn Your Ideas Into <span className="bg-clip-text text-transparent bg-gradient-to-r from-sketchdojo-primary to-sketchdojo-accent">Beautiful Manga</span> in Seconds
                </motion.h2>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-lg text-white/70 mb-8"
                >
                  Join thousands of creators who are bringing their stories to life with SketchDojo. No artistic skills required — just your imagination.
                </motion.p>
                
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/sign-up">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto px-8 py-6 text-lg bg-gradient-to-r from-sketchdojo-primary to-sketchdojo-accent text-white hover:shadow-lg hover:shadow-sketchdojo-primary/30"
                    >
                      Create Your First Manga
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/showcase">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full sm:w-auto px-8 py-6 text-lg border-white/20 text-white hover:border-white/40 hover:bg-white/10"
                    >
                      See Examples
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.p 
                  variants={itemVariants}
                  className="mt-4 text-white/50 text-sm"
                >
                  No credit card required • Free plan available • Cancel anytime
                </motion.p>
              </div>
              
              {/* Image */}
              <motion.div 
                variants={itemVariants}
                className="w-full md:w-2/5 relative"
              >
                <div className="relative aspect-square max-w-[300px] mx-auto">
                  <Image 
                    src="/images/cta-manga-preview.png" 
                    alt="Manga creation example" 
                    fill
                    className="object-cover rounded-lg border border-white/20 shadow-2xl"
                  />
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-sketchdojo-primary/30 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-sketchdojo-accent/30 rounded-full blur-xl"></div>
                </div>
              </motion.div>
            </div>
            
            {/* Background gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sketchdojo-primary to-sketchdojo-accent"></div>
            <div className="absolute -bottom-1/2 -right-1/2 w-[800px] h-[800px] bg-sketchdojo-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -top-1/2 -left-1/2 w-[800px] h-[800px] bg-sketchdojo-accent/5 rounded-full blur-3xl"></div>
          </motion.div>
          
          {/* Testimonial */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <div className="flex flex-col items-center">
              <div className="mb-4">
                {/* 5 stars */}
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-xl text-white/90 mb-4 max-w-3xl italic">
                "SketchDojo has completely transformed my creative process. I've always had manga stories in my head but never had the artistic skills to bring them to life. Now I can create professional-looking manga in minutes!"
              </p>
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image 
                    src="/images/testimonial-avatar.png" 
                    alt="Testimonial avatar" 
                    width={40}
                    height={40}
                  />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">Maya Tanaka</p>
                  <p className="text-white/60 text-sm">Indie Comic Creator</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cta;
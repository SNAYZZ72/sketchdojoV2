"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Paintbrush, Layout, Share } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from '@/i18n/navigation';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Steps data
const steps = [
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Describe Your Idea",
    description: "Simply describe what you want in your manga using natural language. Include details about characters, scenes, and styles.",
    image: "/images/step-1-describe.png",
    color: "from-sketchdojo-primary to-sketchdojo-primary/80"
  },
  {
    icon: <Paintbrush className="h-8 w-8" />,
    title: "AI Generates Panels",
    description: "Our advanced AI instantly creates high-quality manga panels based on your description, complete with authentic manga styles.",
    image: "/images/step-2-generate.png",
    color: "from-sketchdojo-accent to-sketchdojo-accent/80"
  },
  {
    icon: <Layout className="h-8 w-8" />,
    title: "Customize & Edit",
    description: "Refine your manga by editing panels, adjusting layouts, and fine-tuning details until it's exactly how you want it.",
    image: "/images/step-3-customize.png",
    color: "from-purple-600 to-purple-600/80"
  },
  {
    icon: <Share className="h-8 w-8" />,
    title: "Share Your Creation",
    description: "Export your manga in various formats and share your creation with friends, on social media, or with the SketchDojo community.",
    image: "/images/step-4-share.png",
    color: "from-teal-500 to-teal-500/80"
  }
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section id="how-it-works" className="relative py-20 md:py-32 bg-gradient-to-b from-sketchdojo-bg/90 to-black/90">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-sketchdojo-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-sketchdojo-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-white/90 backdrop-blur-sm border border-white/10 mb-4">
              Simple Process
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            How SketchDojo Works
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Creating stunning manga is incredibly easy with SketchDojo. Follow these simple steps to bring your ideas to life.
          </p>
        </div>
        
        {/* Steps timeline */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12 mb-20 md:mb-28 last:mb-8`}
            >
              {/* Step content */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} shadow-lg mb-6`}>
                  {step.icon}
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="bg-white/20 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-white/70 text-lg mb-6 max-w-lg">
                  {step.description}
                </p>
              </div>
              
              {/* Step image */}
              <div className="w-full md:w-1/2">
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-sketchdojo-primary/20 to-sketchdojo-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Image 
                    src={step.image} 
                    alt={step.title}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
              
              {/* Connector line for all but the last step */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 h-20 w-px bg-gradient-to-b from-white/30 to-transparent hidden md:block"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Button */}
        <div className="text-center mt-12 md:mt-16">
          <Link href="/sign-up">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-sketchdojo-primary to-sketchdojo-accent text-white hover:shadow-lg hover:shadow-sketchdojo-primary/30 px-8 py-6 text-lg"
            >
              Start Creating Now
            </Button>
          </Link>
          <p className="text-white/50 mt-4 text-sm">
            No credit card required • Free plan available
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
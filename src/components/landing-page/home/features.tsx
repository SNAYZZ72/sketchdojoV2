"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Wand2, Brush, Layers, MessageSquare, Users, Palette, Share2 } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

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

// Feature data
const features = [
  {
    icon: <Wand2 className="h-6 w-6" />,
    title: "AI-Powered Creation",
    description: "Transform your text descriptions into stunning manga art in seconds with our advanced AI technology",
    color: "from-purple-600 to-indigo-600"
  },
  {
    icon: <Brush className="h-6 w-6" />,
    title: "Professional Quality",
    description: "Generate high-quality manga panels with authentic art styles, no artistic skills required",
    color: "from-blue-600 to-cyan-600"
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Complete Customization",
    description: "Customize every aspect of your manga from characters and scenes to panel layouts and speech bubbles",
    color: "from-emerald-600 to-teal-600"
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Multiple Styles",
    description: "Choose from various manga styles including classic black & white, modern color, or your own custom style",
    color: "from-amber-600 to-orange-600"
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Interactive Creation",
    description: "Chat with our AI to refine your manga through a natural conversation interface",
    color: "from-rose-600 to-pink-600"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Character Library",
    description: "Build a library of your characters for easy reuse across different manga projects",
    color: "from-violet-600 to-purple-600"
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "One-Click Enhancement",
    description: "Enhance and improve your manga panels with a single click using AI-powered suggestions",
    color: "from-indigo-600 to-blue-600"
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: "Easy Sharing",
    description: "Export your manga in various formats and share directly to social media or with friends",
    color: "from-teal-600 to-emerald-600"
  }
];

export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section 
      id="features" 
      className="relative py-20 md:py-28 bg-gradient-to-b from-black/90 to-sketchdojo-bg/90 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sketchdojo-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sketchdojo-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-white/90 backdrop-blur-sm border border-white/10 mb-4">
              Powerful Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Everything You Need to Create Amazing Manga
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            SketchDojo combines powerful AI technology with intuitive tools to help you create professional-quality manga without any drawing skills.
          </p>
        </div>
        
        {/* Features grid */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg group overflow-hidden"
            >
              {/* Feature icon */}
              <div className={`p-3 rounded-xl mb-5 w-14 h-14 flex items-center justify-center bg-gradient-to-r ${feature.color} shadow-lg`}>
                {feature.icon}
              </div>
              
              {/* Feature content */}
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-white/90">
                {feature.title}
              </h3>
              <p className="text-white/70 group-hover:text-white/80">
                {feature.description}
              </p>
              
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-sketchdojo-primary/0 to-sketchdojo-accent/0 group-hover:from-sketchdojo-primary/10 group-hover:to-sketchdojo-accent/10 transition-all duration-500 rounded-2xl opacity-0 group-hover:opacity-100"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
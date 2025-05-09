"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

// Testimonial data
const testimonials = [
  {
    id: 1,
    quote: "SketchDojo has completely transformed my creative process. I had so many manga stories in my head but never had the artistic skills to bring them to life. Now I can create professional-looking manga in minutes!",
    name: "Maya Tanaka",
    role: "Indie Comic Creator",
    avatar: "/images/testimonials/avatar-1.png"
  },
  {
    id: 2,
    quote: "As a writer, I've always struggled with visualizing my stories. SketchDojo bridges that gap perfectly. The AI understands exactly what I'm trying to convey and brings my characters to life with stunning manga panels.",
    name: "James Watson",
    role: "Fantasy Novelist",
    avatar: "/images/testimonials/avatar-2.png"
  },
  {
    id: 3,
    quote: "I use SketchDojo in my high school creative writing class, and my students are absolutely thrilled! It's inspiring to see them so engaged in storytelling now that they can visualize their narratives through manga.",
    name: "Sarah Chen",
    role: "High School Teacher",
    avatar: "/images/testimonials/avatar-3.png"
  },
  {
    id: 4,
    quote: "The quality of the AI-generated manga panels is incredible. I was skeptical at first, but SketchDojo truly captures the essence of traditional manga styles while adding a unique touch to each creation.",
    name: "Hiroshi Yamamoto",
    role: "Manga Enthusiast",
    avatar: "/images/testimonials/avatar-4.png"
  },
  {
    id: 5,
    quote: "Creating storyboards for my films used to take weeks. With SketchDojo, I can iterate through visual concepts in hours. It's revolutionized my pre-production workflow and saved me so much time and money.",
    name: "Elena Rodriguez",
    role: "Independent Filmmaker",
    avatar: "/images/testimonials/avatar-5.png"
  }
];

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay]);
  
  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);
  
  // Navigation
  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
  };
  
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setAutoplay(false);
  };
  
  const handleDotClick = (index: number) => {
    setCurrent(index);
    setAutoplay(false);
  };
  
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-black/90 to-sketchdojo-bg/90 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sketchdojo-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sketchdojo-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-white/90 backdrop-blur-sm border border-white/10 mb-4">
              User Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            What Our Users Say
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Join thousands of creators who are bringing their manga ideas to life with SketchDojo.
          </p>
        </div>
        
        {/* Testimonial carousel */}
        <div 
          className="max-w-4xl mx-auto relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Testimonial card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 min-h-[300px] md:min-h-[250px] relative overflow-hidden">
            <div className="absolute top-4 right-4 text-sketchdojo-primary/30">
              <Quote className="w-12 h-12 md:w-16 md:h-16 rotate-180" />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative z-10"
              >
                <blockquote className="text-xl md:text-2xl text-white/90 mb-8 italic">
                  "{testimonials[current].quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonials[current].name}</p>
                    <p className="text-white/60">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Background gradient */}
            <div className="absolute -bottom-1/2 -right-1/2 w-[500px] h-[500px] bg-sketchdojo-primary/5 rounded-full blur-3xl"></div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-between items-center mt-8">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handlePrev}
              className="rounded-full border-white/20 text-white hover:border-white/40 hover:bg-white/10 h-10 w-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === current 
                      ? 'bg-sketchdojo-primary scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleNext}
              className="rounded-full border-white/20 text-white hover:border-white/40 hover:bg-white/10 h-10 w-10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
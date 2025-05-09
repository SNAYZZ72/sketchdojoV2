"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import TextareaAutosize from 'react-textarea-autosize';
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from '@/i18n/navigation';
import Image from "next/image";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const fadeInDelay = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Example prompts for the hero section
const examplePrompts = [
  "A high school student discovering they have magical powers during an exam",
  "A detective and AI partner investigating a crime in a cyberpunk Tokyo",
  "A samurai facing off against a demon in a thunderstorm",
  "A slice-of-life scene in a futuristic coffee shop with robots"
];

export const Hero = () => {
  const t = useTranslations('Hero');
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleCreateManga = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      window.location.href = "/studio/editor?prompt=" + encodeURIComponent(prompt);
    }, 2000);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };
  
  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 sm:py-28 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-sketchdojo-bg to-black/90 overflow-hidden">
        {/* Accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sketchdojo-primary/80 via-sketchdojo-accent/80 to-sketchdojo-primary/80 bg-size-200 animate-gradient"></div>
      </div>
      
      {/* Hero content */}
      <motion.div 
        className="container mx-auto text-center z-10 relative pt-16"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <motion.div 
          className="inline-block mb-6 sm:mb-8"
          variants={fadeIn}
        >
          <div className="relative">
            <span className="absolute inset-0 blur-xl bg-sketchdojo-primary/20 rounded-full transform scale-150"></span>
            <span className="relative inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90">
              ✨ {t('tagline')}
            </span>
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-sketchdojo-accent/90"
          variants={fadeIn}
        >
          {t('title')}
        </motion.h1>
        
        <motion.h2 
          className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 sm:mb-16 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2"
          variants={fadeIn}
        >
          {t('subtitle')}
        </motion.h2>
        
        {/* Interactive manga generation preview */}
        <motion.div 
          className="w-full max-w-3xl mx-auto px-4 sm:px-0 mb-8"
          variants={fadeInDelay}
        >
          <div className="relative mb-4">
            <div className="relative prompt-input rounded-2xl shadow-lg shadow-sketchdojo-primary/20 transition-all duration-300 focus-within:shadow-sketchdojo-primary/40 border-2 border-sketchdojo-primary/20 focus-within:border-sketchdojo-primary/40 bg-black/30 backdrop-blur-md">
              <div className="flex items-start">
                <Sparkles className="absolute left-3 sm:left-5 top-4 text-sketchdojo-primary/70 h-5 w-5" />
                
                {/* Auto-expanding textarea */}
                <TextareaAutosize
                  id="main-prompt-input"
                  placeholder={t('inputPlaceholder')}
                  className="w-full min-h-[64px] py-4 pl-10 sm:pl-14 pr-10 sm:pr-12 text-base sm:text-lg rounded-2xl border-none bg-transparent focus-visible:ring-0 text-white placeholder:text-white/50"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Example prompts */}
          <div className="mb-6">
            <div className="text-sm text-white/60 mb-2">{t('tryExamples')}:</div>
            <div className="flex flex-wrap justify-center gap-2">
              {examplePrompts.map((example, index) => (
                <button 
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="text-sm px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all duration-200 backdrop-blur-sm"
                >
                  {example.length > 30 ? `${example.substring(0, 30)}...` : example}
                </button>
              ))}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6">
            <Button 
              size="lg" 
              onClick={handleCreateManga}
              disabled={isGenerating || !prompt.trim()}
              className="w-full sm:w-auto min-w-[180px] bg-gradient-to-r from-sketchdojo-primary to-sketchdojo-accent text-white hover:shadow-lg hover:shadow-sketchdojo-primary/30 transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <span className="mr-2">{t('creating')}</span>
                  <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                </>
              ) : (
                <>
                  {t('createManga')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            
            <Link href="/sign-up">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto min-w-[180px] border-white/20 text-white hover:border-white/40 hover:bg-white/10"
              >
                {t('signup')}
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Preview of manga generation */}
        <motion.div
          className="w-full max-w-4xl mx-auto mt-12 relative"
          variants={fadeInDelay}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative z-10 w-full aspect-[16/9] overflow-hidden rounded-lg border border-white/10 shadow-2xl bg-black/30 backdrop-blur-sm">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image 
                src="/images/manga-preview.png" 
                alt="Manga preview" 
                width={800} 
                height={450} 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <span className="px-4 py-2 bg-sketchdojo-primary/80 text-white rounded-full text-sm font-medium">
                  {t('tryForFree')}
                </span>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-sketchdojo-primary/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-sketchdojo-accent/20 rounded-full blur-xl"></div>
        </motion.div>
        
        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <button 
            onClick={handleScrollToFeatures}
            className="flex flex-col items-center text-white/50 hover:text-white transition-colors duration-300"
            aria-label="Scroll to features"
          >
            <span className="text-sm mb-2">Discover Features</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
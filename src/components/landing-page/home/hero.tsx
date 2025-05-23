"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import TextareaAutosize from 'react-textarea-autosize';
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createProject } from "@/lib/utils/api";

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

export const Hero = () => {
  const t = useTranslations('Hero');
  const isDark = true; // The sketchdojo theme is dark by default
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  
  // Handle project creation
  const handleCreateProject = async () => {
    if (!prompt.trim() || isCreating) return;
    
    setIsCreating(true);
    setError('');
    
    try {
      // Call API to create a new project
      const result = await createProject(prompt);
      
      // Redirect to the project page with the prompt as a URL parameter
      // This ensures the prompt is preserved during navigation
      router.push(`/projects/${result.projectId}?initialPrompt=${encodeURIComponent(prompt)}`);
    } catch (err) {
      console.error('Failed to create project:', err);
      setError('Failed to create project. Please try again.');
      setIsCreating(false);
    }
  };
  
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 sm:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b from-sketchdojo-bg to-black/90 overflow-hidden`}>
        {/* Accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sketchdojo-primary/80 via-sketchdojo-accent/80 to-sketchdojo-primary/80 bg-size-200 animate-gradient"></div>
      </div>
      
      {/* Hero content */}
      <motion.div 
        className="container mx-auto text-center z-10 relative"
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
            <span className={`relative inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90`}>
              ✨ {t('tagline')}
            </span>
          </div>
        </motion.div>
        
        <motion.h1 
          className={`text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-sketchdojo-accent/90`}
          variants={fadeIn}
        >
          {t('title')}
        </motion.h1>
        
        <motion.h2 
          className={`text-lg sm:text-xl md:text-2xl text-white/80 mb-10 sm:mb-16 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2`}
          variants={fadeIn}
        >
          {t('subtitle')}
        </motion.h2>
        
        {/* Prompt Input */}
        <motion.div 
          className="w-full max-w-3xl mx-auto px-4 sm:px-0"
          variants={fadeInDelay}
        >
          <div className="relative">
            <div className={`relative prompt-input rounded-2xl shadow-lg shadow-sketchdojo-primary/20 transition-all duration-300 focus-within:shadow-sketchdojo-primary/40 border-2 border-sketchdojo-primary/20 focus-within:border-sketchdojo-primary/40 bg-black/30 backdrop-blur-md`}>
              <div className="flex items-start">
                <Sparkles className={`absolute left-3 sm:left-5 top-4 text-sketchdojo-primary/70 h-5 w-5`} />
                
                {/* Auto-expanding textarea */}
                <TextareaAutosize
                  id="main-prompt-input"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={t('inputPlaceholder')}
                  className={`w-full min-h-[64px] py-4 pl-10 sm:pl-14 pr-16 sm:pr-20 text-base sm:text-lg rounded-2xl border-none bg-transparent focus-visible:ring-0 text-white placeholder:text-white/50`}
                  disabled={isCreating}
                />
                
                {/* Submit button */}
                <Button
                  onClick={handleCreateProject}
                  disabled={!prompt.trim() || isCreating}
                  className="absolute right-2 top-2 bg-sketchdojo-primary hover:bg-sketchdojo-primary-light text-white rounded-xl h-9 w-9 p-2"
                  aria-label="Create Project"
                >
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Error message */}
          {error && (
            <motion.p 
              className="text-red-400 mt-4 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}
          
          {/* Tagline */}
          <motion.p 
            className="mt-6 text-white/60 text-sm"
            variants={fadeInDelay}
          >
            Generate your webtoon with a single prompt.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};


export default Hero;
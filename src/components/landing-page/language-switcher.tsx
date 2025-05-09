"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Dropdown animation variants
const dropdownVariants = {
  hidden: { 
    opacity: 0, 
    y: -5,
    transition: {
      duration: 0.2
    }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.2
    }
  }
};

// Language options
const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" }
];

export const LanguageSwitcher = () => {
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  
  // Find current language details
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];
  
  return (
    <div className="relative">
      {/* Dropdown trigger button */}
      <button 
        className="flex items-center gap-1.5 py-1.5 px-2 rounded-md text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm hidden sm:inline">{currentLanguage.flag}</span>
        <span className="sr-only">Select language</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
      </button>
      
      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for closing dropdown */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            {/* Dropdown content */}
            <motion.div
              className="absolute right-0 mt-1 w-48 py-1 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 z-50"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              role="listbox"
            >
              {languages.map((language) => (
                <Link
                  key={language.code}
                  href="/"
                  locale={language.code}
                  className={`flex items-center justify-between px-4 py-2 text-sm ${
                    currentLocale === language.code
                      ? 'bg-sketchdojo-primary/10 text-sketchdojo-primary dark:bg-sketchdojo-primary/20 dark:text-white font-medium'
                      : 'text-gray-700 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                  onClick={() => setIsOpen(false)}
                  role="option"
                  aria-selected={currentLocale === language.code}
                >
                  <div className="flex items-center gap-2">
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </div>
                  
                  {/* Current selection indicator */}
                  {currentLocale === language.code && (
                    <svg className="h-4 w-4 text-sketchdojo-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </Link>
              ))}
              
              {/* Additional dropdown content can be added here */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
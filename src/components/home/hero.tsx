"use client";

import React, { useState, useRef, useEffect } from "react";
import { Loader2, Sparkles, Send, Info, BookOpen, Wand2, Paperclip, X, ChevronDown } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TextareaAutosize from 'react-textarea-autosize';
import { useRouter } from "next/navigation";
import { promptCategories } from "@/components/constants/prompt-categories";
import { useBackendGenres } from "@/components/constants/backend-genres";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';


export const Hero = () => {
  const t = useTranslations();
  const [promptValue, setPromptValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const genreDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isMobile = useIsMobile();
  const backendGenres = useBackendGenres();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (genreDropdownRef.current && !genreDropdownRef.current.contains(event.target as Node)) {
        setIsGenreDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Create a new project with the current prompt
  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptValue.trim()) return;
    
    setIsLoading(true);
    
    // Generate a unique ID for the new project
    const projectId = Math.random().toString(36).substring(2, 10);
    
    // Construct the URL with query parameters
    let redirectUrl = `/studio/projects/${projectId}?prompt=${encodeURIComponent(promptValue)}`;
    
    // Add genre if selected
    if (selectedGenre) {
      redirectUrl += `&genre=${encodeURIComponent(selectedGenre)}`;
    }
    
    // Redirect to the new project page
    router.push(redirectUrl);
  };
  
  // Select an example prompt
  const selectExample = (prompt: string) => {
    setPromptValue(prompt);
    // Focus input after selecting an example
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Get the selected genre object
  const getSelectedGenreInfo = () => {
    return backendGenres.find(genre => genre.id === selectedGenre);
  };
  
  const clearPrompt = () => {
    setPromptValue("");
    if (inputRef.current) inputRef.current.focus();
  };
  const handleAttachClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(files[0]);
    }
  };
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const enhancePromptWithAI = async () => {
    if (!promptValue?.trim()) return;
    setIsEnhancing(true);
    try {

    } catch (error) {
      console.error("Error enhancing prompt:", error);

    } finally {
      setIsEnhancing(false);
    }
  };
  
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 sm:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-gray-50/80 to-gray-100/90 dark:from-sketchdojo-bg dark:to-black overflow-hidden">
        {/* Accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-sketchdojo-primary/80 via-sketchdojo-accent/80 to-sketchdojo-primary/80 bg-size-200 animate-gradient"></div>
      </div>
      
      {/* Hero content */}
      <div className="container mx-auto text-center z-10 relative">
        <div className="inline-block mb-6 sm:mb-8">
          <div className="relative">
            <span className="absolute inset-0 blur-xl bg-sketchdojo-primary/20 rounded-full transform scale-150"></span>
            <span className="relative inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full bg-gray-100/70 dark:bg-white/10 backdrop-blur-sm border border-gray-300/50 dark:border-white/20 text-gray-800 dark:text-white/90">
              ✨ {t('Hero.tagline')}
            </span>
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-linear-to-r from-sketchdojo-primary via-gray-700 dark:via-white to-sketchdojo-accent">
          {t('Hero.title')}
        </h1>
        
        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-white/80 mb-10 sm:mb-16 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2">
          {t('Hero.subtitle')}
        </h2>
        
        {/* Prompt Input */}
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-0">
          <form onSubmit={handlePromptSubmit} className="relative">
            <div className="relative prompt-input rounded-2xl shadow-lg shadow-sketchdojo-primary/10 transition-all duration-300 focus-within:shadow-sketchdojo-primary/30 border-2 border-gray-300/20 dark:border-sketchdojo-primary/20 focus-within:border-sketchdojo-primary/30 bg-white/80 dark:bg-black/30 backdrop-blur-md">
              <div className="flex items-start">
                <Sparkles className="absolute left-3 sm:left-5 top-4 text-sketchdojo-primary/60 h-5 w-5" />
                
                {/* Auto-expanding textarea */}
                <TextareaAutosize
                  ref={inputRef}
                  id="main-prompt-input"
                  placeholder={t('Hero.inputPlaceholder')}
                  value={promptValue}
                  onChange={(e) => {
                    setPromptValue(e.target.value);
                    setCharacterCount(e.target.value.length);
                  }}
                  className="w-full min-h-[64px] py-4 pl-10 sm:pl-14 pr-10 sm:pr-12 text-base sm:text-lg rounded-2xl border-none bg-transparent focus-visible:ring-0 text-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/50 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && promptValue?.trim()) {
                      e.preventDefault();
                      handlePromptSubmit(e);
                    }
                  }}
                />
                {promptValue && (
                  <button
                    type="button"
                    onClick={clearPrompt}
                    className="absolute right-3 sm:right-5 top-4 text-gray-400 dark:text-white/50 hover:text-gray-600 dark:hover:text-white transition-colors bg-gray-100/70 dark:bg-black/40 rounded-full p-1 backdrop-blur-sm"
                    aria-label="Clear input"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {/* Genre Selection - Mobile dropdown and desktop buttons with tooltips */}
              <div className="px-3 sm:px-5 py-3 border-t border-gray-200 dark:border-white/10">
                <div className="flex items-center mb-2">
                  <BookOpen className="h-4 w-4 mr-2 text-gray-500 dark:text-white/60" />
                  <span className="text-sm text-gray-600 dark:text-white/70 font-medium">{t('Hero.selectGenre')}:</span>
                </div>
                
                {/* Mobile Genre Dropdown */}
                {isMobile && (
                  <div className="relative" ref={genreDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl ${selectedGenre 
                        ? 'bg-sketchdojo-primary text-white' 
                        : 'bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white'}`}
                    >
                      <div className="flex items-center">
                        {selectedGenre ? (
                          <>
                            {React.createElement(getSelectedGenreInfo()?.icon || BookOpen, { className: "h-4 w-4 mr-2" })}
                            <span>{getSelectedGenreInfo()?.name || "Select Genre"}</span>
                          </>
                        ) : (
                          <>
                            <BookOpen className="h-4 w-4 mr-2" />
                            <span>{t('Hero.selectGenreButton')}</span>
                          </>
                        )}
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isGenreDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isGenreDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-white/10 py-1 animate-in fade-in-50 slide-in-from-top-5">
                        {backendGenres.map((genre) => {
                          const Icon = genre.icon;
                          return (
                            <button
                              key={genre.id}
                              type="button"
                              onClick={() => {
                                setSelectedGenre(genre.id);
                                setIsGenreDropdownOpen(false);
                              }}
                              className={`w-full flex items-center px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-white/10 ${selectedGenre === genre.id ? 'bg-gray-100 dark:bg-white/5 text-sketchdojo-primary dark:text-sketchdojo-primary' : 'text-gray-700 dark:text-white'}`}
                            >
                              <Icon className="h-4 w-4 mr-2" />
                              <div className="flex flex-col">
                                <span className="font-medium">{genre.name}</span>
                                <span className="text-xs text-gray-500 dark:text-white/60 line-clamp-1">{genre.description}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Desktop Genre Buttons */}
                {!isMobile && (
                  <div className="flex flex-wrap gap-2">
                    <TooltipProvider>
                      {backendGenres.map((genre) => {
                        const Icon = genre.icon;
                        return (
                          <Tooltip key={genre.id}>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                onClick={() => setSelectedGenre(genre.id)}
                                className={`flex items-center justify-center h-9 px-3 rounded-full transition-all ${selectedGenre === genre.id 
                                  ? 'bg-sketchdojo-primary text-white shadow-md' 
                                  : 'bg-white/10 dark:bg-white/5 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white hover:bg-white/20 dark:hover:bg-white/10'}`}
                              >
                                <Icon className="h-4 w-4 mr-1.5" />
                                <span>{genre.name}</span>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="max-w-xs p-3">
                              <p className="font-medium mb-2">{genre.name}</p>
                              <p className="text-xs mb-2">{genre.description}</p>
                              <p className="text-xs font-medium mb-1">Narrative Arc:</p>
                              <ol className="text-xs list-decimal pl-4 space-y-1">
                                {genre.arcStructure.map((step, index) => (
                                  <li key={index}>{step}</li>
                                ))}
                              </ol>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </TooltipProvider>
                  </div>
                )}
              </div>
              {imagePreview && (
                <div className="px-3 sm:px-5 py-2 border-t border-gray-200 dark:border-white/10">
                  <div className="relative inline-block">
                    <div className="relative group">
                      <Image
                        src={imagePreview}
                        alt="Attached image"
                        width={80}
                        height={80}
                        className="h-16 sm:h-20 w-auto rounded-lg object-cover border border-gray-300 dark:border-white/20"
                        unoptimized
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-white dark:bg-black/80 rounded-full p-1 text-gray-600 dark:text-white/80 hover:text-gray-800 dark:hover:text-white border border-gray-300 dark:border-white/20"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Controls and metadata */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-500 dark:text-white/50 px-3 sm:px-5 py-3 sm:py-2 border-t border-gray-200 dark:border-white/10 gap-3 sm:gap-0">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <span>
                    {characterCount > 0 ? `${characterCount} characters` : ""}
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAttachClick}
                    className="flex items-center gap-1.5 text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white/90 transition-colors"
                  >
                    <Paperclip className="h-3.5 w-3.5" />
                    <span>{t('Hero.attach')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={enhancePromptWithAI}
                    disabled={isEnhancing || !promptValue?.trim()}
                    className={`flex items-center gap-1.5 transition-colors ${
                      !promptValue?.trim()
                        ? 'text-gray-300 dark:text-white/30 cursor-not-allowed'
                        : isEnhancing
                          ? 'text-sketchdojo-primary/70'
                          : 'text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white/90'
                    }`}
                  >
                    {isEnhancing ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Wand2 className="h-3.5 w-3.5" />
                    )}
                    <span>{t('Hero.enhance')}</span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center cursor-help">
                          <Info className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">{t('Hero.promptTips')}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-white dark:bg-black/90 border-gray-200 dark:border-sketchdojo-primary/50 text-gray-700 dark:text-white max-w-xs p-3">
                        <p className="text-xs">{t('Hero.promptTipsContent')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  {/* Create button */}
                  <button 
                    type="submit" 
                    className={`h-9 px-4 rounded-full transition-all duration-300 flex items-center justify-center ${
                      !promptValue?.trim() ? 'bg-sketchdojo-primary/50 cursor-not-allowed' : 'bg-sketchdojo-primary hover:bg-sketchdojo-primary/90'
                    } text-white`}
                    disabled={isLoading || !promptValue?.trim()}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>{t('Hero.creating')}</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        <span>{selectedGenre ? t('Hero.createGenreManga', {genre: getSelectedGenreInfo()?.name || ""}) : t('Hero.createManga')}</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
          
          {/* Example prompts section */}
          <div className="mt-8 sm:mt-10 flex flex-col items-center space-y-4 sm:space-y-6">
            <h3 className="text-gray-700 dark:text-white/90 font-medium text-sm sm:text-base">{t('Hero.tryExamples')}:</h3>
            
            {promptCategories.map((category, index) => (
              <div key={index} className="w-full">
                <h4 className="text-xs sm:text-sm text-gray-600 dark:text-white/70 mb-2 sm:mb-3 text-center">{category.category}</h4>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {category.examples.map((example) => (
                    <button
                      key={example.id}
                      onClick={() => selectExample(example.prompt)}
                      className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl text-xs sm:text-sm transition-all duration-300 text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 hover:shadow-sm flex items-center"
                    >
                      <span className="mr-1.5 sm:mr-2">{example.icon}</span>
                      {example.text}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-48 sm:w-64 h-48 sm:h-64 bg-sketchdojo-primary/5 dark:bg-sketchdojo-primary/20 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-24 w-48 sm:w-64 h-48 sm:h-64 bg-sketchdojo-accent/5 dark:bg-sketchdojo-accent/20 rounded-full blur-3xl opacity-60 animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 sm:w-32 h-24 sm:h-32 bg-sketchdojo-primary/3 dark:bg-sketchdojo-primary/10 rounded-full blur-xl opacity-60 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 sm:w-20 h-16 sm:h-20 bg-sketchdojo-accent/3 dark:bg-sketchdojo-accent/10 rounded-full blur-xl opacity-40 animate-float animation-delay-2000"></div>
        <div className="absolute inset-0 bg-linear-to-tr from-gray-100/5 to-transparent opacity-30 dark:opacity-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-transparent to-gray-100/50 dark:to-black/90 opacity-70"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 dark:opacity-30"></div>
      </div>
    </section>
  );
};

export default Hero;
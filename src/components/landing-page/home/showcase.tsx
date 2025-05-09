"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, Heart, MessageSquare, Download } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

// Showcase data
const showcaseItems = [
  {
    id: 1,
    title: "Cybernetic Detective",
    style: "Noir Manga",
    prompt: "A cyberpunk detective in a neon-lit Tokyo alley, investigating a crime scene with holographic evidence",
    image: "/images/showcase-1.png",
    author: "Sarah K.",
    likes: 342,
    comments: 24
  },
  {
    id: 2,
    title: "Magical Academy",
    style: "Shonen Manga",
    prompt: "Two young mages practicing elemental magic in a fantasy school courtyard, with magical creatures watching",
    image: "/images/showcase-2.png",
    author: "Mark T.",
    likes: 285,
    comments: 19
  },
  {
    id: 3,
    title: "Samurai's Honor",
    style: "Historical Manga",
    prompt: "A lone samurai facing off against multiple opponents in a bamboo forest during a thunderstorm",
    image: "/images/showcase-3.png",
    author: "Hiroshi Y.",
    likes: 451,
    comments: 38
  },
  {
    id: 4,
    title: "Space Pioneers",
    style: "Sci-Fi Manga",
    prompt: "Astronauts discovering an ancient alien artifact on a distant planet with two suns visible in the sky",
    image: "/images/showcase-4.png",
    author: "Elena R.",
    likes: 387,
    comments: 26
  },
  {
    id: 5,
    title: "Café Chronicles",
    style: "Slice of Life",
    prompt: "A cozy cat café scene with various characters enjoying coffee and petting cats, warm lighting throughout",
    image: "/images/showcase-5.png",
    author: "Tom H.",
    likes: 312,
    comments: 31
  },
  {
    id: 6,
    title: "Monster Hunter",
    style: "Action Manga",
    prompt: "A warrior with a massive sword facing off against a dragon-like creature in a mountain valley",
    image: "/images/showcase-6.png",
    author: "Alex C.",
    likes: 523,
    comments: 47
  }
];

// Featured showcase panel
const featuredShowcase = {
  id: 0,
  title: "Midnight Duel",
  style: "Fantasy Manga",
  prompt: "Two rival mages dueling at midnight on top of a floating crystal island, with magical energy surrounding them and a dragon watching in the background",
  image: "/images/showcase-featured.png", 
  panels: 12,
  author: "Jamie Wong",
  likes: 862,
  comments: 72,
  downloads: 143
};

export const Showcase = () => {
  const [selectedItem, setSelectedItem] = useState(featuredShowcase);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
  };
  
  return (
    <section id="showcase" className="relative py-20 md:py-32 bg-gradient-to-b from-black/90 to-sketchdojo-bg/90">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sketchdojo-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sketchdojo-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-white/90 backdrop-blur-sm border border-white/10 mb-4">
              Created with SketchDojo
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Featured Creations
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Check out these amazing manga panels created by our users with just a few text prompts.
          </p>
        </div>
        
        {/* Featured showcase */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Featured image */}
              <div className="relative aspect-square lg:aspect-auto">
                <Image 
                  src={selectedItem.image} 
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                {/* Manga style tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-sketchdojo-primary/80 text-white text-sm font-medium rounded-full">
                    {selectedItem.style}
                  </span>
                </div>
                
                {/* Mobile title (visible on small screens) */}
                <div className="absolute bottom-4 left-4 right-4 lg:hidden">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
                  <p className="text-white/70 text-sm">By {selectedItem.author}</p>
                </div>
              </div>
              
              {/* Featured details */}
              <div className="p-6 lg:p-8">
                {/* Title & author (hidden on small screens) */}
                <div className="hidden lg:block mb-6">
                  <h3 className="text-3xl font-bold text-white mb-3">{selectedItem.title}</h3>
                  <p className="text-white/70">Created by {selectedItem.author}</p>
                </div>
                
                {/* Prompt */}
                <div className="mb-6">
                  <h4 className="text-white/90 font-medium mb-2 text-lg">Original Prompt:</h4>
                  <div className="bg-white/10 rounded-lg p-4 text-white/80 italic border border-white/10">
                    "{selectedItem.prompt}"
                  </div>
                </div>
                
                {/* Stats */}
                <div className="flex items-center space-x-6 mb-8">
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-sketchdojo-primary mr-2" />
                    <span className="text-white/80">{selectedItem.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-sketchdojo-accent mr-2" />
                    <span className="text-white/80">{selectedItem.comments}</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="h-5 w-5 text-teal-500 mr-2" />
                    <span className="text-white/80">{selectedItem.downloads}</span>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    className="bg-gradient-to-r from-sketchdojo-primary to-sketchdojo-accent text-white hover:shadow-lg hover:shadow-sketchdojo-primary/30"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Manga
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-white/20 text-white hover:border-white/40 hover:bg-white/10"
                  >
                    Try This Prompt
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Showcase gallery */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Community Creations</h3>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-full border-white/20 text-white hover:border-white/40 hover:bg-white/10 h-10 w-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-full border-white/20 text-white hover:border-white/40 hover:bg-white/10 h-10 w-10"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg cursor-pointer"
                onClick={() => handleSelectItem(item)}
              >
                <div className="relative aspect-[4/3]">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Manga style tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-sketchdojo-primary/80 text-white text-xs font-medium rounded-full">
                      {item.style}
                    </span>
                  </div>
                  
                  {/* Title & author */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-white/70 text-sm">By {item.author}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* View all button */}
        <div className="text-center">
          <Button 
            variant="outline"
            className="border-white/20 text-white hover:border-white/40 hover:bg-white/10 px-8"
          >
            View All Creations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
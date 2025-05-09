"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from '@/i18n/navigation';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

// FAQ data
const faqData = [
  {
    question: "What is SketchDojo?",
    answer: "SketchDojo is an AI-powered platform that transforms text descriptions into professional-quality manga art. It allows anyone, regardless of artistic skill, to create manga by simply describing what they want to see."
  },
  {
    question: "Do I need to know how to draw?",
    answer: "No, that's the beauty of SketchDojo! You don't need any drawing skills. Just describe what you want in your manga, and our AI will generate the visuals for you. You can then customize and refine as needed."
  },
  {
    question: "How does the AI generate manga?",
    answer: "Our AI uses advanced machine learning models trained on thousands of manga examples to understand your descriptions and generate appropriate visuals. It considers style, composition, characters, expressions, and more to create manga panels that match your vision."
  },
  {
    question: "Can I edit the generated manga?",
    answer: "Absolutely! SketchDojo provides a range of editing tools to customize your manga after generation. You can adjust layouts, edit dialogue, change characters, modify visual elements, and more to get exactly what you want."
  },
  {
    question: "What styles of manga can I create?",
    answer: "SketchDojo supports various manga styles, from classic black and white to modern colored manga. Depending on your subscription plan, you can access different style options including shonen, shojo, seinen, noir, fantasy, and more."
  },
  {
    question: "How many panels can I create?",
    answer: "The number of panels you can create depends on your subscription plan. Free users can create up to 5 panels per day, Pro users get 100 panels per month, and Ultimate users have unlimited panel creation."
  },
  {
    question: "Can I use my manga commercially?",
    answer: "Yes, all manga created with SketchDojo belongs to you and can be used commercially. Pro and Ultimate plans include commercial usage rights for all generated content."
  },
  {
    question: "What formats can I export my manga in?",
    answer: "SketchDojo supports exporting in various formats including JPG, PNG, and PDF. Ultimate users also have access to high-resolution exports and additional format options."
  },
  {
    question: "Does SketchDojo work on mobile devices?",
    answer: "Yes! SketchDojo is fully responsive and works on smartphones and tablets. We also offer dedicated mobile apps for iOS and Android for an optimized mobile experience."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is easy! Just sign up for a free account, describe your manga idea in the editor, and click 'Create Manga'. You'll have your first manga panel in seconds, and you can build from there."
  }
];

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section id="faq" className="relative py-20 md:py-32 bg-gradient-to-b from-black/90 to-sketchdojo-bg/90">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sketchdojo-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-sketchdojo-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-white/90 backdrop-blur-sm border border-white/10 mb-4">
              Common Questions
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Everything you need to know about SketchDojo and creating your own manga.
          </p>
        </div>
        
        {/* FAQ accordion */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`mb-4 overflow-hidden rounded-xl border ${
                openIndex === index 
                  ? 'border-sketchdojo-primary/30 bg-white/5' 
                  : 'border-white/10 bg-white/5'
              } backdrop-blur-sm transition-all duration-300`}
            >
              {/* Question header */}
              <button 
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                onClick={() => toggleQuestion(index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg md:text-xl font-medium text-white">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="flex-shrink-0 h-5 w-5 text-white/80" />
                ) : (
                  <ChevronDown className="flex-shrink-0 h-5 w-5 text-white/80" />
                )}
              </button>
              
              {/* Answer content */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-white/70">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Still have questions */}
        <div className="mt-16 text-center">
          <p className="text-lg text-white/70 mb-4">
            Still have questions? We're here to help!
          </p>
          <Link 
            href="/contact"
            className="inline-block px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Faq;
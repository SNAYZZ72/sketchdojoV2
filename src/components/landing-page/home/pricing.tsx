"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from '@/i18n/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

// Plan data
const plans = [
  {
    name: "Free",
    description: "Perfect for beginners to try out SketchDojo",
    price: 0,
    period: "forever",
    buttonText: "Start Creating",
    buttonVariant: "outline",
    features: [
      { text: "5 manga panels per day", included: true },
      { text: "Standard AI image generation", included: true },
      { text: "Basic editing tools", included: true },
      { text: "Community access", included: true },
      { text: "1 manga style", included: true },
      { text: "Export to JPG/PNG", included: true },
      { text: "Advanced panel customization", included: false },
      { text: "Character library", included: false },
      { text: "Premium manga styles", included: false },
      { text: "HD export", included: false }
    ]
  },
  {
    name: "Pro",
    description: "For manga enthusiasts who create regularly",
    price: 12,
    period: "month",
    buttonText: "Get Pro",
    buttonVariant: "default",
    popular: true,
    features: [
      { text: "100 manga panels per month", included: true },
      { text: "Enhanced AI image quality", included: true },
      { text: "Advanced editing tools", included: true },
      { text: "Community access", included: true },
      { text: "5 manga styles", included: true },
      { text: "Export to JPG/PNG/PDF", included: true },
      { text: "Advanced panel customization", included: true },
      { text: "Character library (5 characters)", included: true },
      { text: "Premium manga styles", included: false },
      { text: "HD export", included: false }
    ]
  },
  {
    name: "Ultimate",
    description: "For serious creators and professionals",
    price: 29,
    period: "month",
    buttonText: "Go Ultimate",
    buttonVariant: "default",
    features: [
      { text: "Unlimited manga panels", included: true },
      { text: "Highest AI image quality", included: true },
      { text: "Complete editing toolkit", included: true },
      { text: "Priority community access", included: true },
      { text: "All manga styles", included: true },
      { text: "Export to all formats", included: true },
      { text: "Advanced panel customization", included: true },
      { text: "Unlimited character library", included: true },
      { text: "Premium manga styles", included: true },
      { text: "HD export", included: true }
    ]
  }
];

export const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const toggleBillingPeriod = () => {
    setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly');
  };
  
  // Calculate yearly price (20% discount)
  const getPrice = (monthlyPrice: number) => {
    if (monthlyPrice === 0) return 0;
    if (billingPeriod === 'yearly') {
      const yearlyPrice = monthlyPrice * 12 * 0.8; // 20% discount
      return Math.floor(yearlyPrice / 12);
    }
    return monthlyPrice;
  };
  
  return (
    <section id="pricing" className="relative py-20 md:py-32 bg-gradient-to-b from-sketchdojo-bg/90 to-black/90">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-sketchdojo-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sketchdojo-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-white/90 backdrop-blur-sm border border-white/10 mb-4">
              Simple Pricing
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Choose Your Plan
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Whether you're just starting out or creating professionally, we have a plan that's perfect for you.
          </p>
          
          {/* Billing period toggle */}
          <div className="flex items-center justify-center mt-8 mb-12">
            <span className={`text-sm mr-3 ${billingPeriod === 'monthly' ? 'text-white' : 'text-white/50'}`}>
              Monthly
            </span>
            <button
              onClick={toggleBillingPeriod}
              className="relative w-14 h-7 rounded-full bg-white/10 flex items-center transition-colors duration-300"
            >
              <span
                className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-sketchdojo-primary transition-transform duration-300 ${
                  billingPeriod === 'yearly' ? 'translate-x-7' : ''
                }`}
              ></span>
            </button>
            <span className={`text-sm ml-3 ${billingPeriod === 'yearly' ? 'text-white' : 'text-white/50'}`}>
              Yearly <span className="text-green-400 text-xs font-medium">Save 20%</span>
            </span>
          </div>
        </div>
        
        {/* Pricing plans */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.popular 
                  ? 'bg-gradient-to-b from-sketchdojo-primary/20 to-sketchdojo-accent/20 border-2 border-sketchdojo-primary/30 shadow-lg shadow-sketchdojo-primary/20' 
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-sketchdojo-primary to-sketchdojo-accent text-white text-xs font-bold px-4 py-1 transform rotate-45 translate-x-5 translate-y-2 shadow-md">
                    POPULAR
                  </div>
                </div>
              )}
              
              {/* Plan header */}
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-white/70 h-12">
                  {plan.description}
                </p>
                <div className="mt-6 mb-2">
                  <span className="text-4xl font-bold text-white">
                    ${getPrice(plan.price)}
                  </span>
                  <span className="text-white/70 ml-2">
                    {plan.price === 0 ? plan.period : `/${billingPeriod === 'monthly' ? 'month' : 'mo'}`}
                  </span>
                </div>
                {billingPeriod === 'yearly' && plan.price > 0 && (
                  <div className="text-green-400 text-sm">
                    Billed annually (${Math.floor(plan.price * 12 * 0.8)}/year)
                  </div>
                )}
              </div>
              
              {/* Plan features */}
              <div className="p-6">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      ) : (
                        <div className="h-5 w-5 border border-white/20 rounded-full mr-3 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-white/90' : 'text-white/40'}>
                        {feature.text}
                      </span>
                      
                      {/* Info tooltip for specific features */}
                      {(feature.text.includes("Premium") || feature.text.includes("HD")) && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <HelpCircle className="h-4 w-4 text-white/40 ml-2" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-sm">
                                {feature.text.includes("Premium") 
                                  ? "Access to professional manga styles including noir, watercolor, vintage, and more" 
                                  : "Export your manga in high resolution for printing and professional use"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </li>
                  ))}
                </ul>
                
                {/* Plan CTA button */}
                <Link 
                  href={plan.price === 0 ? "/sign-up" : `/sign-up?plan=${plan.name.toLowerCase()}`}
                  className="block w-full"
                >
                  <Button 
                    variant={plan.buttonVariant as any}
                    className={`w-full py-6 text-lg ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-sketchdojo-primary to-sketchdojo-accent text-white hover:shadow-lg hover:shadow-sketchdojo-primary/30' 
                        : plan.buttonVariant === 'outline' 
                          ? 'border-white/20 text-white hover:border-white/40 hover:bg-white/10' 
                          : ''
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enterprise section */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Need a Custom Plan?
              </h3>
              <p className="text-white/70">
                For teams, studios, and enterprise solutions, contact us for a plan tailored to your specific needs.
              </p>
            </div>
            <Link href="/contact">
              <Button 
                variant="outline"
                className="whitespace-nowrap border-white/20 text-white hover:border-white/40 hover:bg-white/10"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Satisfaction guarantee */}
        <div className="mt-12 text-center">
          <p className="text-white/70">
            <span className="text-green-400">✓</span> 14-day money-back guarantee • <span className="text-green-400">✓</span> No credit card required for free plan • <span className="text-green-400">✓</span> Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
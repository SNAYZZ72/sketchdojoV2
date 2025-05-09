"use client";

import React from "react";
import { Link } from '@/i18n/navigation';
import { Instagram, Twitter, Youtube, Facebook, Github } from "lucide-react";
import Image from "next/image";
import LanguageSwitcher from '@/components/landing-page/language-switcher';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Footer link sections
const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/#pricing" },
      { name: "How It Works", href: "/#how-it-works" },
      { name: "Showcase", href: "/#showcase" },
      { name: "Updates", href: "/blog" }
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Tutorials", href: "/resources/tutorials" },
      { name: "Documentation", href: "/docs" },
      { name: "Blog", href: "/blog" },
      { name: "Support", href: "/support" },
      { name: "Community", href: "/community" }
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" }
    ]
  }
];

// Social media links
const socialLinks = [
  { name: "Twitter", icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com/sketchdojo" },
  { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com/sketchdojo" },
  { name: "YouTube", icon: <Youtube className="w-5 h-5" />, href: "https://youtube.com/sketchdojo" },
  { name: "Facebook", icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com/sketchdojo" },
  { name: "GitHub", icon: <Github className="w-5 h-5" />, href: "https://github.com/sketchdojo" }
];

export const Footer = () => {
  return (
    <footer className="relative bg-black pt-16 pb-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-sketchdojo-primary/5 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-sketchdojo-accent/5 rounded-full blur-3xl opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Footer main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center group mb-6">
              <div className="relative overflow-hidden">
                <Image
                  src="/logo/logo.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="mr-3 transform transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-sketchdojo-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </div>
              <span className="font-italianno text-3xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 group-hover:from-sketchdojo-primary group-hover:to-sketchdojo-accent transition-all duration-300">
                SketchDojo<span className="text-sketchdojo-primary">.ai</span>
              </span>
            </Link>
            
            <p className="text-white/70 mb-6 max-w-md">
              SketchDojo transforms your text descriptions into professional manga art with AI. No drawing skills required — just your imagination.
            </p>
            
            {/* Newsletter signup */}
            <div>
              <p className="text-white font-medium mb-3">Join our newsletter</p>
              <div className="flex max-w-sm">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-white/10 border border-white/20 rounded-l-md px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-sketchdojo-primary/50 flex-grow"
                />
                <Button 
                  className="rounded-l-none bg-gradient-to-r from-sketchdojo-primary to-sketchdojo-accent text-white"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          {/* Footer links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-medium mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-white/70 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="bg-white/10 my-8" />
        
        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-white/50 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SketchDojo AI. All rights reserved.
          </div>
          
          {/* Language switcher */}
          <div className="mb-4 md:mb-0">
            <LanguageSwitcher />
          </div>
          
          {/* Social links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-200"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
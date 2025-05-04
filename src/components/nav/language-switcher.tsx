"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Link, getPathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const currentLocale = useLocale();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-600 dark:text-white/80" />
      <div className="flex gap-1">
        <Link 
          href="/" 
          locale="en" 
          className={`px-2 py-1 text-xs rounded-md transition-all ${currentLocale === 'en' 
            ? 'bg-sketchdojo-primary/10 text-sketchdojo-primary dark:bg-sketchdojo-primary/20 dark:text-white font-medium' 
            : 'text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10'}`}
        >
          EN
        </Link>
        <Link 
          href="/" 
          locale="fr" 
          className={`px-2 py-1 text-xs rounded-md transition-all ${currentLocale === 'fr' 
            ? 'bg-sketchdojo-primary/10 text-sketchdojo-primary dark:bg-sketchdojo-primary/20 dark:text-white font-medium' 
            : 'text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10'}`}
        >
          FR
        </Link>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
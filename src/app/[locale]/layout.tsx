import React from "react";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { AuthProvider } from '@/providers/auth-provider'
import type { Metadata } from 'next'
import { Poppins, Italianno } from 'next/font/google'
import { ThemeProvider } from '@/providers/theme-provider'
import '../styles/globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

const italianno = Italianno({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-italianno',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "SketchDojo.ai",
  description: "Create your own Manga with AI",
  icons: {
    icon: '/logo/logo.ico',
  },
}
// This helps with dynamic params handling
export const dynamicParams = true;

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate the locale
    if (!locale || !hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Load messages for the current locale
    let messages;
    try {
        messages = (await import(`../../../messages/${locale}.json`)).default;
    } catch {
        // If messages cannot be loaded, call notFound
        notFound();
    }

    return (
        <html lang="en" className={`${poppins.variable} ${italianno.variable}`} suppressHydrationWarning>
        <body className={`${poppins.className}`}>
         <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <AuthProvider>{children}</AuthProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    );
}


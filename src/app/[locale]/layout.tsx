import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import React from "react";

// This helps with dynamic params handling
export const dynamicParams = true;

export default async function LocaleLayout({
                                               children,
                                               params
                                           }: {
    children: React.ReactNode;
    params: {locale: string};
}) {
    // Use Promise.resolve to properly handle params in an async context
    const resolvedParams = await Promise.resolve(params);
    const locale = resolvedParams.locale;

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
        <NextIntlClientProvider locale={locale} messages={messages}>
            <main className="h-full">
                {children}
            </main>
        </NextIntlClientProvider>
    );
}
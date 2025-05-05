import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Authentication - SketchDojo',
    description: 'Sign in or create an account for SketchDojo',
  };

export default function AuthFullscreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-sketchdojo-bg">
      {children}
    </div>
  );
}
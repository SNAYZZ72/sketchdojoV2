// src/app/[locale]/(main)/projects/[id]/layout.tsx
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SketchDojo - Project',
  description: 'Create stunning manga and webtoons with AI',
};

export function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      {children}
    </div>
  );
}
export default ProjectLayout;
// src/components/constants/backend-genres.ts
// Defines manga genres from the backend configuration

import { BookOpen, Sword, Skull, Heart } from "lucide-react";
import { useTranslations } from 'next-intl';

export interface BackendGenre {
  id: string;
  nameKey: string; // Translation key for the genre name
  descriptionKey: string; // Translation key for the genre description
  icon: React.ElementType;
  arcStructure: string[];
}

// Define the base genre data structure
export const backendGenresData: BackendGenre[] = [
  {
    id: "romance",
    nameKey: "Genres.romance.name",
    descriptionKey: "Genres.romance.description",
    icon: Heart,
    arcStructure: [
      "Rencontre et présentation des personnages",
      "Développement de la relation et premiers obstacles",
      "Crise ou séparation",
      "Réconciliation ou fin tragique"
    ]
  },
  {
    id: "fantasy",
    nameKey: "Genres.fantasy.name",
    descriptionKey: "Genres.fantasy.description",
    icon: BookOpen,
    arcStructure: [
      "Découverte du monde ou des pouvoirs",
      "Quête ou apprentissage",
      "Affrontement avec l'antagoniste ou révélation majeure",
      "Résolution et retour ou nouveau départ"
    ]
  },
  {
    id: "action",
    nameKey: "Genres.action.name",
    descriptionKey: "Genres.action.description",
    icon: Sword,
    arcStructure: [
      "Incident déclencheur ou crime initial",
      "Enquête, poursuite ou montée des enjeux",
      "Confrontation finale ou twist",
      "Dénouement ou ouverture sur une suite"
    ]
  },
  {
    id: "horreur",
    nameKey: "Genres.horreur.name",
    descriptionKey: "Genres.horreur.description",
    icon: Skull,
    arcStructure: [
      "Installation de l'ambiance et premiers signes de danger",
      "Montée de la menace et révélations inquiétantes",
      "Affrontement avec la source de l'horreur",
      "Résolution ambiguë ou fin ouverte"
    ]
  }
];

// Create a hook to get translated genres
export function useBackendGenres() {
  const t = useTranslations();
  
  // Map the base data to include translated name and description
  const backendGenres = backendGenresData.map(genre => ({
    ...genre,
    name: t(genre.nameKey),
    description: t(genre.descriptionKey)
  }));
  
  return backendGenres;
}

// For backward compatibility, export the backendGenres directly
// This ensures existing code that imports backendGenres still works
export const backendGenres = backendGenresData.map(genre => ({
  ...genre,
  // Default to English values for static contexts where useTranslations can't be used
  name: genre.id.charAt(0).toUpperCase() + genre.id.slice(1),
  description: ""
}));
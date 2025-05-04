// src/components/constants/prompt-categories.ts
// Defines categories and vivid, user-ready example prompts for the Hero component

export interface PromptExample {
  id: string;
  text: string;
  icon: string;
  prompt: string;
}

export interface PromptCategory {
  category: string;
  examples: PromptExample[];
}

export const promptCategories: PromptCategory[] = [
  {
      category: "Character-Focused",
      examples: [
          {
              id: "hero",
              text: "Hero",
              icon: "🦸",
              prompt: `Scene Description: A courageous teenage hero with wind-tousled black hair and a crimson headband channels a blazing blue aura as he saves his village’s children from a rampaging sand golem under a stormy sky.\
Mood & Lighting: Dramatic chiaroscuro with flashes of lightning illuminating swirling desert dust.\
Style & Composition: Manga-inspired dynamic pose, low-angle shot to emphasize heroism, motion blur on hair and aura.\
Color Palette: Warm earth tones for sand, contrasted by cool cyan for magic and flashes of white lightning.`
          },
          {
              id: "villain",
              text: "Villain",
              icon: "😈",
              prompt: `Scene Description: A shadowy figure in an obsidian cloak—face hidden behind an ornate bone mask—raises a scepter emitting sickly green sparks in the moonlit ruins, lips curling into a triumphant grin.\
Mood & Lighting: High-contrast moonlight creates deep shadows; eerie glow from scepter casts ominous highlights.\
Style & Composition: Cinematic close-up on mask and hand; Dutch angle for unsettling effect; fine linework for texture.\
Color Palette: Monochrome blacks and grays with neon green accents on the scepter sparks.`
          },
          {
              id: "romance",
              text: "Romance",
              icon: "❤️",
              prompt: `Scene Description: Under a canopy of drifting pink cherry blossoms in spring twilight, two shy high school students gently reach for each other’s hands, hearts racing as golden lantern light flickers across their hopeful faces.\
Mood & Lighting: Soft romantic glow, gentle backlight creating a halo around petals.\
Style & Composition: Wide shot framing blossoms and characters symmetrically; shallow depth-of-field to focus on hands.\
Color Palette: Pastel pinks, warm ambers, and soft purples.`
          }
      ]
  },
  {
      category: "Settings & Scenarios",
      examples: [
          {
              id: "battle",
              text: "Epic Battle",
              icon: "⚔️",
              prompt: `Scene Description: On a jagged mountain peak crackling with lightning, armored warriors wield ethereal blades of fire and ice clash in mid-air, magic shattering rock and sending shockwaves across the skies.\
Mood & Lighting: Stormy, high-contrast lighting with sparks and glowing magic illuminating combatants.\
Style & Composition: Panoramic wide shot capturing scale; dramatic foreshortening on weapons; dynamic angles.\
Color Palette: Fiery oranges and icy blues against a steel-gray sky.`
          },
          {
              id: "school",
              text: "Magical Academy",
              icon: "🏫",
              prompt: `Scene Description: In a grand hall of towering stained-glass windows, a nervous student’s eyes glow violet as arcane runes swirl from his fingertips, drawing astonished gasps from classmates.\
Mood & Lighting: Warm sunlight filtered through colored glass casts rainbow patterns; soft indoor shadows.\
Style & Composition: Mid-shot focusing on student; over-the-shoulder perspective showing classmates; detailed architectural elements.\
Color Palette: Jewel tones for glass, earthy browns for wood, vibrant violet for magic.`
          },
          {
              id: "fantasy",
              text: "Enchanted Realm",
              icon: "🏰",
              prompt: `Scene Description: A bioluminescent forest where towering mushrooms glow teal, floating isles drift above crystalline rivers, and a unicorn with a silver mane drinks from a shimmering pool.\
Mood & Lighting: Ethereal glow, soft ambient light with gentle lens flares.\
Style & Composition: Vertical portrait to emphasize height; magical particles floating; reflection effects in water.\
Color Palette: Cool teals and purples with silver accents.`
          },
          {
              id: "scifi",
              text: "Sci-Fi City",
              icon: "🚀",
              prompt: `Scene Description: In neon-lit skyways of a sprawling megacity, sleek hovercars zip past towering spires adorned with holographic billboards, while cyborg couriers weave through crowds in glowing exosuits.\
Mood & Lighting: Vibrant neon reflections on wet streets; dynamic light trails.\
Style & Composition: Wide-angle lens distortion; layered depth with foreground courier, midground traffic, and background skyline.\
Color Palette: Electric blues, hot pinks, and metallic silvers.`
          }
      ]
  },
  {
      category: "Styles & Techniques",
      examples: [
          {
              id: "action",
              text: "Dynamic Action",
              icon: "💥",
              prompt: `Scene Description: Illustrate two martial artists locked in a mid-air collision: limbs blurred by sheer velocity, explosive shockwaves radiating outward, and debris flying in frozen impact frames.\
Mood & Lighting: Intense contrast with rim lighting on muscles; motion blur streaks.\
Style & Composition: Split-panel design showing anticipation and impact; diagonal lines for energy flow.\
Color Palette: Bold primary colors with stark whites for highlights.`
          },
          {
              id: "chibi",
              text: "Chibi Comedy",
              icon: "🥰",
              prompt: `Scene Description: Draw tiny, round-cheeked chibi characters with oversized heads stumbling over banana peels in a slapstick gag, eyes popping wide and tears streaming in exaggerated comic fashion.\
Mood & Lighting: Bright, flat colors with minimal shading for cartoonish effect.\
Style & Composition: Single-frame gag panel; speech bubbles with energetic doodles; minimalist backgrounds.\
Color Palette: Cheerful yellows, soft pastels, and crisp blacks for outlines.`
          },
          {
              id: "cinematic",
              text: "Cinematic Sequence",
              icon: "🎬",
              prompt: `Scene Description: Storyboard a dramatic character evolution: begin with a close-up on doubt flickering in her eyes, shift to an extreme low-angle as she draws her sword, and end with a sweeping wide shot of her triumphant pose against a sunset sky.\
Mood & Lighting: Gradual shift from cool blues to warm golden tones; dramatic rim lighting.\
Style & Composition: Three-panel sequence with consistent framing; use of leading lines and perspective shifts.\
Color Palette: Transition from moody teals to rich oranges and golds.`
          }
      ]
  }
];

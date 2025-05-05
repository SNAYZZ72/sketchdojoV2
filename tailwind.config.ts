import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'sans-serif'
        ],
        // Add Italianno for stylistic elements
        italianno: [
          'Italianno', 
          'cursive'
        ]
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        floating: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
          '100%': { transform: 'translateY(0) rotate(0deg)' }
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        scrollReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(86, 103, 255, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(86, 103, 255, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fadeIn': 'fadeIn 0.5s ease-out',
        'scaleIn': 'scaleIn 0.3s ease-out',
        'floating': 'floating 6s ease-in-out infinite',
        'floating-slow': 'floating 8s ease-in-out infinite',
        'floating-fast': 'floating 4s ease-in-out infinite',
        'scroll': 'scroll 40s linear infinite',
        'scroll-reverse': 'scrollReverse 40s linear infinite',
        'pulse': 'pulse 3s ease-in-out infinite',
        'pulse-slow': 'pulse 8s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'gradient': 'gradient 6s ease infinite',
        'gradient-slow': 'gradient 12s ease infinite'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'text-gradient': 'linear-gradient(to right, var(--color-sketchdojo-primary), var(--color-sketchdojo-accent))',
        'primary-gradient': 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
        'hover-primary-gradient': 'linear-gradient(90deg, var(--color-primary-dark) 0%, var(--color-secondary-dark) 100%)',
        'background-gradient': 'linear-gradient(180deg, var(--color-sketchdojo-bg) 0%, var(--color-sketchdojo-bg-light) 100%)'
      }
    }
  },
  plugins: [
    require("tailwindcss-animate")
  ],
} satisfies Config;

export default config;
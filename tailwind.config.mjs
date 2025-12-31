import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // shadcn/ui colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Neumorphic color palette
        neubg: {
          light: "#e0e5ec",
          DEFAULT: "#d1d9e6",
          dark: "#b8c2cc",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        // Neumorphic shadows
        "neu-sm": "2px 2px 4px rgba(0,0,0,0.1), -2px -2px 4px rgba(255,255,255,0.8)",
        "neu": "4px 4px 8px rgba(0,0,0,0.1), -4px -4px 8px rgba(255,255,255,0.8)",
        "neu-lg": "8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.8)",
        "neu-xl": "12px 12px 24px rgba(0,0,0,0.12), -12px -12px 24px rgba(255,255,255,0.9)",
        "neu-inset": "inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.8)",
        "neu-inset-lg": "inset 4px 4px 8px rgba(0,0,0,0.1), inset -4px -4px 8px rgba(255,255,255,0.8)",
        // Skeuomorphic shadows
        "skeuo-soft": "0 2px 4px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.05)",
        "skeuo-raised": "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
        "skeuo-deep": "0 10px 20px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.1)",
        "skeuo-lifted": "0 8px 16px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)",
      },
      backdropBlur: {
        glass: "12px",
      },
      backgroundImage: {
        "leather-texture": "url('/textures/leather.svg')",
        "paper-texture": "url('/textures/paper.svg')",
        "wood-grain": "url('/textures/wood.svg')",
      },
      fontFamily: {
        sans: ["Inter var", ...fontFamily.sans],
        display: ["Playfair Display", "Georgia", "serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        lift: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-4px)" },
        },
        press: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.98)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        lift: "lift 0.3s ease-in-out",
        press: "press 0.2s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

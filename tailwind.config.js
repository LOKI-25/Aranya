const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./*.{js,ts,jsx,tsx,mdx}",
],

  theme: {
    extend: {
      colors: {
        // Brand colors
        "brand-orange": "#E87C51",
        "brand-green": "#0A2725",
        "brand-white": "#FFFFFF",

        // Primary palette
        "rich-teal": "#0A2725",
        "light-teal": "#2A4745",
        "soft-peach": "#E87C51",
        "pale-peach": "#F5D6C6",
        "muted-coral": "#C65D35",
        "light-coral": "#FFB69B",

        // Neutral palette
        "off-white": "#EDF6F9",
        "pure-white": "#FFFFFF",
        "dark-slate": "#2C3E50",
        "light-slate": "#7F8C8D",

        // System colors
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
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        serif: ["Merriweather", "serif"],
      },
      fontSize: {
        h1: ["2.625rem", { lineHeight: "1.3", letterSpacing: "0.5px" }],
        h2: ["2rem", { lineHeight: "1.4", letterSpacing: "0.5px" }],
        h3: ["1.625rem", { lineHeight: "1.4", letterSpacing: "0.5px" }],
        body: ["1.125rem", { lineHeight: "1.5", letterSpacing: "0.5px" }],
        small: ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.5px" }],
      },
      animation: {
        blob: "blob 7s infinite",
        "slow-blob": "slow-blob 15s infinite", // Added slower animation
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        "slow-blob": {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backdropFilter: {
        none: "none",
        blur: "blur(20px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  safelist: ["backdrop-blur"],
}

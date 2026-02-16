import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        canvas: "var(--canvas)",
        accent: {
          primary: "var(--accent-primary)",
          peach: "var(--accent-peach)",
          coral: "var(--accent-coral)",
          teal: "var(--accent-teal)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        border: {
          light: "var(--border-light)",
          medium: "var(--border-medium)",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(13, 37, 63, 0.06)",
        "soft-md": "0 4px 12px rgba(13, 37, 63, 0.08)",
        "soft-lg": "0 8px 24px rgba(13, 37, 63, 0.1)",
      },
      borderRadius: {
        "design-sm": "8px",
        "design-md": "12px",
        "design-lg": "16px",
        "design-xl": "20px",
        "design-2xl": "24px",
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0B0826",
        lavender: "#E2E0F4",
        cerise: "#D81B60",
        "cerise-hover": "#AD144B",
        surface: "#14113d",
      },
      backgroundImage: {
        "gradient-main": "radial-gradient(circle at top left, #1A164D 0%, #0B0826 100%)",
        "accent-gradient": "linear-gradient(135deg, #D81B60 0%, #7B1FA2 100%)",
      },
      boxShadow: {
        'glow-cerise': '0 0 20px rgba(216, 27, 96, 0.2)',
        'inner-glow': 'inset 0 0 10px rgba(226, 224, 244, 0.05)',
      }
    },
  },
  plugins: [],
};
export default config;

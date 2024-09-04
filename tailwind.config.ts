import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent:'transparent',
      white:'#ffffff',
      gray: {
        50: "#EBEBEB",
        100: "#D6D6D6",
        200: "#C2C2C2",
        300: "#ADADAD",
        400: "#999999",
        500: "#858585",
        600: "#707070",
        700: "#5C5C5C",
        800: "#474747",
        900: "#333333",
      },
      green:{
        50:"#F2FBF3",
        100:"#E5F6E7",
        200:"#D7F2DC",
        300:"#CAEDD0",
        400:"#BDE9C4",
        500:"#B0E5B8",
        600:"#A3E0AC",
        700:"#95DCA1",
        800:"#88D795",
        900:"#7BD389",
      },
      blue:{
        50:"#ECF0F7",
        100:"#DAE0EF",
        200:"#C7D1E6",
        300:"#B4C1DE",
        400:"#A2B2D6",
        500:"#8FA2CE",
        600:"#7C93C6",
        700:"#6983BD",
        800:"#5774B5",
        900:"#4464AD",
      }
    },
    transitionTimingFunction: {
        'out-quint': 'cubic-bezier(0.280, 0.840, 0.420, 1)',
        'in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'in-out-expo': 'cubic-bezier(1, 0, 0, 1)',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
          zoom: {
              '0%': { 'scale': '100%' },
              '50%': { 'scale': '103%' },
              '100%': { 'scale': '100%' },
          }
      },
      animation: {
        'spin-slow': 'spin 20s cubic-bezier(0.280, 0.840, 0.420, 1) infinite both',
        'zoom': 'zoom 5s cubic-bezier(0.280, 0.840, 0.420, 1) infinite both',
      }
    }
  },
  plugins: [],
};
export default config;

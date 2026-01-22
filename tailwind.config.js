/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0f172a', // Deep Blue-Gray "Void"
        secondary: '#1e293b', // Charcoal "Surface"
        accent: '#38bdf8', // Bright Teal "Neon"
        retro: '#6366f1', // Indigo "Retro Glow"
        textPrimary: '#f1f5f9', // Off-White
        textSecondary: '#94a3b8', // Muted Blue-Gray
        borderSubtle: '#334155',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'monospace'], // Engineering aesthetic
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    }
  },
  plugins: [],
}

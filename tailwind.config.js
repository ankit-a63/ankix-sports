/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#070B14',
          navy: '#0B1120',
          charcoal: '#10192D',
          surface: '#152238',
          card: '#111A2E',
          border: '#1E2D4A',
          borderLight: '#2A3C5F',
          emerald: '#00F59B',
          emeraldHover: '#00D984',
          emeraldDark: '#059669',
          cyan: '#00D8F6',
          cyanGlow: 'rgba(0, 216, 246, 0.25)',
          muted: '#8A99AD',
          subtle: '#52627A',
          live: '#00F59B',
          red: '#EF4444',
          gold: '#F59E0B',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Roboto Mono', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'emerald-glow': '0 0 25px -5px rgba(0, 245, 155, 0.4)',
        'emerald-glow-lg': '0 0 45px -5px rgba(0, 245, 155, 0.35)',
        'cyan-glow': '0 0 25px -5px rgba(0, 216, 246, 0.35)',
        'card-elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'radial-gradient-hero': 'radial-gradient(circle at 50% 20%, rgba(0, 245, 155, 0.12) 0%, rgba(7, 11, 20, 0.95) 70%)',
        'stadium-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      keyframes: {
        pulseLive: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'pulse-live': 'pulseLive 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

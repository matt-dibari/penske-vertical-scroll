/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Newsreader', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      colors: {
        penske: {
          blue: '#003366',
          yellow: '#FFCC00',
          navy: '#001F3F',
          light: '#E6F0FA',
        },
        cisco: {
          cyan: '#049FD9',
          navy: '#0D274D',
          sky: '#64BBE3',
          dark: '#0B1B30',
        },
        google: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC05',
          green: '#34A853',
          gemini: '#8E75FF',
          deep: '#1A73E8',
        },
        willow: {
          primary: '#E06D53',
          warm: '#F48B67',
          soft: '#FDEEE9',
          glow: '#FFA07A',
        },
      },
      boxShadow: {
        'layer': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 20px 1px rgba(0,0,0,0.03)',
        'layer-active': '0 30px 60px -12px rgba(66, 133, 244, 0.15), 0 10px 30px -5px rgba(0, 0, 0, 0.1)',
        'card-3d': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow-google': '0 0 30px -5px rgba(66, 133, 244, 0.3)',
        'glow-cisco': '0 0 30px -5px rgba(4, 159, 217, 0.3)',
        'glow-willow': '0 0 30px -5px rgba(224, 109, 83, 0.35)',
      },
      keyframes: {
        pulseWave: {
          '0%, 100%': { transform: 'scaleY(0.4)', opacity: '0.6' },
          '50%': { transform: 'scaleY(1.3)', opacity: '1' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        flowPacket: {
          '0%': { transform: 'translateY(0%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },
      animation: {
        'pulse-wave': 'pulseWave 1.4s ease-in-out infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'flow-packet': 'flowPacket 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

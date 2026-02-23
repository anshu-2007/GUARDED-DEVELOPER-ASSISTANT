/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B1220',
          800: '#151E32',
          700: '#1E293B',
        },
        electric: {
          500: '#2563EB',
          400: '#3B82F6',
        },
        cyan: {
          400: '#22D3EE',
          500: '#06B6D4',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #22D3EE' },
          '100%': { boxShadow: '0 0 20px #22D3EE, 0 0 10px #2563EB' },
        }
      }
    },
  },
  plugins: [],
}

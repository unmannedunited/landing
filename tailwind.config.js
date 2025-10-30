/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'syncopate': ['var(--font-syncopate)', 'sans-serif'],
        'nunito': ['var(--font-nunito-sans)', 'sans-serif'],
        'thabit': ['Thabit', 'sans-serif'],
        'coulson': ['Coulson', 'serif'],
      },
      colors: {
        'background': '#F7F7F7',
        'foreground': '#1E1E1E',
        'blue': '#174F94',
        'darkblue': '#0F407E',
        'palegray': '#CBCBCB',
        'black': '#000000',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'opacity': 'opacity',
        'shadow': 'box-shadow',
        'transform': 'transform',
      },
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-expo': 'cubic-bezier(1, 0, 0, 1)',
        'in-circ': 'cubic-bezier(0.6, 0.04, 0.98, 0.34)',
        'out-circ': 'cubic-bezier(0.08, 0.82, 0.17, 1)',
        'in-out-circ': 'cubic-bezier(0.85, 0, 0.15, 1)',
        'in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
        'out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
        'slide-in-up': 'slideInUp 0.5s ease-out',
        'slide-in-down': 'slideInDown 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'scale-out': 'scaleOut 0.3s ease-in',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'flicker': 'flicker 1.5s ease-in',
        'flicker2': 'flicker2 2s ease-in',
        'flicker3': 'flicker3 2.5s ease-in',
        'loading': 'loading 1.5s ease-in-out infinite',
        'loading2': 'loading2 1.5s ease-in-out infinite',
        'loading3': 'loading3 1.5s ease-in-out infinite',
        'slide': 'slide 2.5s linear infinite',
        'marquee': 'marquee 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(23, 79, 148, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(23, 79, 148, 0.8)' },
        },
        flicker: {
          '0%': { opacity: 0 },
          '1%': { opacity: 1 },
          '8%': { opacity: 0.2 },
          '10%': { opacity: 0.2 },
          '12%': { opacity: 1 },
          '14%': { opacity: 0.2 },
          '24%': { opacity: 0.2 },
          '29%': { opacity: 1 },
          '35%': { opacity: 0.2 },
          '72%': { opacity: 0.2 },
          '100%': { opacity: 1 },
        },

        flicker2: {
          '0%': { opacity: 0 },
          '10%': { opacity: 0 },
          '11%': { opacity: 1 },
          '18%': { opacity: 0.2 },
          '20%': { opacity: 0.2 },
          '22%': { opacity: 1 },
          '24%': { opacity: 0.2 },
          '34%': { opacity: 0.2 },
          '39%': { opacity: 1 },
          '45%': { opacity: 0.2 },
          '82%': { opacity: 0.2 },
          '100%': { opacity: 1 },
        },
        flicker3: {
          '0%': { opacity: 0 },
          '20%': { opacity: 0 },
          '21%': { opacity: 1 },
          '28%': { opacity: 0.2 },
          '30%': { opacity: 0.2 },
          '32%': { opacity: 1 },
          '34%': { opacity: 0.2 },
          '44%': { opacity: 0.2 },
          '49%': { opacity: 1 },
          '55%': { opacity: 0.2 },
          '92%': { opacity: 0.2 },
          '100%': { opacity: 1 },
        },

        loading: {
          '0%': { opacity: 0.2 }, '30%': { opacity: 1 },  
          '90%': { opacity: 1 }, '100%': { opacity: 0.2 }
        },
        loading2: {
          '0%': { opacity: 0.2 }, '10%': { opacity: 0.2 }, '40%': { opacity: 1 }, 
          '80%': { opacity: 1 }, '90%': { opacity: 0.2 }, '100%': { opacity: 0.2 }
        },
        loading3: {
          '0%': { opacity: 0.2 }, '20%': { opacity: 0.2 }, '50%': { opacity: 1 }, 
          '70%': { opacity: 1 }, '80%': { opacity: 0.2 }, '100%': { opacity: 0.2 }
        },

        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }

      },
    },
  },
  plugins: [],
}

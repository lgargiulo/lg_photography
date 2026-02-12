import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#121212',
        'bg-elevated': '#1a1a1a',
        'bg-card': '#1f1f1f',
        'bg-hover': '#242424',
        text: '#d4d4d4',
        'text-muted': '#666666',
        'text-light': '#999999',
        accent: '#7c98b3',
        'accent-light': '#a0b8ce',
        'accent-dark': '#5d7a94',
        white: '#ffffff',
        border: '#2a2a2a',
        'border-light': '#353535',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'photo': '0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 15px 30px -15px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;

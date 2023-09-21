/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      mdx600: "600px",
      mdx700: "700px",
      mdx800: "800px",
      mdx900: "900px",
      mdx1000: "1000px",
      mdx1100: "1100px",
      mdx1200: "1200px",
      mdx1300: "1300px",
      mdx1400: "1400px",
      mdx1500: "1500px",
      mdx1600: "1600px",
      mdx1700: "1700px",
      mdx1800: "1800px",
      mdx1900: "1900px",
      mdx2000: "2000px",
    }
  },
  plugins: [],
}

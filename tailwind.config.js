   /** @type {import('tailwindcss').Config} */
   module.exports = {
    content: [
      "./App.{js,jsx,ts,tsx}", // 根据你的项目结构调整路径
      "./app/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
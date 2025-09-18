const path = require("path")

// get the path of the dependency "@minimaui/ui"
const minimauiUI = path.join(
  path.dirname(require.resolve("@minimaui/ui")),
  "**/*.{js,jsx,ts,tsx}"
)

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@minimaui/ui-preset")],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", minimauiUI],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
}

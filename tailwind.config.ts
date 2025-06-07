import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{html,js,jsx,ts,tsx}", "./components/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config

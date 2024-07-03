import type { Config } from "tailwindcss";
import { safelistConfig } from "./styles/tailwind-safelist";

const config: Config = {
	important: true,
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./modules/**/*.{js,ts,jsx,tsx,mdx}",
	],
	// safelist: safelistConfig,
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
		fontFamily: {
			// roboto: "var(--font-roboto)",
		},
	},
	plugins: [],
};

module.exports = config;

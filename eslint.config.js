const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
	js.configs.recommended, // ESLint's recommended base configuration
	{
		files: ["**/*.js"], // Apply to all JS files in the project
		ignores: ["node_modules", "dist"], // Ignore specific folders
		languageOptions: {
			globals: {
				...globals.node
			}
		},
		rules: {
			"no-unused-vars": ["warn"] // Treat unused variables as warnings
			// Add or customize other rules here
		}
	}
];

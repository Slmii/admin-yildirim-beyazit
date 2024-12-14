import { fixupConfigRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import pluginQuery from '@tanstack/eslint-plugin-query'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default [
	...fixupConfigRules(
		compat.extends(
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:react-hooks/recommended',
			'prettier'
		)
	),
	{
		plugins: {
			react,
			'@tanstack/query': pluginQuery,
		},
		languageOptions: {
			globals: {
				...globals.browser
			},
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			}
		},
		rules: {
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/no-children-prop': 'off',
			'no-mixed-spaces-and-tabs': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'linebreak-style': ['error', 'unix'],
			'@tanstack/query/exhaustive-deps': 'error',
			curly: 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					caughtErrors: 'none',
					argsIgnorePattern: '^_'
				}
			]
		}
	}
];

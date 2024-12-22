import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		legacy({
			targets: ['>0.2%', 'not dead', 'not op_mini all', 'defaults', 'not IE 11']
		})
	],
	resolve: {
		alias: {
			'@': path.resolve('./src')
		}
	},
	define: {
		__APP_ENV__: process.env.VITE_VERCEL_ENV
	},
	base: './'
});

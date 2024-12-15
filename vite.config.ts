import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve('./src')
		}
	},
	define: {
		__APP_ENV__: process.env.VITE_VERCEL_ENV
	},
	base: './'
	// server: { host: '127.0.0.1', port: 81 }
});

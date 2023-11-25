import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
	root: path.join(process.cwd(), 'src'),
	css: {
		modules: {
			localsConvention: 'camelCase'
		}
	},
	server: {
		port: 3000
	},
	plugins: [react()]
});

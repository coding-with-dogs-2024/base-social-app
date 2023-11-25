// noinspection JSAnnotator
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
	root: path.join(process.cwd(), 'src'),
	test: {
		root: path.join(process.cwd(), 'test')
	},
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

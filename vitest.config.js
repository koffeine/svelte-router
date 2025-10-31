import { mergeConfig } from 'vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import viteConfig from './vite.config.js';

/** @type {import('vitest/config').ViteUserConfigExport} */
const vitestConfig = {
	plugins: [ svelteTesting() ],
	test: {
		environment: 'happy-dom',
		reporters: 'tree',
		coverage: {
			enabled: true,
			include: 'src/**/*.js',
			reporter: 'text'
		}
	}
};

export default (env) => mergeConfig(viteConfig(env), vitestConfig);

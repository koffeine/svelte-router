import { mergeConfig } from 'vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import viteConfig from './vite.config.js';

/** @type {import('vitest/config').UserConfigExport} */
const vitestConfig = {
	plugins: [ svelteTesting() ],
	test: {
		environment: 'jsdom',
		reporters: 'tree',
		onConsoleLog: (log) => !log.includes('Not implemented: navigation to another Document'),
		coverage: {
			enabled: true,
			include: 'src/**/*.js',
			reporter: 'text'
		}
	}
};

export default (env) => mergeConfig(viteConfig(env), vitestConfig);

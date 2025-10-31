import { mergeConfig } from 'vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import viteConfig from './vite.config.js';

/** @type {import('vitest/config').UserConfigExport} */
const vitestConfig = {
	plugins: [ svelteTesting() ],
	test: {
		environment: 'jsdom',
		onConsoleLog: (log) => !log.includes('Not implemented: navigation to another Document')
	}
};

export default (env) => mergeConfig(viteConfig(env), vitestConfig);

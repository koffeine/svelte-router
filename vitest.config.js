import { mergeConfig } from 'vite';
import viteConfig from './vite.config.js';

/** @type {import('vitest/config').UserConfigExport} */
const vitestConfig = {
	test: {
		environment: 'jsdom'
	}
};

export default (env) => mergeConfig(viteConfig(env), vitestConfig);

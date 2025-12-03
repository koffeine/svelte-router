import { mergeConfig } from 'vite';
import viteConfig from './vite.config.js';

/** @type {import('vitest/config').ViteUserConfigExport} */
const vitestConfig = {
	test: {
		environment: 'happy-dom'
	}
};

/** @type {import('vitest/config').ViteUserConfigExport} */
export default (env) => mergeConfig(viteConfig(env), vitestConfig);

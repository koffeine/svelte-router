import { mergeConfig } from 'vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import viteConfig from './vite.config.js';

/** @type {import('vitest/config').ViteUserConfigExport} */
const vitestConfig = {
	plugins: [ svelteTesting() ],
	test: {
		reporters: 'tree',
		environment: 'happy-dom'
	}
};

/** @type {import('vitest/config').ViteUserConfigExport} */
export default (env) => mergeConfig(viteConfig(env), vitestConfig);

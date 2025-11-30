import { mergeConfig } from 'vite';
import { playwright } from '@vitest/browser-playwright';
import viteConfig from './vite.config.js';

/** @type {import('vitest/config').ViteUserConfigExport} */
const vitestConfig = {
	test: {
		browser: {
			enabled: true,
			provider: playwright(),
			headless: true,
			screenshotFailures: false,
			instances: [
				{ browser: 'chromium' },
				{ browser: 'firefox' },
				{ browser: 'webkit' }
			]
		},
		reporters: 'tree',
		coverage: {
			enabled: true,
			provider: 'istanbul',
			include: 'src/**/*.js',
			reporter: 'text'
		}
	}
};

export default (env) => mergeConfig(viteConfig(env), vitestConfig);

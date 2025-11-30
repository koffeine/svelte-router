import { mergeConfig } from 'vite';
import { playwright } from '@vitest/browser-playwright';
import viteConfig from './vite.config.js';

/** @type {import('vitest/config').ViteUserConfigExport} */
const vitestConfig = {
	test: {
		reporters: 'tree',
		browser: {
			enabled: true,
			provider: playwright(),
			headless: true,
			screenshotFailures: false,
			instances: [
				{ browser: 'chromium' },
				{ browser: 'webkit' },
				{ browser: 'firefox' }
			]
		},
		coverage: {
			enabled: true,
			provider: 'istanbul',
			include: [ 'src/**/*.js' ],
			reporter: 'text'
		}
	}
};

/** @type {import('vitest/config').ViteUserConfigExport} */
export default (env) => mergeConfig(viteConfig(env), vitestConfig);

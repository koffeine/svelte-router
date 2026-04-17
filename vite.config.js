import { svelte } from '@sveltejs/vite-plugin-svelte';
import { playwright } from '@vitest/browser-playwright';

/** @type {import('vitest/config').ViteUserConfigExport} */
export default ({ mode }) => ({
	base: mode === 'production' ? '/svelte-router/' : '/',

	plugins: [ svelte() ],

	server: { open: true },

	preview: { open: true },

	test: {
		reporters: 'tree',
		browser: {
			enabled: true,
			provider: playwright(),
			headless: true,
			screenshotFailures: false,
			instances: [ { browser: 'chromium' } ]
		},
		coverage: {
			enabled: true,
			include: [ 'src/**/*.js' ],
			reporter: 'text'
		}
	}
});

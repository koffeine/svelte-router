import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';

/** @type {import('vitest/config').ViteUserConfigExport} */
export default ({ mode }) => ({
	base: mode === 'production' ? '/svelte-router/' : '/',

	plugins: [
		svelte(),
		mode === 'test' && svelteTesting()
	],

	server: { open: true },

	preview: { open: true },

	test: {
		reporters: 'tree',
		environment: 'happy-dom',
		coverage: {
			enabled: true,
			include: [ 'src/**/*.js' ],
			reporter: 'text'
		}
	}
});

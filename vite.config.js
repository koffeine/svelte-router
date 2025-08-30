import { svelte } from '@sveltejs/vite-plugin-svelte';

/** @type {import('vite').UserConfigExport} */
export default ({ mode }) => ({
	base: mode === 'production' ? '/svelte-router/' : '/',

	plugins: [ svelte() ],

	server: { open: true },

	preview: { open: true }
});

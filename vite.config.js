import { svelte } from '@sveltejs/vite-plugin-svelte';

/** @type {import('vite').UserConfigExport} */
export default ({ mode }) => ({
	publicDir: mode === 'production' ? false : 'public',

	plugins: [ svelte() ],

	server: { open: true },

	build: {
		target: 'esnext',
		rollupOptions: {
			external: [
				'regexparam',
				'svelte/store'
			]
		},
		lib: {
			entry: 'src/lib/index.js',
			formats: [ 'es' ]
		},
		reportCompressedSize: false
	}
});

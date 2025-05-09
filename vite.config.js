import { svelte } from '@sveltejs/vite-plugin-svelte';

/** @type {import('vite').UserConfigExport} */
export default {
	plugins: [ svelte() ],

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
};

/** @type {import('vite').UserConfigExport} */
export default {
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

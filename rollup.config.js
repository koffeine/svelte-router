/* global URL */

import { readFileSync } from 'fs';
import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

export default defineConfig({
	external: [ /node_modules/u ],
	input: 'src/index.js',
	plugins: [
		nodeResolve(),
		esbuild({
			exclude: '**/*',
			minify: true,
			sourceMap: false
		})
	],
	output: [
		{
			generatedCode: 'es2015',
			file: pkg.exports['.']
		}
	]
});

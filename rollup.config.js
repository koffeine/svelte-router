import nodeResolve from '@rollup/plugin-node-resolve';
import { minify } from 'rollup-plugin-esbuild';
import pkg from './package.json' with { type: 'json' };

/** @type {import('rollup').RollupOptions} */
export default {
	external: /node_modules/v,
	input: 'src/index.js',
	plugins: [
		nodeResolve(),
		minify({ sourceMap: false })
	],
	output: [ { file: pkg.exports['.'].default } ]
};

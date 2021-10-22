import { readFileSync } from 'fs';
import nodeResolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

export default {
	external: [ /node_modules/u ],
	input: 'src/index.js',
	plugins: [
		nodeResolve(),
		esbuild({
			exclude: '**/*',
			minify: true,
			sourcemap: false
		})
	],
	output: [
		{
			generatedCode: 'es2015',
			format: 'es',
			file: pkg.exports
		}
	]
};

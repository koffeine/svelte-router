'use strict';

/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: '@koffeine',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	env: {
		es2022: true
	},
	overrides: [
		{
			files: './*',
			excludedFiles: './types.d.ts',
			env: {
				node: true
			}
		},
		{
			files: [ './types.d.ts', 'src/**/*' ],
			env: {
				browser: true
			}
		},
		{
			files: 'test/**/*',
			env: {
				node: true,
				mocha: true
			}
		},
		{
			files: '*.ts',
			plugins: [ '@typescript-eslint' ],
			parser: '@typescript-eslint/parser',
			rules: {
				'no-unused-vars': 'off', '@typescript-eslint/no-unused-vars': [ 'error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false, caughtErrors: 'all' } ]
			}
		},
		{
			files: '*.cjs',
			parserOptions: {
				sourceType: 'script'
			}
		}
	]
};

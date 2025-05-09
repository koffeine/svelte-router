import koffeine from '@koffeine/eslint-config';
import globals from 'globals';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
	koffeine,
	{
		files: [ 'src/**/*.js' ],
		languageOptions: {
			globals: globals.browser
		}
	},
	{
		files: [ 'test/**/*.js' ],
		languageOptions: {
			globals: globals.mocha
		}
	},
	{
		files: [ 'index.d.ts' ],
		languageOptions: {
			globals: globals.browser,
			parser: typescriptParser
		},
		plugins: {
			'@typescript-eslint': typescriptPlugin
		},
		rules: {
			'no-unused-vars': 'off', '@typescript-eslint/no-unused-vars': [ 'error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false, caughtErrors: 'all' } ]
		}
	}
];

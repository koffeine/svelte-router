import koffeine from '@koffeine/eslint-config';
import koffeineSvelte from '@koffeine/eslint-config-svelte';
import globals from 'globals';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
// @ts-expect-error typescriptPlugin
export default [
	...koffeine,
	...koffeineSvelte,
	{
		ignores: [ 'dist' ],
	},
	{
		files: [ '*', 'test/**/*' ],
		languageOptions: {
			globals: globals.node
		}
	},
	{
		files: [ 'src/**/*', 'demo/**/*' ],
		languageOptions: {
			globals: globals.browser
		}
	},
	{
		files: [ '**/*.ts' ],
		languageOptions: {
			parser: typescriptParser
		},
		plugins: {
			'@typescript-eslint': typescriptPlugin
		},
		rules: {
			'no-unused-vars': 'off', '@typescript-eslint/no-unused-vars': [ 'error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false, caughtErrors: 'all', ignoreClassWithStaticInitBlock: false, reportUsedIgnorePattern: false } ]
		}
	}
];

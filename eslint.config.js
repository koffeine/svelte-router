import koffeine from '@koffeine/eslint-config';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import sveltePlugin from 'eslint-plugin-svelte';
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
		files: [ 'src/**/*.svelte.js' ],
		languageOptions: {
			globals: globals.browser,
			parser: svelteParser
		}
	},
	{
		files: [ 'src/**/*.svelte' ],
		languageOptions: {
			globals: globals.browser,
			parser: svelteParser
		},
		processor: sveltePlugin.processors.svelte,
		plugins: {
			svelte: sveltePlugin
		},
		rules: {
			// eslint base
			'no-inner-declarations': 'off', 'svelte/no-inner-declarations': [ 'error', 'both' ],
			'no-self-assign': 'off',

			// svelte base
			'svelte/comment-directive': 'error',
			'svelte/system': 'error',

			// svelte recommended
			'svelte/infinite-reactive-loop': 'error',
			'svelte/no-at-debug-tags': 'warn',
			'svelte/no-at-html-tags': 'error',
			'svelte/no-dom-manipulating': 'error',
			'svelte/no-dupe-else-if-blocks': 'error',
			'svelte/no-dupe-on-directives': 'error',
			'svelte/no-dupe-style-properties': 'error',
			'svelte/no-dupe-use-directives': 'error',
			'svelte/no-export-load-in-svelte-module-in-kit-pages': 'error',
			'svelte/no-immutable-reactive-statements': 'error',
			'svelte/no-inspect': 'warn',
			'svelte/no-not-function-handler': 'error',
			'svelte/no-object-in-text-mustaches': 'error',
			'svelte/no-raw-special-elements': 'error',
			'svelte/no-reactive-functions': 'error',
			'svelte/no-reactive-literals': 'error',
			'svelte/no-reactive-reassign': 'error',
			'svelte/no-shorthand-style-property-overrides': 'error',
			'svelte/no-store-async': 'error',
			'svelte/no-svelte-internal': 'error',
			'svelte/no-unknown-style-directive-property': 'error',
			'svelte/no-unnecessary-state-wrap': 'error',
			'svelte/no-unused-props': 'error',
			'svelte/no-unused-svelte-ignore': 'error',
			'svelte/no-useless-children-snippet': 'error',
			'svelte/no-useless-mustaches': 'error',
			'svelte/require-each-key': 'error',
			'svelte/require-event-dispatcher-types': 'error',
			'svelte/require-store-reactive-access': 'error',
			'svelte/valid-each-key': 'error',
			'svelte/valid-prop-names-in-kit-pages': 'error'
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

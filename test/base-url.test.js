import { test } from 'vitest';
import { check, mock } from './utils.js';
import { init } from '../src/index.js';

const baseUrl = '/svelte-router';

history.replaceState(null, '', baseUrl); // Playwright fix

await init(
	[
		{ path: '/', component: mock('Index') }
	],
	{ baseUrl }
);


test('should handle initial navigation', () => {
	check({ path: '/', component: 'Index' });
});

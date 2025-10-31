import { describe, test } from 'vitest';
import assert from 'assert/strict';
import { init, navigate, route } from '../src/index.js';

/**
 * @param {string} name
 * @returns {() => Promise<{ default: import('svelte').Component }>}
 */
// @ts-expect-error: Mock component
const mock = (name) => () => ({ default: name });

/** @param {{ path: string, component: string, params?: { [key: string]: string | undefined }, query?: { [key: string]: string | undefined } }} expected */
const check = (expected) => assert.deepEqual(route, { params: {}, query: {}, ...expected });


await init(
	[
		{ path: '/', component: mock('Index') },
		{ path: '/redirect', redirect: '/redirected' },
		{ path: '/redirected', component: mock('Redirected') },
		{ path: '/params/:param', component: mock('Params') },
		{ path: '/optional-params/:param?', component: mock('OptionalParams') },
		{ path: '/query-params', component: mock('QueryParams') },
		{ path: '/wildcard/*', component: mock('Wildcard') }
	],
	{
		baseUrl: '/'
	}
);


test('should handle initial navigation', () => {
	check({ path: '/', component: 'Index' });
});

test('should handle navigation with redirect', async () => {
	await navigate('/redirect');

	check({ path: '/redirected', component: 'Redirected' });
});

describe('params', () => {
	test('should handle navigation with params in path', async () => {
		await navigate('/params/value');

		check({ path: '/params/value', component: 'Params', params: { param: 'value' } });
	});

	test('should handle navigation with params in options', async () => {
		await navigate('/params/:param', { params: { param: 'value' } });

		check({ path: '/params/value', component: 'Params', params: { param: 'value' } });
	});
});

describe('optional params', () => {
	test('should handle navigation with optional params in path', async () => {
		await navigate('/optional-params/value');

		check({ path: '/optional-params/value', component: 'OptionalParams', params: { param: 'value' } });
	});

	test('should handle navigation with optional params in options', async () => {
		await navigate('/optional-params/:param', { params: { param: 'value' } });

		check({ path: '/optional-params/value', component: 'OptionalParams', params: { param: 'value' } });
	});

	test('should handle navigation with no optional params', async () => {
		await navigate('/optional-params');

		// eslint-disable-next-line no-undefined
		check({ path: '/optional-params', component: 'OptionalParams', params: { param: undefined } });
	});
});

describe('query params', () => {
	test('should handle navigation with query params in path', async () => {
		await navigate('/query-params?param=value');

		check({ path: '/query-params', component: 'QueryParams', query: { param: 'value' } });
	});

	test('should handle navigation with query params in options', async () => {
		await navigate('/query-params', { query: { param: 'value' } });

		check({ path: '/query-params', component: 'QueryParams', query: { param: 'value' } });
	});

	test('should handle navigation with query params in path and options', async () => {
		await navigate('/query-params?param1=pathValue&param2=pathValue', { query: { param2: 'optionsValue', param3: 'optionsValue' } });

		check({ path: '/query-params', component: 'QueryParams', query: { param1: 'pathValue', param2: 'optionsValue', param3: 'optionsValue' } });
	});
});

test('should handle wildcard navigation', async () => {
	await navigate('/wildcard/any/thing');

	check({ path: '/wildcard/any/thing', component: 'Wildcard', params: { '*': 'any/thing' } });
});

test('should throw error on unknown path', async () => {
	await assert.rejects(navigate('/not-found'));
});

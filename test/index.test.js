import jsdomGlobal from 'jsdom-global';
import { test } from 'vitest';
import assert from 'assert/strict';
import { get } from 'svelte/store';
import * as Router from '../src/index.js';

/**
 * @param {string} name
 * @returns {() => Promise<{ default: import('svelte').Component }>}
 */
// @ts-ignore: Mock component
const mockComponent = (name) => () => ({ default: name });

/** @param {{ path: string, component: string, params?: { [key: string]: string | null }, query?: { [key: string]: string } }} expected */
const check = (expected) => assert.deepEqual(get(Router.route), { params: {}, query: {}, ...expected });


jsdomGlobal('', { url: 'http://localhost/' });

await Router.init([
	{ path: '/', component: mockComponent('Index') },
	{ path: '/no-params', component: mockComponent('NoParams') },
	{ path: '/params/:param', component: mockComponent('Params') },
	{ path: '/optional-params/:param?', component: mockComponent('OptionalParams') },
	{ path: '/query-params', component: mockComponent('QueryParams') },
	{ path: '/redirect', redirect: '/redirected' },
	{ path: '/redirected', component: mockComponent('Redirected') },
	{ path: '/wildcard/*', component: mockComponent('Wildcard') }
]);


test('should handle initial navigation', () => {
	check({ path: '/', component: 'Index' });
});

test('should handle navigation with no params', async () => {
	await Router.navigate('/no-params');

	check({ path: '/no-params', component: 'NoParams' });
});

test('should handle navigation with params #1', async () => {
	await Router.navigate('/params/:param', { params: { param: 'value' } });

	check({ path: '/params/value', component: 'Params', params: { param: 'value' } });
});

test('should handle navigation with params #2', async () => {
	await Router.navigate('/params/value');

	check({ path: '/params/value', component: 'Params', params: { param: 'value' } });
});

test('should handle navigation with optional params', async () => {
	await Router.navigate('/optional-params');

	check({ path: '/optional-params', component: 'OptionalParams', params: { param: null } });
});

test('should handle navigation with query params #1', async () => {
	await Router.navigate('/query-params', { query: { param: 'value' } });

	check({ path: '/query-params', component: 'QueryParams', query: { param: 'value' } });
});

test('should handle navigation with query params #2', async () => {
	await Router.navigate('/query-params?param=value');

	check({ path: '/query-params', component: 'QueryParams', query: { param: 'value' } });
});

test('should handle navigation with redirect', async () => {
	await Router.navigate('/redirect');

	check({ path: '/redirected', component: 'Redirected' });
});

test('should handle wildcard navigation', async () => {
	await Router.navigate('/wildcard/any/thing');

	check({ path: '/wildcard/any/thing', component: 'Wildcard', params: { '*': 'any/thing' } });
});

test('should throw error on unknown path', async () => {
	await assert.rejects(Router.navigate('/not-found'));
});

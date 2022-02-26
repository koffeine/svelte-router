/* eslint-env mocha */

import './jsdom.cjs';
import * as Router from '../src/index.js';
import { get } from 'svelte/store';
import assert from 'assert/strict';

/**
 * @param {string} name
 * @returns {() => Promise<{ default: import('svelte').SvelteComponent }>}
 */
const mockComponent = (name) =>
	// @ts-ignore: Mock component
	() => ({ default: name });

/** @param {{ path: string, component: string, params?: { [key: string]: string | null }, query?: { [key: string]: string } }} actual */
const check = (actual) => assert.deepEqual(get(Router.route), { params: {}, query: {}, ...actual });


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


it('should handle initial navigation', () => {
	check({ path: '/', component: 'Index' });
});

it('should handle navigation with no params', async () => {
	await Router.navigate('/no-params');

	check({ path: '/no-params', component: 'NoParams' });
});

it('should handle navigation with params #1', async () => {
	await Router.navigate('/params/:param', { params: { param: 'value' } });

	check({ path: '/params/value', component: 'Params', params: { param: 'value' } });
});

it('should handle navigation with params #2', async () => {
	await Router.navigate('/params/value');

	check({ path: '/params/value', component: 'Params', params: { param: 'value' } });
});

it('should handle navigation with optional params', async () => {
	await Router.navigate('/optional-params');

	check({ path: '/optional-params', component: 'OptionalParams', params: { param: null } });
});

it('should handle navigation with query params #1', async () => {
	await Router.navigate('/query-params', { query: { param: 'value' } });

	check({ path: '/query-params', component: 'QueryParams', query: { param: 'value' } });
});

it('should handle navigation with query params #2', async () => {
	await Router.navigate('/query-params?param=value');

	check({ path: '/query-params', component: 'QueryParams', query: { param: 'value' } });
});

it('should handle navigation with redirect', async () => {
	await Router.navigate('/redirect');

	check({ path: '/redirected', component: 'Redirected' });
});

it('should handle wildcard navigation', async () => {
	await Router.navigate('/wildcard/any/thing');

	check({ path: '/wildcard/any/thing', component: 'Wildcard', params: { wild: 'any/thing' } });
});

it('should throw error on unknown path', async () => {
	await assert.rejects(Router.navigate('/not-found'));
});

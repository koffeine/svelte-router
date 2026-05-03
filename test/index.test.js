import { describe, expect, test } from 'vitest';
import { init, navigate } from '../src/index.js';
import { check, mock } from './utils.js';

/** @param {import('../src/index.js').PublicRouteConfig[]} routeConfigs */
const setup = async (routeConfigs, baseUrl = '/svelte-router') => {
	history.replaceState(null, '', baseUrl); // Playwright fix

	await init(routeConfigs, { baseUrl });
};


test('should handle initial navigation', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	check({ component: 'Index', pathname: '/' });
});

test('should handle initial navigation when baseUrl ends with \'/\'', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ], '/svelte-router/');

	check({ component: 'Index', pathname: '/' });
});

test('should handle back navigation', async () => {
	await setup([
		{ pathname: '/', component: mock('Index') },
		{ pathname: '/page', component: mock('Page') }
	]);

	check({ component: 'Index', pathname: '/' });

	await navigate('/page');

	check({ component: 'Page', pathname: '/page' });

	await new Promise((resolve) => {
		window.addEventListener('popstate', resolve, { once: true });
		history.back();
	});

	check({ component: 'Index', pathname: '/' });
});

test('should ignore navigation to the same url', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	const length = history.length;

	await navigate('/');

	expect(history.length).toBe(length);
});

test('should handle navigation with params', async () => {
	await setup([
		{ pathname: '/', component: mock('Index') },
		{ pathname: '/params/:param', component: mock('Params') }
	]);

	await navigate('/params/value');

	check({ component: 'Params', pathname: '/params/value', params: { param: 'value' } });
});

describe('optional params', () => {
	test('should handle navigation with optional params', async () => {
		await setup([
			{ pathname: '/', component: mock('Index') },
			{ pathname: '/optional-params/:param?', component: mock('OptionalParams') }
		]);

		await navigate('/optional-params/value');

		check({ component: 'OptionalParams', pathname: '/optional-params/value', params: { param: 'value' } });
	});

	test('should handle navigation with no optional params', async () => {
		await setup([
			{ pathname: '/', component: mock('Index') },
			{ pathname: '/optional-params/:param?', component: mock('OptionalParams') }
		]);

		await navigate('/optional-params');

		// eslint-disable-next-line no-undefined
		check({ component: 'OptionalParams', pathname: '/optional-params', params: { param: undefined } });
	});
});

test('should handle wildcard navigation', async () => {
	await setup([
		{ pathname: '/', component: mock('Index') },
		{ pathname: '/wildcard/*', component: mock('Wildcard') }
	]);

	await navigate('/wildcard/any/thing');

	check({ component: 'Wildcard', pathname: '/wildcard/any/thing', params: { '*': 'any/thing' } });
});

test('should handle navigation with search params', async () => {
	await setup([
		{ pathname: '/', component: mock('Index') },
		{ pathname: '/search-params', component: mock('SearchParams') }
	]);

	await navigate('/search-params', { searchParams: { param: 'value' } });

	check({ component: 'SearchParams', pathname: '/search-params', searchParams: { param: 'value' } });
});

test('should handle navigation with redirect', async () => {
	await setup([
		{ pathname: '/', component: mock('Index') },
		{ pathname: '/redirect', redirect: '/redirected' },
		{ pathname: '/redirected', component: mock('Redirected') }
	]);

	await navigate('/redirect');

	check({ component: 'Redirected', pathname: '/redirected' });
});

test('should throw error when no route found for pathname', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await expect(navigate('/not-found'))
		.rejects
		.toThrow('No route found for pathname \'/not-found\'');
});

test('should throw error when pathname is outside of baseUrl', async () => {
	history.replaceState(null, '', '/'); // Playwright fix

	await expect(init([ { pathname: '/', component: mock('Index') } ], { baseUrl: '/svelte-router' }))
		.rejects
		.toThrow('Pathname \'/\' is outside of baseUrl \'/svelte-router\'');
});

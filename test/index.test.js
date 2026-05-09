import { expect, test } from 'vitest';
import { init, link, navigate } from '../src/index.js';
import { check, mock } from './utils.js';

/** @param {import('../src/index.js').PublicRouteConfig[]} routeConfigs */
const setup = async (routeConfigs, baseUrl = '/svelte-router') => {
	history.replaceState(null, '', baseUrl); // Playwright fix

	await init(routeConfigs, { baseUrl });
};


test('should handle initial navigation when base url has a trailing \'/\'', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ], '/svelte-router/');

	check({ component: 'Index', pathname: '/' });
});

test('should handle initial navigation when base url has no trailing \'/\'', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ], '/svelte-router');

	check({ component: 'Index', pathname: '/' });
});

test('should handle back/forward navigation', async () => {
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

	await new Promise((resolve) => {
		window.addEventListener('popstate', resolve, { once: true });
		history.forward();
	});

	check({ component: 'Page', pathname: '/page' });
});

test('should not add trailing \'?\'', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	expect(link('/page')).toBe('/svelte-router/page');
	expect(link('/page', undefined)).toBe('/svelte-router/page'); // eslint-disable-line no-undefined
	expect(link('/page', {})).toBe('/svelte-router/page');
	expect(link('/page', { searchParams: undefined })).toBe('/svelte-router/page'); // eslint-disable-line no-undefined
	expect(link('/page', { searchParams: {} })).toBe('/svelte-router/page');
});

test('should ignore navigation to the same url', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	const length = history.length;

	await navigate('/');

	expect(history.length).toBe(length);
});

test('should throw error when pathname is outside of base url', async () => {
	history.replaceState(null, '', '/'); // Playwright fix

	await expect(init([ { pathname: '/', component: mock('Index') } ], { baseUrl: '/svelte-router' }))
		.rejects
		.toThrow('Pathname \'/\' is outside of base url \'/svelte-router\'');
});

test('should throw error when no route found for pathname', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await expect(navigate('/not-found'))
		.rejects
		.toThrow('No route found for pathname \'/not-found\'');
});

test('should handle navigation with params', async () => {
	await setup([
		{ pathname: '/', component: mock('Index') },
		{ pathname: '/params/:param', component: mock('Params') }
	]);

	await navigate('/params/value');

	check({ component: 'Params', pathname: '/params/value', params: { param: 'value' } });
});

test('should handle navigation with optional params set', async () => {
	await setup([
		{ pathname: '/', component: mock('Index') },
		{ pathname: '/optional-params/:param?', component: mock('OptionalParams') }
	]);

	await navigate('/optional-params/value');

	check({ component: 'OptionalParams', pathname: '/optional-params/value', params: { param: 'value' } });
});

test('should handle navigation with optional params not set', async () => {
	await setup([
		{ pathname: '/', component: mock('Index') },
		{ pathname: '/optional-params/:param?', component: mock('OptionalParams') }
	]);

	await navigate('/optional-params');

	// eslint-disable-next-line no-undefined
	check({ component: 'OptionalParams', pathname: '/optional-params', params: { param: undefined } });
});

test('should handle navigation with wildcard params', async () => {
	await setup([
		{ pathname: '/', component: mock('Index') },
		{ pathname: '/wildcard/*', component: mock('WildcardParams') }
	]);

	await navigate('/wildcard/any/thing');

	check({ component: 'WildcardParams', pathname: '/wildcard/any/thing', params: { '*': 'any/thing' } });
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

	const length = history.length;

	await navigate('/redirect');

	check({ component: 'Redirected', pathname: '/redirected' });

	expect(history.length).toBe(length + 1);
});

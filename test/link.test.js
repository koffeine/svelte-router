import { test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import { init } from '../src/index.js';
import { check, mock } from './utils.js';
import Link from './Link.svelte';

const baseUrl = '/svelte-router';

// Prevent external link from actually navigating
navigation.addEventListener('navigate', (event) => {
	const url = new URL(event.destination.url);

	if (
		url.origin !== location.origin
		|| (url.pathname !== baseUrl && !url.pathname.startsWith(`${baseUrl}/`))
	) {
		event.preventDefault();
	}
});

/** @param {import('../src/index.js').PublicRouteConfig[]} routeConfigs */
const setup = async (routeConfigs) => {
	history.replaceState(null, '', baseUrl); // Playwright fix

	await init(routeConfigs, { baseUrl });

	await render(Link);
};


test('should navigate on left-click', async () => {
	await setup([
		{ pathname: '/', component: mock('Index') },
		{ pathname: '/page', component: mock('Page') }
	]);

	await page.getByRole('link', { name: 'Internal' }).click();

	check({ component: 'Page', pathname: '/page' });
});

test('should not navigate when default is prevented', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await page.getByRole('link', { name: 'Default is prevented' }).click();

	check({ component: 'Index', pathname: '/' });
});

test('should not navigate when Control is pressed', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await page.getByRole('link', { name: 'Internal' }).click({ modifiers: [ 'Control' ] });

	check({ component: 'Index', pathname: '/' });
});

test('should not navigate when Meta is pressed', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	// On non-macOS, Meta+click navigates the same tab instead of opening a new one
	navigation.addEventListener('navigate', (event) => event.userInitiated && event.preventDefault(), { once: true });

	await page.getByRole('link', { name: 'Internal' }).click({ modifiers: [ 'Meta' ] });

	check({ component: 'Index', pathname: '/' });
});

test('should not navigate when Shift is pressed', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await page.getByRole('link', { name: 'Internal' }).click({ modifiers: [ 'Shift' ] });

	check({ component: 'Index', pathname: '/' });
});

test('should not navigate on right-click', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await page.getByRole('link', { name: 'Internal' }).click({ button: 'right' });

	check({ component: 'Index', pathname: '/' });
});

test('should not navigate for link with different origin', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await page.getByRole('link', { name: 'Different origin' }).click();

	check({ component: 'Index', pathname: '/' });
});

test('should not navigate for link with different baseUrl', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await page.getByRole('link', { name: 'Different baseUrl' }).click();

	check({ component: 'Index', pathname: '/' });
});

test('should navigate for link with self target', async () => {
	await setup([
		{ pathname: '/', component: mock('Index') },
		{ pathname: '/page', component: mock('Page') }
	]);

	await page.getByRole('link', { name: 'Self target' }).click();

	check({ component: 'Page', pathname: '/page' });
});

test('should not navigate for link with blank target', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await page.getByRole('link', { name: 'Blank target' }).click();

	check({ component: 'Index', pathname: '/' });
});

test('should not navigate for link with download attribute', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await page.getByRole('link', { name: 'Download attribute' }).click();

	check({ component: 'Index', pathname: '/' });
});

import { test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import { init } from '../src/index.js';
import { check, mock } from './utils.js';
import Link from './Link.svelte';

/** @param {import('../src/index.js').PublicRouteConfig[]} routeConfigs */
const setup = async (routeConfigs, baseUrl = '/svelte-router') => {
	history.replaceState(null, '', baseUrl); // Playwright fix

	await init(routeConfigs, { baseUrl });

	await render(Link);
};


test('should not navigate when default is prevented', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await page.getByRole('link', { name: 'Default is prevented' }).click();

	check({ component: 'Index', pathname: '/' });
});

test('should not navigate when control is pressed', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await page.getByRole('link', { name: 'Valid link' }).click({ modifiers: [ 'Control' ] });

	check({ component: 'Index', pathname: '/' });
});

test('should not navigate when meta is pressed', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	// On non-macOS, Meta+click navigates the same tab instead of opening a new one
	navigation.addEventListener(
		'navigate',
		(event) => event.userInitiated && event.preventDefault(),
		{ once: true }
	);

	await page.getByRole('link', { name: 'Valid link' }).click({ modifiers: [ 'Meta' ] });

	check({ component: 'Index', pathname: '/' });
});

test('should not navigate when shift is pressed', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await page.getByRole('link', { name: 'Valid link' }).click({ modifiers: [ 'Shift' ] });

	check({ component: 'Index', pathname: '/' });
});

test('should not navigate when not the left button is clicked', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await page.getByRole('link', { name: 'Valid link' }).click({ button: 'right' });

	check({ component: 'Index', pathname: '/' });
});

test('should ignore clicks on non-link element', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await page.getByText('Not a link').click();

	check({ component: 'Index', pathname: '/' });
});

test('should not navigate when link has a different origin', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	// Prevent external link from actually navigating
	navigation.addEventListener(
		'navigate',
		(event) => new URL(event.destination.url).origin !== location.origin && event.preventDefault(),
		{ once: true }
	);

	await page.getByRole('link', { name: 'Different origin' }).click();

	check({ component: 'Index', pathname: '/' });
});

test('should not navigate when link has a different base url', async () => {
	const baseUrl = '/svelte-router';

	await setup([ { pathname: '/', component: mock('Index') } ], baseUrl);

	// Prevent external link from actually navigating
	navigation.addEventListener(
		'navigate',
		(event) => {
			const pathname = new URL(event.destination.url).pathname;

			if (pathname !== baseUrl && !pathname.startsWith(`${baseUrl}/`)) {
				event.preventDefault();
			}
		},
		{ once: true }
	);

	await page.getByRole('link', { name: 'Different base url' }).click();

	check({ component: 'Index', pathname: '/' });
});

test('should not navigate when link has a non-self target', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await page.getByRole('link', { name: 'Non-self target' }).click();

	check({ component: 'Index', pathname: '/' });
});

test('should not navigate when link has download attribute', async () => {
	await setup([ { pathname: '/', component: mock('Index') } ]);

	await page.getByRole('link', { name: 'Download attribute' }).click();

	check({ component: 'Index', pathname: '/' });
});

test('should navigate for a valid nested link', async () => {
	await setup([
		{ pathname: '/', component: mock('Index') },
		{ pathname: '/page', component: mock('Page') }
	]);

	await page.getByText('Valid nested link').click();

	check({ component: 'Page', pathname: '/page' });
});

test('should navigate for a valid link', async () => {
	await setup([
		{ pathname: '/', component: mock('Index') },
		{ pathname: '/page', component: mock('Page') }
	]);

	await page.getByRole('link', { name: 'Valid link' }).click();

	check({ component: 'Page', pathname: '/page' });
});

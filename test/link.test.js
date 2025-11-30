import { beforeEach, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import { check, mock } from './utils.js';
import Link from './Link.svelte';
import { init, navigate } from '../src/index.js';

await init([
	{ path: '/', component: mock('Index') },
	{ path: '/page', component: mock('Page') }
]);


beforeEach(async () => {
	await navigate('/');

	render(Link);
});

test('should navigate on left-click', async () => {
	await userEvent.click(page.getByRole('link'));

	check({ path: '/page', component: 'Page' });
});

test('should not navigate on left-click when Control is pressed', async () => {
	await userEvent.keyboard('{Control>}');
	await userEvent.click(page.getByRole('link'));

	check({ path: '/', component: 'Index' });
});

test('should not navigate on left-click when Meta is pressed', async () => {
	await userEvent.keyboard('{Meta>}');
	await userEvent.click(page.getByRole('link'));

	check({ path: '/', component: 'Index' });
});

test('should not navigate on right-click', async () => {
	await userEvent.click(page.getByRole('link'), { button: 'right' });

	check({ path: '/', component: 'Index' });
});

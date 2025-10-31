import { beforeEach, test } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { check, mock } from './utils.js';
import Link from './Link.svelte';
import { init, navigate } from '../src/index.js';

await init([
	{ path: '/', component: mock('Index') },
	{ path: '/page', component: mock('Page') }
]);


/** @type {import('@testing-library/user-event').UserEvent} */
let user;

beforeEach(async () => {
	await navigate('/');

	render(Link);

	user = userEvent.setup();
});

test('should navigate on left-click', async () => {
	await user.click(screen.getByRole('link'));

	check({ path: '/page', component: 'Page' });
});

test('should not navigate on left-click when Control is pressed', async () => {
	await user.keyboard('{Control>}');
	await user.click(screen.getByRole('link'));

	check({ path: '/', component: 'Index' });
});

test('should not navigate on left-click when Meta is pressed', async () => {
	await user.keyboard('{Meta>}');
	await user.click(screen.getByRole('link'));

	check({ path: '/', component: 'Index' });
});

test('should not navigate on right-click', async () => {
	await user.pointer({ target: screen.getByRole('link'), keys: '[MouseRight]' });

	check({ path: '/', component: 'Index' });
});

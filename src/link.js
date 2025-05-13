import { navigate } from './router.js';

/** @type {import('svelte/action').Action<HTMLAnchorElement>} */
export const link = (node) => {
	node.addEventListener('click', (event) => {
		if (event.ctrlKey || event.metaKey || event.button !== 0) {
			return;
		}

		event.preventDefault();

		navigate(node.href);
	});
};

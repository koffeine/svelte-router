import { navigate } from './router.js';

/** @param {HTMLAnchorElement} node */
export const link = (node) => {
	node.addEventListener('click', (event) => {
		if (event.ctrlKey || event.metaKey || event.button !== 0) {
			return;
		}

		event.preventDefault();

		navigate(node.href);
	});
};

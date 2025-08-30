import { navigate } from './router.js';

/** @type {import('svelte/attachments').Attachment<HTMLAnchorElement>} */
export const link = (node) => {
	/** @param {PointerEvent} event */
	const eventListener = (event) => {
		if (event.ctrlKey || event.metaKey || event.button !== 0) {
			return;
		}

		event.preventDefault();

		navigate(node.href);
	};

	node.addEventListener('click', eventListener);

	return () => node.removeEventListener('click', eventListener);
};

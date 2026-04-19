import { on } from 'svelte/events';
import { navigate } from './router.js';

/**
 * @param {{ params?: { [key: string]: string }, query?: { [key: string]: string }, replace?: boolean }} [options]
 * @returns {import('svelte/attachments').Attachment<HTMLAnchorElement>}
 */
export const link = (options) =>
	(node) =>
		on(node, 'click', (event) => {
			if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) {
				return;
			}

			event.preventDefault();

			navigate(node.pathname + node.search, options);
		});

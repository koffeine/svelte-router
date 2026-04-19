import { on } from 'svelte/events';
import { navigate } from './router.js';

/**
 * @param {Parameters<typeof import('./router.js').navigate>[1]} [options]
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

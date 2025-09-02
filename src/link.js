import { on } from 'svelte/events';
import { navigate } from './router.js';

/** @type {typeof import('./index.d.ts').link} */
export const link = (options = {}) =>
	(node) =>
		on(node, 'click', (event) => {
			if (event.ctrlKey || event.metaKey || event.button !== 0) {
				return;
			}

			event.preventDefault();

			navigate(node.pathname + node.search, options);
		});

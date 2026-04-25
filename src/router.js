import { inject } from 'regexparam';
import { Routes } from './routes.js';
import { setRoute } from './route.svelte.js';

/** @type {Routes} */
let routes;

/** @type {string} */
let baseUrl;

/**
 * @param {ConstructorParameters<typeof import('./routes.js').Routes>[0]} newRoutes
 * @param {{ baseUrl?: string }} [options]
 */
export const init = async (newRoutes, { baseUrl: newBaseUrl = '' } = {}) => {
	routes = new Routes(newRoutes);
	baseUrl = newBaseUrl.endsWith('/') ? newBaseUrl.slice(0, -1) : newBaseUrl;

	window.addEventListener('popstate', notify); // eslint-disable-line no-use-before-define

	await notify(); // eslint-disable-line no-use-before-define
};

/**
 * @param {string} path
 * @param {{ params?: { [key: string]: string }, query?: { [key: string]: string }, replace?: boolean }} [options]
 */
export const navigate = async (path, { params, query, replace = false } = {}) => {
	const [ pathPart, queryPart ] = path.split('?');

	path = baseUrl + pathPart;

	if (params) {
		path = inject(path, params);
	}

	if (queryPart || query) {
		path += `?${new URLSearchParams({ ...Object.fromEntries(new URLSearchParams(queryPart)), ...query })}`;
	}

	if (path !== location.pathname + location.search) {
		history[replace ? 'replaceState' : 'pushState'](null, '', path);
		await notify(); // eslint-disable-line no-use-before-define
	}
};

const notify = async () => {
	const path = location.pathname.slice(baseUrl.length) || '/';
	const route = routes.find(path);

	if (route.isRedirect()) {
		await navigate(route.getRedirect(), { replace: true });
	} else {
		setRoute({
			path,
			component: await route.getComponent(),
			params: route.getParams(path),
			query: Object.fromEntries(new URLSearchParams(location.search))
		});
	}
};

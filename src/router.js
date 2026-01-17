import { on } from 'svelte/events';
import { inject } from 'regexparam';
import { Routes } from './routes.js';
import { setRoute } from './route.svelte.js';

/** @type {Routes} */
let routes;

/** @type {string} */
let baseUrl;

/** @type {typeof import('./index.d.ts').init} */
export const init = async (newRoutes, { baseUrl: newBaseUrl = '' } = {}) => {
	routes = new Routes(newRoutes);
	baseUrl = newBaseUrl.endsWith('/') ? newBaseUrl.slice(0, -1) : newBaseUrl;

	on(window, 'popstate', notify); // eslint-disable-line no-use-before-define
	await notify(); // eslint-disable-line no-use-before-define
};

/** @type {typeof import('./index.d.ts').navigate} */
export const navigate = async (path, { replace = false, params, query } = {}) => {
	const [ pathPart, queryPart ] = path.split('?');

	path = baseUrl + pathPart;

	if (params) {
		path = inject(path, params);
	}

	if (queryPart || query) {
		path += `?${new URLSearchParams({ ...Object.fromEntries(new URLSearchParams(queryPart)), ...query })}`;
	}

	if (path !== location.pathname + location.search) {
		history[`${replace ? 'replace' : 'push'}State`](null, '', path);
		await notify(); // eslint-disable-line no-use-before-define
	}
};

const notify = async () => {
	const path = location.pathname.slice(baseUrl.length);
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

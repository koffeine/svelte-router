import { on } from 'svelte/events';
import { inject } from 'regexparam';
import { Routes } from './routes.js';
import { setRoute } from './route.svelte.js';

class Router {

	/** @type {Routes} */
	static #routes;

	/** @type {string} */
	static #baseUrl;

	/** @type {typeof import('./index.d.ts').init} */
	static async init(routes, { baseUrl = '' } = {}) {
		Router.#routes = new Routes(routes);
		Router.#baseUrl = baseUrl.endsWith('/') ? baseUrl.substring(0, baseUrl.length - 1) : baseUrl;

		on(window, 'popstate', Router.#notify);
		await Router.#notify();
	}

	/** @type {typeof import('./index.d.ts').navigate} */
	static async navigate(path, { replace = false, params, query } = {}) {
		const parts = path.split('?');

		path = Router.#baseUrl + parts[0];
		query = { ...Object.fromEntries(new URLSearchParams(parts[1])), ...query };

		if (params) {
			path = inject(path, params);
		}

		if (query) {
			path += `?${new URLSearchParams(query)}`;
		}

		if (path !== location.pathname + location.search) {
			history[`${replace ? 'replace' : 'push'}State`](null, '', path);
			await Router.#notify();
		}
	}

	static async #notify() {
		const path = location.pathname.substring(Router.#baseUrl.length);
		const route = Router.#routes.find(path);

		if (route.isRedirect()) {
			await Router.navigate(route.getRedirect(), { replace: true });
		} else {
			setRoute({
				path,
				component: await route.getComponent(),
				params: route.getParams(path),
				query: Object.fromEntries(new URLSearchParams(location.search))
			});
		}
	}

}

export const init = Router.init;
export const navigate = Router.navigate;

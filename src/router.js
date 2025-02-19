import { inject } from 'regexparam';
import { Routes } from './routes.js';
import { writableStore as store } from './store.js';

class Router {

	/** @type {Routes} */
	static #routes;

	/** @param {({ path: string, redirect: string, component?: undefined } | { path: string, redirect?: undefined, component: () => Promise<{ default: import('svelte').Component }> })[]} routes */
	static async init(routes) {
		Router.#routes = new Routes(routes);

		window.addEventListener('popstate', Router.#notify);
		await Router.#notify();
	}

	/**
	 * @param {string} path
	 * @param {{ replace?: boolean, params?: { [key: string]: any }, query?: { [key: string]: any } }} options
	 */
	static async navigate(path, { replace = false, params, query } = {}) {
		if (params) {
			path = inject(path, params);
		}

		if (query) {
			path += `?${new URLSearchParams(query).toString()}`;
		}

		if (path !== location.pathname) {
			history[`${replace ? 'replace' : 'push'}State`](null, '', path);
			await Router.#notify();
		}
	}

	static async #notify() {
		const path = location.pathname;
		const route = Router.#routes.find(path);

		if (route.isRedirect()) {
			await Router.navigate(route.getRedirect(), { replace: true });
		} else {
			store.set({
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

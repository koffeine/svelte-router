import { inject } from 'regexparam';
import { Routes } from './routes.js';
import { writableStore as store } from './store.js';

class Router {

	/** @type {Routes} */
	static #routes;

	/** @param {({ path: string, redirect: string, component?: undefined } | { path: string, redirect?: undefined, component: () => Promise<{ default: import('svelte').SvelteComponent }> })[]} options */
	static init(options) {
		Router.#routes = new Routes(options);

		window.addEventListener('popstate', () => Router.#notify());
		Router.#notify();
	}

	/**
	 * @param {string} path
	 * @param {{ replace?: boolean, params?: { [key: string]: any }, query?: { [key: string]: any } }} options
	 */
	static navigate(path, { replace = false, params, query } = {}) {
		if (params) {
			path = inject(path, params);
		}

		if (query) {
			path += `?${new URLSearchParams(query).toString()}`;
		}

		if (path !== location.pathname) {
			history[`${replace ? 'replace' : 'push'}State`](null, '', path);
			Router.#notify();
		}
	}

	static async #notify() {
		const path = location.pathname;
		const route = Router.#routes.find(path);

		if (route.isRedirect()) {
			Router.navigate(route.getRedirect(), { replace: true });
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

const init = Router.init;
const navigate = Router.navigate;

export { init, navigate };

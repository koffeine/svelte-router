import { Route } from './route.js';

class Routes {

	#routes;

	/** @param {({ path: string, redirect: string, component?: undefined } | { path: string, redirect?: undefined, component: () => Promise<{ default: import('svelte').SvelteComponent }> })[]} options */
	constructor(options) {
		this.#routes = options.map((option) => new Route(option));
	}

	/** @param {string} path */
	find(path) {
		for (const route of this.#routes) {
			if (route.matches(path)) {
				return route;
			}
		}

		throw new Error(`No route found for path '${path}'`);
	}

}

export { Routes };

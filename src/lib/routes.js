import { Route } from './route.js';

export class Routes {

	#routes;

	/** @param {({ path: string, redirect: string, component?: undefined } | { path: string, redirect?: undefined, component: () => Promise<{ default: import('svelte').Component }> })[]} routes */
	constructor(routes) {
		this.#routes = routes.map((route) => new Route(route));
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

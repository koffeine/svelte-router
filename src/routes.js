import { Route } from './route.js';

export class Routes {

	#routes;

	/** @param {Parameters<typeof import('./index.d.ts').init>[0]} routes */
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

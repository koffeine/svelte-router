/** @typedef {{ path: string, component: import('svelte').Component, params: { [key: string]: string | null }, query: { [key: string]: string } }} Value */

/** @type {Value} */
// @ts-ignore: Read after Router.init() has been called
let state = $state({});

export const route = {
	get path() {
		return state.path;
	},

	get component() {
		return state.component;
	},

	get params() {
		return state.params;
	},

	get query() {
		return state.query;
	}
};

/** @param {Value} newRoute */
export const setRoute = (newRoute) => state = newRoute;

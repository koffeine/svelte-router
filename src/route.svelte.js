/** @typedef {{ path: string, component: import('svelte').Component | null, params: { [key: string]: string | undefined }, query: { [key: string]: string | undefined } }} State */

/** @type {State} */
let state = $state({ path: '', component: null, params: {}, query: {} });

/** @type {Readonly<State>} */
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

/** @param {State} newRoute */
export const setRoute = (newRoute) => state = newRoute;

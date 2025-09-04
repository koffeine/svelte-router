/** @type {typeof import('./index.d.ts').route} */
let state = $state({ path: '', component: null, params: {}, query: {} });

/** @type {typeof import('./index.d.ts').route} */
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

/** @param {typeof import('./index.d.ts').route} newRoute */
export const setRoute = (newRoute) => state = newRoute;

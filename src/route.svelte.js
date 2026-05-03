/** @typedef {{ component: import('svelte').Component<any> | null, pathname: string, params: { [ key: string ]: string | undefined }, searchParams: { [ key: string ]: string | undefined } }} Route */

/** @type {Route} */
let routeState = $state({ component: null, pathname: '', params: {}, searchParams: {} });

/** @type {Readonly<Route>} */
export const route = {
	get component() {
		return routeState.component;
	},

	get pathname() {
		return routeState.pathname;
	},

	get params() {
		return routeState.params;
	},

	get searchParams() {
		return routeState.searchParams;
	}
};

/** @param {Route} newRoute */
export const setRoute = (newRoute) => {
	routeState = newRoute;
};

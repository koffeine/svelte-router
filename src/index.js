import { parse } from 'regexparam';
import { route, setRoute } from './route.svelte.js';

export { route };

/** @typedef {{ pathname: string } & ({ component: () => Promise<{ default: import('svelte').Component<any, {}> }>, redirect?: never } | { redirect: string, component?: never })} PublicRouteConfig */

/** @typedef {{ pattern: RegExp, keys: string[] } & PublicRouteConfig} RouteConfig */

/** @type {RouteConfig[]} */
let routeConfigs;

/** @type {string} */
let baseUrl;

/**
 * @param {PublicRouteConfig[]} publicRouteConfigs
 * @param {{ baseUrl?: string }} [options]
 * @returns {Promise<void>}
 */
export const init = async (publicRouteConfigs, { baseUrl: newBaseUrl = '' } = {}) => {
	routeConfigs = publicRouteConfigs.map((publicRouteConfig) => ({ ...publicRouteConfig, ...parse(publicRouteConfig.pathname) }));
	baseUrl = newBaseUrl.replace(/\/$/v, '');

	window.addEventListener('popstate', notify); // eslint-disable-line no-use-before-define
	document.addEventListener('click', onClick); // eslint-disable-line no-use-before-define

	await notify(); // eslint-disable-line no-use-before-define
};

/**
 * @param {string} pathname
 * @param {{ searchParams?: { [ key: string ]: string } }} [options]
 * @returns {string}
 */
export const link = (pathname, { searchParams } = {}) => {
	const search = String(new URLSearchParams(searchParams));

	return baseUrl + pathname + (search && `?${search}`);
};

/**
 * @param {string} pathname
 * @param {{ searchParams?: { [ key: string ]: string }, replace?: boolean }} [options]
 * @returns {Promise<void>}
 */
export const navigate = (pathname, { searchParams, replace = false } = {}) =>
	doNavigate(link(pathname, { searchParams }), replace); // eslint-disable-line no-use-before-define

/**
 * @param {string} url
 * @param {boolean} replace
 */
const doNavigate = async (url, replace) => {
	if (url !== location.pathname + (location.pathname === baseUrl ? '/' : '') + location.search) {
		history[replace ? 'replaceState' : 'pushState'](null, '', url);
		await notify(); // eslint-disable-line no-use-before-define
	}
};

const notify = async () => {
	let pathname = location.pathname;

	if (pathname !== baseUrl && !pathname.startsWith(`${baseUrl}/`)) {
		throw new Error(`Pathname '${pathname}' is outside of baseUrl '${baseUrl}'`);
	}

	pathname = pathname.slice(baseUrl.length) || '/';


	const routeConfig = routeConfigs.find((r) => r.pattern.test(pathname));

	if (!routeConfig) {
		throw new Error(`No route found for pathname '${pathname}'`);
	}

	if (routeConfig.component) {
		const matches = /** @type {string[]} */ (routeConfig.pattern.exec(pathname)).slice(1);

		setRoute({
			component: (await routeConfig.component()).default,
			pathname,
			params: Object.fromEntries(routeConfig.keys.map((key, i) => [ key, matches[i] ])),
			searchParams: Object.fromEntries(new URLSearchParams(location.search))
		});
	} else {
		await navigate(routeConfig.redirect, { replace: true });
	}
};

/** @param {PointerEvent} event */
const onClick = async (event) => {
	if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) {
		return;
	}

	const anchor = /** @type {Element | null} */ (event.target)?.closest('a');

	if (
		!anchor
		|| anchor.origin !== location.origin
		|| (anchor.pathname !== baseUrl && !anchor.pathname.startsWith(`${baseUrl}/`))
		|| (anchor.target && anchor.target !== '_self')
		|| anchor.hasAttribute('download')
	) {
		return;
	}

	event.preventDefault();

	await doNavigate(anchor.pathname + anchor.search, false);
};

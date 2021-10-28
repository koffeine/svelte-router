import { SvelteComponent } from 'svelte';
import { Readable } from 'svelte/store';

/**
 * Initialize router
 */
export declare const init: (options: ({

	/**
	 * Anything [regexparam](https://www.npmjs.com/package/regexparam) supports
	 */
	path: string,

	/**
	 * Path to redirect to
	 */
	redirect: string,

	/**
	 * Should be `undefined` when `redirect` is set
	 */
	component?: undefined

} | {

	/**
	 * Anything [regexparam](https://www.npmjs.com/package/regexparam) supports
	 */
	path: string,

	/**
	 * Dynamic import to a Svelte component
	 */
	component: () => Promise<{ default: any }>,

	/**
	 * Should be `undefined` when `component` is set
	 */
	redirect?: undefined

})[]) => void;

/**
 * Navigate to a path
 */
export declare const navigate: (

	/**
	 * Path to navigate to
	 */
	path: string,

	{ replace, params, query }?: {

		/**
		 * If `true`, `History.replaceState()` will be used, otherwise `History.pushState()`
		 * @default false
		 */
		replace?: boolean,

		/**
		 * Params to inject into url
		 * @example navigate('/welcome/:name', { params: { name: 'john' } }) // navigates to /welcome/john
		 */
		params?: { [key: string]: any },

		/**
		 * Query params to add after path
		 * @example navigate('/list', { query: { order: 'asc' } }) // navigates to /list?order=asc
		 */
		query?: { [key: string]: any }

	}

) => void;

/**
 * Svelte readable store describing current route
 */
export declare const route: Readable<{

	/**
	 * Path of current url
	 */
	path: string,

	/**
	 * Component corresponding to current url
	 */
	component: SvelteComponent,

	/**
	 * Params of current url
	 */
	params: { [key: string]: string | null },

	/**
	 * Query params of current url
	 */
	query: { [key: string]: string }

}>;

/**
 * Svelte action that can be used on `a` elements to change them from regular links to router links
 * @example <a use:link href="/welcome">Welcome</a>
 */
export declare const link: (node: HTMLAnchorElement) => void;

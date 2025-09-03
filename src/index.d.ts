import { Component } from 'svelte';
import { Attachment } from 'svelte/attachments';

export type Route = {

	/** Anything [regexparam](https://www.npmjs.com/package/regexparam) supports */
	path: string,

	/** Path to redirect to */
	redirect: string,

	/** Should be `undefined` when `redirect` is set */
	component?: undefined

} | {

	/** Anything [regexparam](https://www.npmjs.com/package/regexparam) supports */
	path: string,

	/** Dynamic import to a component */
	component: () => Promise<{ default: Component<any> }>,

	/** Should be `undefined` when `component` is set */
	redirect?: undefined

};

/** Initialize router */
export const init: (

	/** Array of routes */
	routes: Route[]

) => Promise<void>;

/** Navigate to a path */
export const navigate: (

	/** Path to navigate to */
	path: string,

	/** Options */
	options?: {

		/**
		 * If `true`, `History.replaceState()` will be used, otherwise `History.pushState()`
		 * @default false
		 */
		replace?: boolean,

		/** Params to inject into url */
		params?: { [key: string]: string },

		/** Query params to add after path */
		query?: { [key: string]: string }

	}

) => Promise<void>;

/** State describing current route */
export const route: {

	/** Path of current url */
	path: string,

	/** Component corresponding to current url */
	component: Component | null,

	/** Params of current url */
	params: { [key: string]: string | undefined },

	/** Query params of current url */
	query: { [key: string]: string | undefined }

};

/** Attachment that can be used on `a` elements to change them from regular links to router links */
export const link: Attachment<HTMLAnchorElement>;

import { Component } from 'svelte';
import { Attachment } from 'svelte/attachments';

/** Route */
export type Route = {

	/**
	 * Path
	 *
	 * Shouldn't include base url, should start with `/`, supports [regexparam](https://www.npmjs.com/package/regexparam) patterns
	 */
	path: string

} & (

	{

		/** Dynamic import to a component */
		component: () => Promise<{ default: Component<any> }>,

		/** Shouldn't be set when `component` is set */
		redirect?: never

	} | {

		/**
		 * Url to redirect to
		 *
		 * Shouldn't include base url, should start with `/`
		 */
		redirect: string,

		/** Shouldn't be set when `redirect` is set */
		component?: never

	}

);

/** Initialize router */
export const init: (

	/** Array of routes */
	routes: Route[],

	/** Options */
	options?: {

		/**
		 * Base url of the app
		 *
		 * Defaults to `''`
		 */
		baseUrl?: string

	}

) => Promise<void>;

export type NavigateOptions = {

	/** Params */
	params?: { [ key: string ]: string },

	/** Query params */
	query?: { [ key: string ]: string },

	/**
	 * Whether to replace the current history entry or add a new one
	 *
	 * Defaults to `false`
	 */
	replace?: boolean

};

/** Attachment factory that can be used on `a` elements to change them from regular links to router links */
export const link: (

	/** Options */
	options?: {

		/** Params */
		params?: { [ key: string ]: string },

		/** Query params */
		query?: { [ key: string ]: string },

		/**
		 * Whether to replace the current history entry or add a new one
		 *
		 * Defaults to `false`
		 */
		replace?: boolean

	}

) => Attachment<HTMLAnchorElement>;

/** Navigate programmatically */
export const navigate: (

	/**
	 * Path
	 *
	 * Shouldn't include base url, should start with `/`
	 */
	path: string,

	/** Options */
	options?: {

		/** Params */
		params?: { [ key: string ]: string },

		/** Query params */
		query?: { [ key: string ]: string },

		/**
		 * Whether to replace the current history entry or add a new one
		 *
		 * Defaults to `false`
		 */
		replace?: boolean

	}

) => Promise<void>;

/** Reactive state of the current route */
export const route: {

	/** Component */
	readonly component: Component | null,

	/**
	 * Path
	 *
	 * Doesn't include base url
	 */
	readonly path: string,

	/** Params */
	readonly params: { [ key: string ]: string | undefined },

	/** Query params */
	readonly query: { [ key: string ]: string | undefined }

};

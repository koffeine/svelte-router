import { Component } from 'svelte';

/** Route config */
export type RouteConfig = {

	/**
	 * Pathname
	 *
	 * Shouldn't include base url, should start with `/`, supports [regexparam](https://www.npmjs.com/package/regexparam) patterns
	 */
	pathname: string

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

	/** Array of route configs */
	routeConfigs: RouteConfig[],

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

/** Prefix pathname with base url and add search params */
export const link: (

	/**
	 * Pathname
	 *
	 * Shouldn't include base url, should start with `/`
	 */
	pathname: string,

	/** Options */
	options?: {

		/** Search params */
		searchParams?: { [ key: string ]: string }

	}

) => string;

/** Navigate programmatically */
export const navigate: (

	/**
	 * Pathname
	 *
	 * Shouldn't include base url, should start with `/`
	 */
	pathname: string,

	/** Options */
	options?: {

		/** Search params */
		searchParams?: { [ key: string ]: string },

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
	readonly component: Component<any> | null,

	/**
	 * Pathname
	 *
	 * Doesn't include base url
	 */
	readonly pathname: string,

	/** Params */
	readonly params: { [ key: string ]: string | undefined },

	/** Search params */
	readonly searchParams: { [ key: string ]: string | undefined }

};

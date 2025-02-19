import { parse } from 'regexparam';

export class Route {

	#pattern;

	#keys;

	#redirect;

	#component;

	/** @param {{ path: string, redirect: string, component?: undefined } | { path: string, redirect?: undefined, component: () => Promise<{ default: import('svelte').Component }> }} route */
	constructor({ path, redirect, component }) {
		const { pattern, keys } = parse(path);

		this.#pattern = pattern;
		this.#keys = keys;
		this.#redirect = redirect;
		this.#component = component;
	}

	/** @param {string} path */
	matches(path) {
		return this.#pattern.test(path);
	}

	isRedirect() {
		return Boolean(this.#redirect);
	}

	/** @returns {string} */
	getRedirect() {
		// @ts-ignore: Called when isRedirect() returns true
		return this.#redirect;
	}

	async getComponent() {
		// @ts-ignore: Called when isRedirect() returns false
		return (await this.#component()).default;
	}

	/** @param {string} path */
	getParams(path) {
		// @ts-ignore: Called when matches returns true
		const matches = this.#pattern.exec(path).slice(1);

		/** @type {{ [key: string]: string | null }} */
		const params = {};

		for (let i = 0; i < this.#keys.length; i++) {
			params[this.#keys[i]] = matches[i] || null;
		}

		return params;
	}

}

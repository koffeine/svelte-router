import { parse } from 'regexparam';

export class Route {

	#pattern;

	#keys;

	#redirect;

	#component;

	/** @param {import('./index.d.ts').Route} route */
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
		// @ts-expect-error: Called when isRedirect() returns true
		return this.#redirect;
	}

	async getComponent() {
		// @ts-expect-error: Called when isRedirect() returns false
		return (await this.#component()).default;
	}

	/**
	 * @param {string} path
	 * @returns {{ [key: string]: string | undefined }}
	 */
	getParams(path) {
		// @ts-expect-error: Called when matches() returns true
		const matches = this.#pattern.exec(path).slice(1);

		return this.#keys.reduce((params, key, i) => ({ ...params, [key]: matches[i] }), {});
	}

}

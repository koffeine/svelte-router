import { writable } from 'svelte/store';

/**
 * @typedef {{ path: string, component: import('svelte').SvelteComponent, params: { [key: string]: string | null }, query: { [key: string]: string } }} Value
 * @type {import('svelte/store').Writable<Value>}
 */
// @ts-ignore: Subscribed after Router.init() has been called
const writableStore = writable({});

/** @type {import('svelte/store').Readable<Value>} */
const readableStore = { subscribe: writableStore.subscribe };

export { writableStore, readableStore };

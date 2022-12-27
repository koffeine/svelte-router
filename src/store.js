import { writable } from 'svelte/store';

/**
 * @typedef {{ path: string, component: import('svelte').ComponentType, params: { [key: string]: string | null }, query: { [key: string]: string } }} Value
 * @type {import('svelte/store').Writable<Value>}
 */
// @ts-ignore: Subscribed after Router.init() has been called
export const writableStore = writable({});

/** @type {import('svelte/store').Readable<Value>} */
export const readableStore = { subscribe: writableStore.subscribe };

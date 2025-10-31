import { expect } from 'vitest';
import { route } from '../src/index.js';

/**
 * @param {string} name
 * @returns {() => Promise<{ default: import('svelte').Component }>}
 */
// @ts-expect-error: Mock component
export const mock = (name) => () => ({ default: name });

/** @param {{ path: string, component: string, params?: { [key: string]: string | undefined }, query?: { [key: string]: string | undefined } }} expected */
export const check = (expected) => expect(route).toStrictEqual({ params: {}, query: {}, ...expected });

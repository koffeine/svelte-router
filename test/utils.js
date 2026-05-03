import { expect } from 'vitest';
import { route } from '../src/index.js';

/**
 * @param {string} name
 * @returns {() => Promise<{ default: import('svelte').Component }>}
 */
// @ts-expect-error: Mock component
export const mock = (name) => () => ({ default: name });

/** @param {{ component: string, pathname: string, params?: { [ key: string ]: string | undefined }, searchParams?: { [ key: string ]: string | undefined } }} expected */
export const check = (expected) => expect(route).toStrictEqual({ params: {}, searchParams: {}, ...expected });

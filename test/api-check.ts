import type * as Public from '../index.d.ts';
import type * as Actual from '../src/index.js';

type Equals<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;

type AllTrue<T extends Record<string, true>> = T;

export type Checks = AllTrue<{
	[K in keyof typeof Public | keyof typeof Actual]: Equals<
		(typeof Public)[K & keyof typeof Public],
		(typeof Actual)[K & keyof typeof Actual]
	>
}>;

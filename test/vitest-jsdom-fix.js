/**
 * To be able to handle logging with Vitest's built-in test.onConsoleLog
 *
 * - By default it doesn't work (since 4.0.0)
 * - Setting test.environmentOptions.jsdom.console doesn't work
 * - Setting test.environmentOptions.jsdom.virtualConsole throws error
 * - Using custom test.environment probably would work, but it's way more code than the following
 * - Replacing jsdomError listener with correct console instance works
 */

/** https://github.com/jsdom/jsdom/blob/b0805a908fb905ec69c4d1afc09977226927ae09/lib/jsdom/virtual-console.js#L24-L42 */
// @ts-expect-error
// eslint-disable-next-line no-undef
/** @type {import('jsdom').VirtualConsole} */(_virtualConsole)
	.removeAllListeners('jsdomError')
	.on('jsdomError', (e) => {
		// @ts-ignore
		if (e.type === 'unhandled-exception') {
			// @ts-ignore
			// eslint-disable-next-line no-undef, no-console
			console.error(e.cause.stack);
		} else {
			// eslint-disable-next-line no-undef, no-console
			console.error(e.message);
		}
	});

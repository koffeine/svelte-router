import { mount } from 'svelte';
import * as Router from '@koffeine/svelte-router';
import App from './App.svelte';

// Initialize router
await Router.init([
	// Route with component
	{ path: '/welcome/:name', component: () => import('./Welcome.svelte') },

	// Route with redirect
	{ path: '*', redirect: '/welcome/unknown' }

	// Path matching is done by https://www.npmjs.com/package/regexparam
]);

export default mount(App, { target: document.body });

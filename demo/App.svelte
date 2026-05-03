<script>
import { init, link, navigate, route } from '@koffeine/svelte-router';

/** @type {import('@koffeine/svelte-router').RouteConfig[]} */
const routeConfigs = [
	// Parameterized route config with component
	{ pathname: '/page/:title', component: () => import('./Page.svelte') },

	// Fallback route config with redirect
	{ pathname: '/*', redirect: '/page/unknown' }
];

// Initialize router
init(
	routeConfigs,
	{
		// BaseUrl of the app, defaults to ''
		baseUrl: import.meta.env.BASE_URL
	}
);
</script>

<h1>svelte-router</h1>

<!-- Link navigation -->
<div>
	<a href={link('/page/first')} class:active={route.pathname === '/page/first'}>Page: first</a>
	<a href={link('/page/second')} class:active={route.pathname === '/page/second'}>Page: second</a>
</div>

<!-- API navigation -->
<div>
	<button type="button" disabled={route.pathname === '/page/first'} onclick={() => navigate('/page/first')}>Page: first</button>
	<button type="button" disabled={route.pathname === '/page/second'} onclick={() => navigate('/page/second')}>Page: second</button>
</div>

<!-- Router outlet -->
<route.component {...route.params} />

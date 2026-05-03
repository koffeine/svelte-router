<script>
import { init, link, navigate, route } from '@koffeine/svelte-router';

/** @type {import('@koffeine/svelte-router').Route[]} */
const routes = [
	// Parameterized route with component
	{ path: '/page/:title', component: () => import('./Page.svelte') },

	// Fallback route with redirect
	{ path: '*', redirect: '/page/unknown' }
];

// Initialize router
init(
	routes,
	{
		// BaseUrl of the app, defaults to ''
		baseUrl: import.meta.env.BASE_URL
	}
);
</script>

<h1>svelte-router</h1>

<!-- Link navigation -->
<div>
	<!-- Without params -->
	<a href="/page/first" {@attach link()} class:active={route.path === '/page/first'}>Page: first</a>

	<!-- With params -->
	<a href="/page/:title" {@attach link({ params: { title: 'second' } })} class:active={route.path === '/page/second'}>Page: second</a>
</div>

<!-- API navigation -->
<div>
	<!-- Without params -->
	<button type="button" disabled={route.path === '/page/first'} onclick={() => navigate('/page/first')}>Page: first</button>

	<!-- With params -->
	<button type="button" disabled={route.path === '/page/second'} onclick={() => navigate('/page/:title', { params: { title: 'second' } })}>Page: second</button>
</div>

<!-- Router outlet -->
<route.component {...route.params} />

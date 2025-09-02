<script>
import { init, navigate, route, link } from '@koffeine/svelte-router';

/** @type {import('@koffeine/svelte-router').Route[]} */
const routes = [
	// Route with component
	{ path: '/welcome/:name', component: () => import('./Welcome.svelte') },

	// Route with redirect
	{ path: '*', redirect: '/welcome/unknown' }
];

// Initialize router
init(routes);
</script>

<!-- API navigation & using route.path -->
<div>
	<!-- Without params -->
	<button type="button" disabled={route.path === '/welcome/john'} onclick={() => navigate('/welcome/john')}>Welcome John</button>

	<!-- With params -->
	<button type="button" disabled={route.path === '/welcome/jane'} onclick={() => navigate('/welcome/:name', { params: { name: 'jane' } })}>Welcome Jane</button>
</div>

<!-- Anchor navigation & using route.path -->
<div>
	<!-- Without params -->
	<a href="/welcome/john" {@attach link()} class:active={route.path === '/welcome/john'}>Welcome John</a>
	|
	<!-- With params -->
	<a href="/welcome/:name" {@attach link({ params: { name: 'jane' } })} class:active={route.path === '/welcome/jane'}>Welcome Jane</a>
</div>

<!-- Router outlet -->
<route.component {...route.params} />

<script>
import { navigate, route, link } from '@koffeine/svelte-router';

// Param
/** @type {{ name: string }} */
const { name } = $props();

// Query param
const numbers = $derived([ 1, 2, 3 ].sort((a, b) => (a - b) * (route.query.order === 'desc' ? -1 : 1)));
const query = $derived({ order: route.query.order === 'desc' ? 'asc' : 'desc' });
</script>

<h1>Welcome, {name[0].toUpperCase() + name.substring(1)}!</h1>

Numbers:

<ul>
	{#each numbers as number (number)}
		<li>{number}</li>
	{/each}
</ul>

<!-- API navigation using current path, changing only query params -->
<button type="button" onclick={() => navigate(route.path, { query })}>Reverse</button>

<!-- Anchor navigation using current path, changing only query params -->
<a href={route.path} {@attach link({ query })}>Reverse</a>

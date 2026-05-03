<script>
import { link, navigate, route } from '@koffeine/svelte-router';

// Params
/** @type {{ title: string }} */
const { title } = $props();

// Query params
const numbers = $derived([ 1, 2, 3 ].sort((a, b) => (a - b) * (route.query.order === 'desc' ? -1 : 1)));
const query = $derived({ order: route.query.order === 'desc' ? 'asc' : 'desc' });
</script>

<h2>Page: {title}</h2>

Numbers:

<ul>
	{#each numbers as number (number)}
		<li>{number}</li>
	{/each}
</ul>

<!-- Link navigation -->
<a href={route.path} {@attach link({ query })}>Reverse numbers (add a new history entry)</a>

<!-- API navigation -->
<button type="button" onclick={() => navigate(route.path, { query, replace: true })}>Reverse numbers (replace the current history entry)</button>

<script>
import { link, navigate, route } from '@koffeine/svelte-router';

// Params
/** @type {{ title: string }} */
const { title } = $props();

// Search params
const numbers = $derived([ 1, 2, 3 ].sort((a, b) => (a - b) * (route.searchParams.order === 'desc' ? -1 : 1)));
const searchParams = $derived({ order: route.searchParams.order === 'desc' ? 'asc' : 'desc' });
</script>

<h2>Page: {title}</h2>

Numbers:

<ul>
	{#each numbers as number (number)}
		<li>{number}</li>
	{/each}
</ul>

<!-- Link navigation -->
<a href={link(route.pathname, { searchParams })}>Reverse numbers (add a new history entry)</a>

<!-- API navigation -->
<button type="button" onclick={() => navigate(route.pathname, { searchParams, replace: true })}>Reverse numbers (replace the current history entry)</button>

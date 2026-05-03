<h1>
    svelte-router
    <a href="https://www.npmjs.com/package/@koffeine/svelte-router"><img alt="npm" src="https://img.shields.io/npm/v/@koffeine/svelte-router"></a>
</h1>

Router for Svelte 5

## Demo

[https://koffeine.github.io/svelte-router/](https://koffeine.github.io/svelte-router/)

## Installation

```sh
npm install @koffeine/svelte-router
```

## API

[Go to declaration](https://github.com/koffeine/svelte-router/blob/main/index.d.ts)

## Usage

[`App.svelte`](https://github.com/koffeine/svelte-router/blob/main/demo/App.svelte):

```html
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
```

[`Page.svelte`](https://github.com/koffeine/svelte-router/blob/main/demo/Page.svelte):

```html
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
```

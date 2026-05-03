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
```

[`Page.svelte`](https://github.com/koffeine/svelte-router/blob/main/demo/Page.svelte):

```html
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
```

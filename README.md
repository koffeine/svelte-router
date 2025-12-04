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

## Usage

[`App.svelte`](https://github.com/koffeine/svelte-router/blob/main/demo/App.svelte):

```html
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
init(
    routes,
    {
        // Base url, defaults to ''
        baseUrl: import.meta.env.BASE_URL
    }
);
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
```

[`Welcome.svelte`](https://github.com/koffeine/svelte-router/blob/main/demo/Welcome.svelte):

```html
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
```

## API

[Go to declaration](https://github.com/koffeine/svelte-router/blob/main/src/index.d.ts)

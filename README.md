<h1>
    svelte-router
    <a href="https://www.npmjs.com/package/@koffeine/svelte-router"><img alt="npm" src="https://img.shields.io/npm/v/@koffeine/svelte-router"></a>
</h1>

Router for Svelte 5

## Installation

```sh
npm install @koffeine/svelte-router
```

## Usage

[`main.js`](https://github.com/koffeine/svelte-router/blob/master/demo/main.js):

```js
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
```

[`App.svelte`](https://github.com/koffeine/svelte-router/blob/master/demo/App.svelte):

```html
<script>
import { route, link, navigate } from '@koffeine/svelte-router';

const RouteComponent = $derived($route.component);
</script>

<!-- Anchor navigation & using route.path -->
<div>
    <a href="/welcome/john" use:link class:active={$route.path === '/welcome/john'}>Welcome John</a>
    |
    <a href="/welcome/jane" use:link class:active={$route.path === '/welcome/jane'}>Welcome Jane</a>
</div>

<!-- API navigation & using route.path -->
<div>
    <!-- Without params -->
    <button type="button" disabled={$route.path === '/welcome/john'} onclick={() => navigate('/welcome/john')}>Welcome John</button>

    <!-- With params -->
    <button type="button" disabled={$route.path === '/welcome/jane'} onclick={() => navigate('/welcome/:name', { params: { name: 'jane' } })}>Welcome Jane</button>
</div>

<!-- Router outlet -->
<RouteComponent {...$route.params} />
```

[`Welcome.svelte`](https://github.com/koffeine/svelte-router/blob/master/demo/Welcome.svelte):

```html
<script>
import { route, navigate } from '@koffeine/svelte-router';

// Param
/** @type {{ name: string }} */
const { name } = $props();

// Query param
const numbers = $derived([ 1, 2, 3 ].sort((a, b) => (a - b) * ($route.query.order === 'desc' ? -1 : 1)));
const query = $derived({ order: $route.query.order === 'desc' ? 'asc' : 'desc' });
</script>

<h1>Welcome, {name[0].toUpperCase() + name.substring(1)}!</h1>

Numbers:

<ul>
    {#each numbers as number (number)}
        <li>{number}</li>
    {/each}
</ul>

<!-- API navigation using current path, changing only query params -->
<button type="button" onclick={() => navigate($route.path, { query })}>Reverse</button>
```

## API

[Go to declaration](https://github.com/koffeine/svelte-router/blob/master/index.d.ts)

## License

Copyright © Kornél Horváth

Licensed under the [MIT License](https://raw.githubusercontent.com/koffeine/svelte-router/refs/heads/master/LICENSE).

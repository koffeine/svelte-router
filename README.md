<h1>
	svelte-router
	<a href="https://www.npmjs.com/package/@koffeine/svelte-router"><img alt="npm" src="https://img.shields.io/npm/v/@koffeine/svelte-router"></a>
</h1>

Router for Svelte

## Installation

```sh
npm install @koffeine/svelte-router
```

## Usage

`main.js`:

```js
import * as Router from '@koffeine/svelte-router';
import App from './App.svelte';

// Initialize router
Router.init([
	{ path: '/welcome/:name', component: () => import('./Welcome.svelte') },

	{ path: '*', redirect: '/welcome/unknown' }
]);

export default new App({ target: document.body });
```

`App.svelte`:

```html
<script>
import { navigate, route, link } from '@koffeine/svelte-router';
</script>

<!-- Anchor navigation & using route.path -->
<a use:link href="/welcome/john" class:active={$route.path === '/welcome/john'}>Welcome John</a> |
<a use:link href="/welcome/jane" class:active={$route.path === '/welcome/jane'}>Welcome Jane</a>

<!-- API navigation -->
<button type="button" on:click={() => navigate('/welcome/john')}>Welcome John</button>

<!-- API navigation using params -->
<button type="button" on:click={() => navigate('/welcome/:name', { params: { name: 'jane' } })}>Welcome Jane</button>

<!-- Router outlet -->
<svelte:component this={$route.component} {...$route.params} />
```

`Welcome.svelte`:

```html
<script>
import { navigate, route } from '@koffeine/svelte-router';

// Param
/** @type {string} */
export let name;

let numbers = [ 1, 2, 3 ];
let query = { order: 'asc' };

// Query param
$: {
	numbers = numbers.sort((a, b) => (a - b) * ($route.query.order === 'desc' ? -1 : 1));
	query = { order: $route.query.order === 'desc' ? 'asc' : 'desc' };
}
</script>

<h1>Welcome, {name[0].toUpperCase() + name.substring(1)}!</h1>

Numbers:

<ul>
	{#each numbers as number (number)}
		<li>{number}</li>
	{/each}
</ul>

<!-- API navigation using current path, changing only query params -->
<button type="button" on:click={() => navigate($route.path, { query })}>Reverse</button>
```

## API

<a href="https://github.com/koffeine/svelte-router/blob/master/types.d.ts">Go to declaration</a>

## License

Copyright © Kornél Horváth

Licensed under the [MIT License](https://raw.githubusercontent.com/koffeine/svelte-router/master/LICENSE).

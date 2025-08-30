<script>
import { route, link, navigate } from '@koffeine/svelte-router';
</script>

<!-- Anchor navigation & using route.path -->
<div>
	<a href="/welcome/john" use:link class:active={route.path === '/welcome/john'}>Welcome John</a>
	|
	<a href="/welcome/jane" use:link class:active={route.path === '/welcome/jane'}>Welcome Jane</a>
</div>

<!-- API navigation & using route.path -->
<div>
	<!-- Without params -->
	<button type="button" disabled={route.path === '/welcome/john'} onclick={() => navigate('/welcome/john')}>Welcome John</button>

	<!-- With params -->
	<button type="button" disabled={route.path === '/welcome/jane'} onclick={() => navigate('/welcome/:name', { params: { name: 'jane' } })}>Welcome Jane</button>
</div>

<!-- Router outlet -->
<route.component {...route.params} />

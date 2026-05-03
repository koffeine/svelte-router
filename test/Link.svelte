<script>
import { link } from '../src/index.js';
</script>

<a href={link('/page')}>Internal</a>
<a href={link('/page')} onclick={(event) => event.preventDefault()}>Default is prevented</a>
<a href="https://localhost/svelte-router/page">Different origin</a>
<a href="/page">Different baseUrl</a>
<a href={link('/page')} target="_self">Self target</a>
<a href={link('/page')} target="_blank" rel="noopener noreferrer">Blank target</a>
<a href={link('/page')} download>Download attribute</a>

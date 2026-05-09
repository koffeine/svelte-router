<script>
import { link } from '../src/index.js';
</script>

<a href={link('/page')} onclick={(event) => event.preventDefault()}>Default is prevented</a>
<span>Not a link</span>
<a href="https://localhost/svelte-router/page">Different origin</a>
<a href="/page">Different base url</a>
<a href={link('/page')} target="_blank" rel="noopener noreferrer">Non-self target</a>
<a href={link('/page')} download>Download attribute</a>
<a href={link('/page')}><span>Valid nested link</span></a>
<a href={link('/page')}>Valid link</a>

<script>
import { link } from '@koffeine/svelte-router';
</script>

<a href="/page" {@attach link()} onclick={(e) => e.preventDefault()}>Go</a>

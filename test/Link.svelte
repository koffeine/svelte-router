<script>
import { link } from '../src/index.js';
</script>

<a href="/page" {@attach link()} onclick={(e) => e.preventDefault()}>Go</a>

<script>
	import { quadIn } from 'svelte/easing'
	import { fade } from 'svelte/transition'
</script>

<section
	in:fade={{ duration: 400, easing: quadIn }}
	class="grid h-96 card bg-base-300 rounded-box place-items-center">
	...loading
</section>

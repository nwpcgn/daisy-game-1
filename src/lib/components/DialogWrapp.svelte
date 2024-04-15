<script>
	import { onMount } from 'svelte'
	import { theme } from '../rpg/rpg'
	let dialogElement
	onMount(() => setTimeout(dialogElement.showModal(), 10))
</script>

<dialog bind:this={dialogElement} class="modal">
	<slot />
</dialog>

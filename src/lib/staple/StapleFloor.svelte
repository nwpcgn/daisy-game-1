<script context="module">
	export const floorEl = new Set()
</script>

<script>
	import { onMount } from 'svelte'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()
	export let show = false
	export let x = 0
	export let id = 1
	export let level = 'level1'
	let floor

	onMount(() => {
		floorEl.add(floor)

		return () => floorEl.delete(floor)
	})
</script>

<div
	on:pointerdown={() => dispatch('click', floor)}
	bind:this={floor}
	class="floor"
	data-floor={id}
	class:show
	style="transform: translateX({x}px);">
	<div class="{level} level" />
</div>

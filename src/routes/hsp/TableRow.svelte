<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	export let id_m
	export let op
	export let name
	export let genre
	export let studio
	export let logo
	export let card
	export let info
	export let hsp_main

	function handleClick() {
		dispatch('select', {
			id_m,
			op,
			name,
			genre,
			studio,
			logo,
			card,
			info,
			count: hsp_main[0].count
		})
	}
</script>

<tr
	class="py-2 relative hover:bg-base-200 hover:cursor-pointer"
	on:pointerdown={handleClick}>
	<td>{name}</td>
	<td>{genre} </td>
	<td>{studio}</td>
	<td class="text-right">{hsp_main[0].count}</td>
</tr>

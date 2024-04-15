<script>
	import StapleFloor, { floorEl } from './StapleFloor.svelte'
	import { sleep } from '../'
	import { shuffle } from '../'
	import { step, floors, elems } from './'
	import { onMount } from 'svelte'
	export let bg = true
	export let width = 570
	export let x = 0
	let elem
	const levelNames = [
		'level1',
		'level2',
		'level3',
		'level4',
		'level5',
		'level6',
		'level7'
	]
	let levels = []

	function floorInfo(el) {
		let obj = {}
		let rect = el.getBoundingClientRect()
		for (const key in rect) {
			if (typeof rect[key] !== 'function') {
				obj[key] = Math.round(rect[key])
			}
		}
		return obj
	}

	async function getFloors() {
		await sleep(100)
		let elements = [...floorEl]
		let arr = []
		elements.forEach((x) => {
			arr.push(floorInfo(x))
		})
		elems.set(arr)
	}
	function handClick(e) {
		console.log('Floor  Clicked', {
			floor: parseInt(e.detail.dataset.floor),
			...floorInfo(e.detail)
		})
	}
	onMount(() => {
		levels = ['', ...shuffle(levelNames)]
		getFloors()
	})

	$: if ($step) {
		getFloors($step)
	}

	$: console.log($elems);
</script>

{#if bg}
	<section class="bg-sky layer nwp" />
{/if}

<section
	bind:this={elem}
	class="stacked-building"
	style="--width: {width}px; --tx: {x}px;">
	{#each $floors as [id, x, y] (id)}
		{#if id <= $step}
			<StapleFloor
				{x}
				{id}
				level={levels[id]}
				show={id <= $step}
				on:click={handClick} />
		{:else}
			<div class="floor" />
		{/if}
	{/each}
</section>

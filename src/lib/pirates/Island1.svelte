<script>
	import { onMount } from 'svelte'
	import { sleep } from '../'
	export let islandObj = {}
	export let landPos = [0, 0]
	export let landed = false
	let map = {
		atlasCols: 16,
		cols: 6,
		rows: 4,
		tsize: 64,
		layers: [
			[
				3, 0, 0, 0, 0, 0, 20, 2, 2, 3, 0, 0, 0, 0, 0, 19, 63, 0, 0, 0, 0, 20, 2,
				3
			],
			[
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 69, 69, 0, 0, 0, 69, 69, 69, 0,
				0, 0
			],
			[
				0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 30, 47, 78, 0, 0, 0, 88, 0, 93, 47,
				94, 0
			],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		],
		getTile: function (layer, col, row) {
			return this.layers[layer][row * map.cols + col]
		}
	}

	let islandArr1 = []
	function drawLayer(map, layer) {
		let id = -1
		let arr = []
		for (let r = 0; r < map.rows; r++) {
			for (let c = 0; c < map.cols; c++) {
				id++
				const tile = map.getTile(layer, c, r)
				if (tile !== 0) {
					// 0 => empty tile
					const tileVal = tile - 1
					const sY = Math.floor(tileVal / map.atlasCols) * map.tsize
					const sX = (tileVal % map.atlasCols) * map.tsize
					const tX = c * map.tsize // target x
					const tY = r * map.tsize // target y
					const size = map.tsize
					arr.push({
						id,
						layer,
						tileVal,
						sX,
						sY,
						tX,
						tY,
						size
					})
				}
			}
		}
		return arr
	}

	onMount(async () => {
		console.log('Island 1', map.layers)
		islandArr1 = []
		map.layers.forEach((d, i) => {
			islandArr1.push(drawLayer(map, i))
		})
		await sleep(100)
		islandObj = document.querySelectorAll('.island1 .tile.collide')
		let landEl = document.querySelector('.island1 .tile.landing')
		let { x, y } = landEl.getBoundingClientRect()
		landPos[0] = x + 5
		landPos[1] = y - 5
	})
</script>

<article id="island1" class="island1">
	{#each islandArr1 as item}
		{#each item as data (data.id)}
			{#if data.layer != 3}
				<svelte:element
					this={data.layer == 0 ? 'div' : 'span'}
					data-layer={data.layer}
					data-id={data.id}
					class="tile"
					class:collide={data.layer == 0}
					style="--sz: {data.size}px; --sx: -{data.sX}px; --sy: -{data.sY}px; --tx: {data.tX}px; --ty: {data.tY}px;">
					<span class="sr-only">{data.id}</span>
				</svelte:element>
			{:else}
				<section
					data-layer={data.layer}
					data-id={data.id}
					class="tile landing"
					class:opacity-30={!landed}
					style="--sz: {data.size}px; --sx: -{data.sX}px; --sy: -{data.sY}px; --tx: {data.tX}px; --ty: {data.tY}px;">
					<span class="sr-only">{data.id}</span>
				</section>
			{/if}
		{/each}
	{/each}
</article>

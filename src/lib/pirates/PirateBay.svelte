<script>
	import { sleep } from '../'
	import { onMount } from 'svelte'
	import Island2 from './Island2.svelte'
	import Island1 from './Island1.svelte'
	let frameEl
	let shipEl
	let shipX = 20
	let shipY = 20
	let shipA = 0
	let stepSize = 32
	let offsetY = 0
	let landPos = {
		island1: [0, 0],
		island2: [0, 0]
	}
	let islandObj = { island1: [], island2: [] }
	let landed = { island1: false, island2: false }
	function onKeyDown(e) {
		switch (e.keyCode) {
			case 38:
				shipY -= stepSize
				shipA = 180
				check()
				break
			case 40:
				shipY += stepSize
				shipA = 0
				check()
				break
			case 37:
				shipX -= stepSize
				shipA = 90
				check()
				break
			case 39:
				shipX += stepSize
				shipA = 270
				check()
				break
		}
	}

	function checkParent() {
		const shipRec = shipEl.getBoundingClientRect()
		const frameRec = frameEl.getBoundingClientRect()
		let errors = []
		if (shipRec.top < frameRec.top) {
			errors.push('top')
			shipY = 0
		}
		if (shipRec.left < frameRec.left) {
			errors.push('left')
			shipX = 0
		}
		if (shipRec.bottom > frameRec.bottom) {
			errors.push('bottom')
			shipY = frameRec.height - shipRec.height
		}
		if (shipX > frameRec.width - shipRec.width) {
			errors.push('right')
			shipX = frameRec.width - shipRec.width
		}
		if (errors.length) console.log('OUTSIDE', errors)
	}

	function checkCollide(element, slug = 'island2') {
		const rect1 = shipEl.getBoundingClientRect()
		const rect2 = element.getBoundingClientRect()
		let collide = !(
			rect1.right < rect2.left ||
			rect1.left > rect2.right ||
			rect1.bottom < rect2.top ||
			rect1.top > rect2.bottom
		)
		if (collide) {
			landed[slug] = true
			shipX = landPos[slug][0]
			shipY = landPos[slug][1] - offsetY
			shipA = 0
		} else {
			if (landed[slug]) sleep(1500).then(() => (landed[slug] = false))
		}
	}

	async function check() {
		await sleep(300)
		checkParent()
		islandObj.island2.forEach((el) => checkCollide(el, 'island2'))
		islandObj.island1.forEach((el) => checkCollide(el, 'island1'))
	}

	onMount(() => {
		console.log('HI')
		offsetY = frameEl.getBoundingClientRect().top
		console.log({ offsetY })
	})
</script>

<section class="absolute inset-0 overflow-hidden ocean" bind:this={frameEl}>
	<Island1
		bind:islandObj={islandObj.island1}
		bind:landPos={landPos.island1}
		bind:landed={landed.island1} />
	<Island2
		bind:islandObj={islandObj.island2}
		bind:landPos={landPos.island2}
		bind:landed={landed.island2} />
	<div
		bind:this={shipEl}
		class="ship"
		style="left: {shipX}px; top: {shipY}px; --rot: {shipA}deg;" />
</section>

<svelte:window on:keydown|preventDefault={onKeyDown} />

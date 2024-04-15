<script>
	export let value = 0
	export let min = 21
	export let max = 42
	export let step = 1

	$: safeValue = clamp(min, max, value)

	function dec() {
		value = safeValue - step
	}

	function inc() {
		value = safeValue + step
	}

	const clamp = (min, max, v) => {
		if (v <= min) {
			return min
		}
		if (v >= max) {
			return max
		}

		return v
	}
</script>

<label>
	<span class="text">Min</span>
	<input type="number" bind:value={min} {max} />
</label>

<label>
	<span class="text">Max</span>
	<input type="number" bind:value={max} {min} />
</label>

<label>
	<span class="text">Step</span>
	<input type="number" bind:value={step} min={1} />
</label>

<div>
	<button on:click={dec}>-</button>
	<button on:click={inc}>+</button>
	<span class="count">{safeValue}</span>
</div>

<style>
	.count {
		display: inline-block;
		min-width: 32px;
		text-align: center;
	}

	.text {
		display: inline-block;
		min-width: 48px;
	}
</style>

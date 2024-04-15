<script>
	import { theme } from './'
	export let heading = 'IncreMental'
	export let sub = 'Settings'
	export let close
</script>

<div class="modal-box">
	<div class="space-y-1">
		<h3 class="font-bold text-2xl">
			{heading} <small class="italic font-light">{sub}</small>
		</h3>

		<label class="form-control w-full">
			<div class="label">
				<span class="label-text" />
				<span class="label-text-alt">Theme</span>
			</div>
			<select class="select select-bordered capitalize" bind:value={$theme}>
				{#each ['light', 'dark', 'cupcake', 'retro', 'cyberpunk', 'pastel', 'wireframe', 'dracula', 'dim', 'nord'] as item}
					<option value={item}>{item}</option>
				{/each}
			</select>
		</label>
	</div>

	<div class="modal-action">
		<form method="dialog">
			<button class="btn btn-info" on:click={close}>Save</button>
		</form>
	</div>
</div>

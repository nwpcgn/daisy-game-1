<script>
	import { theme, clickOutside, city, mayor } from '../../lib'
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
				<span class="label-text-alt">City</span>
			</div>
			<input
				bind:value={$city}
				type="text"
				class="input input-bordered w-full"
				placeholder="Gotham" />
		</label>
		<label class="form-control w-full">
			<div class="label">
				<span class="label-text" />
				<span class="label-text-alt">Mayor</span>
			</div>
			<input
				bind:value={$mayor}
				type="text"
				class="input input-bordered w-full"
				placeholder="Bruce Wayne" />
		</label>
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
			<button class="btn btn-info">Save</button>
		</form>
	</div>
</div>

<script>
	import { step } from './'
</script>

<footer>
	<div class="join">
		<button class="join-item btn btn-neutral" on:click={step.down}>
			<span class:opacity-20={$step <= 0}>«</span>
		</button>
		<label class="join-item btn btn-neutral no-animation">Step {$step}</label>
		<button class="join-item btn btn-neutral" on:click={step.up}>
			<span class:opacity-20={$step >= 7}>»</span>
		</button>
	</div>
</footer>

<script>
	import NwpLogo from '../lib/NwpLogo.svelte'
	import { path } from 'elegua'
	export let nav
</script>

<section class="center layer nwp">
	<article
		class="p-8 rounded-box bg-opacity-75 text-center bg-neutral bg-neutral-content">
		<div class="grid place-content-center">
			<NwpLogo size={200} />
		</div>
		<nav>
			<div class="join">
				{#each nav as [name, href]}
					{#if href !== $path}
						<a {href} class="btn join-item">{name}</a>
					{/if}
				{/each}
			</div>
		</nav>
	</article>
</section>

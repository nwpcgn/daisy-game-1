<script>
	import { openDialog } from '../lib/components'
	import Dialog2 from './rpg/Dialog1.svelte'
	import { res } from '../lib/rpg/rpg'
	let title = 'Gaming'
	function open() {
		openDialog(Dialog2, {})
	}
</script>

<section class="layer nwp">
	<article class="content">
		<header class="nwp-header">
			<h1>Nwp-Rpg</h1>
			<h4>{title}</h4>
		</header>
		<div class="text-sm breadcrumbs">
			<ul>
				<li><a href="/">Start</a></li>
				<li><button on:click={open}>Settings</button></li>
			</ul>
		</div>
		<article class="grid sm:grid-cols-2 gap-4">
			{#each Object.values($res) as { name, info, action, slug, max, total, clickInc }}
				<div class="card bg-base-100 shadow-xl">
					<div class="card-body">
						<h2 class="card-title">
							{name}
							<div class="ml-auto badge">{total}/{max}</div>
						</h2>
						<p>{info}</p>
						<p>{clickInc}/click</p>
						<div class="card-actions justify-end">
							<button on:click={res.click(slug)} class="btn btn-neutral"
								>{action}</button>
						</div>
						<progress class="progress w-full mt-2" value={total} {max} />
					</div>
				</div>
			{/each}
		</article>
	</article>
</section>

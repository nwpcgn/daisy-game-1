<script>
	import NwpLogo from './NwpLogo.svelte'
	import { openDialog } from './components/Dialog.svelte'
	import Settings from './Settings.svelte'
	import { path } from 'elegua'
	import { theme, clickOutside, offsetY } from './'
	export let nav
	let h = 64
	let open = false

	$: offsetY.set(h)
</script>

<header
	bind:clientHeight={h}
	class="navbar bg-neutral text-neutral-content">
	<div class="flex-1">
		<a href="/" class="btn btn-square btn-ghost"><NwpLogo size={48} /></a>
	</div>
	<div class="flex-none">
		<button
			class="btn btn-square btn-ghost"
			on:click={() => openDialog(Settings, {})}>
			<svg class="nwp-icon nwp-icon-20"><use xlink:href="#nwp-settings" /></svg>
		</button>
	</div>
	<div class="flex-none">
		<button class="btn btn-square btn-ghost" on:click={() => (open = true)}>
			<svg class="nwp-icon nwp-icon-20"><use xlink:href="#nwp-burger" /></svg>
		</button>
	</div>
</header>

{#if open}
	<div class="fixed inset-0 z-30 bg-black bg-opacity-40" />
{/if}

<aside
	use:clickOutside
	on:click_outside={() => (open = false)}
	class="fixed z-40 right-0 pr-4 transform transition-all duration-300 ease-in-out"
	class:translate-x-full={!open}
	style="top: {h + 10}px;">
	<ul class="menu bg-base-200 w-56 rounded-box">
		{#each nav as [name, href]}
			<li>
				<a {href}
					>{name}
					{#if href === '/'}
						{#if $path === href}
							<span class="badge badge-xs badge-info" />
						{/if}
					{:else if $path.includes(href)}
						<span class="badge badge-xs badge-info" />
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</aside>

<script context="module">
	import { get, writable } from 'svelte/store'

	let _open = writable(false)
	let _payload = writable({ component: undefined, props: {} })

	let _closePromise

	export const openDialog = (component, props = {}) => {
		_open.set(true)
		_payload.set({ component, props })
		return new Promise((resolve) => {
			_closePromise = resolve
		})
	}

	export const closeDialog = (response) => {
		_open.set(false)
		if (typeof _closePromise === 'function') {
			_closePromise(response ?? get(_payload))
		}
	}
</script>

<script>
	import DialogWrapp from './DialogWrapp.svelte'
</script>

{#if $_open}
	<DialogWrapp>
		<svelte:component
			this={$_payload.component}
			{...$_payload.props}
			close={closeDialog} />
	</DialogWrapp>
{/if}

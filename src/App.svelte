<script>
	import AppBar from './lib/AppBar.svelte'
	import SvgSprite from './lib/sprites/SvgSprite.svelte'
	import Auth from './routes/Auth.svelte'
	import Router from './Router.svelte'
	import { onMount } from 'svelte'
	import { stage, theme } from './lib'
	import { supabase, _user, getUser, signOut } from './lib/db'
	import Dialog from './lib/components/Dialog.svelte'
	let stageEl
	let ready = false
	let nav = [
		['Start', '/'],
		['Game', '/game'],
		['Rpg', '/rpg'],
		['Hsp', '/hsp'],
		['Staple', '/staple']
	]
	onMount(async () => {
		if (!stageEl) return
		stage.set(stageEl)
		const req = await getUser()
		_user.set(req)
		ready = true
	})
	supabase.auth.onAuthStateChange((event, session) => {
		if (event == 'SIGNED_IN') _user.set(session.user)
		else _user.set(null)
	})

	onMount(() => {})
</script>

<SvgSprite />

<AppBar {nav} />
<main bind:this={stageEl} class="main" data-theme={$theme}>
	{#if ready}
		{#if !$_user}
			<Auth />
		{:else}
			<Router {nav} />
		{/if}
	{/if}
	<Dialog />
</main>

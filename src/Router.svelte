<script>
	import { Start, Cookie, RpgGame, Hsp, Staple } from './routes'
	import { path } from 'elegua'
	export let nav = []
	$path = '/'
</script>

{#if $path === '/rpg'}
	<RpgGame />
{:else if $path === '/game'}
	<Cookie {nav} />
{:else if $path === '/rpg'}
	<RpgGame {nav} />
{:else if $path === '/hsp'}
	<Hsp {nav} />
{:else if $path === '/staple'}
	<Staple {nav} />
{:else}
	<Start {nav} />
{/if}

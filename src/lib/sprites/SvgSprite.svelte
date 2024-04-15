<script>
	// import RpgBuildSprite from './RpgBuildSprite.svelte'
	// import CityScapeSprite from './CityScapeSprite.svelte'
	import RpgSprite from './RpgSprite.svelte'
	export let data
	export let classNames = {
		'.nwp-icon': {
			display: 'inline-block',
			width: '1em',
			height: '1em',
			strokeWidth: 0,
			stroke: 'currentColor',
			fill: 'currentColor'
		}
	}
</script>

<!-- <RpgBuildSprite /> -->
<RpgSprite bind:data />

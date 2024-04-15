<script>
	// import { path, resolve, params } from 'elegua'
	import { supabase } from '../../lib/db'
	export let id
	const title = 'Nwp-Serien'
	let sub = ''
	const fetchSerie = async (id) => {
		try {
			const { data, error } = await supabase
				.from('hsp_main')
				.select(`*, hsp_serien(name)`)
				.eq('id_m', id)
				.order('ep', { ascending: true })
			if (data) {
				sub = data[0].hsp_serien.name
				return data
			}
		} catch (error) {
			return error
		}
	}

	let promise

	$: if (id) promise = fetchSerie(id)
</script>

<header class="nwp-header">
	<h1><a href="/hsp">{title}</a></h1>
	<h4>{sub}</h4>
</header>
{#await promise then value}
	<div>
		{#each value as { id, id_m, op, ep, titel, jahr, dauer, buch, imgUrl, extra, links, info, hsp_serien } (id)}
			<div class="flex items-center justify-between">
				<div>{titel}</div>
				<div class="badge badge-secondary">EP {ep < 10 ? '0' : ''}{ep}</div>
			</div>
		{/each}
	</div>
{/await}

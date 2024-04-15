<script>
	import SerienInfo from './SerienInfo.svelte'
	import TableRow from './TableRow.svelte'
	export let daten
	let dialogEl
	let detail = {
		id_m: 5,
		name: 'Balduin Pfiff',
		genre: 'Krimi',
		studio: 'Maritim',
		logo: 'https://nwp-cgn.de/img/hsp/logo/bpficon.jpg',
		card: 'https://nwp-cgn.de/img/hsp//logo/larry1.jpg',
		info: 'Als menschlicher Titelheld der 1970er Jahre war Balduin Pfiff ein ebenso aussergewoehnliches wie letzten Endes erfolgreiches Projekt.',
		count: 4
	}

	function handleSelect(event) {
		detail = event.detail
		if (dialogEl) dialogEl.showModal()
	}
</script>

<div class="relative shadow-mdx rounded-lgx">
	<table class="table">
		<thead>
			<tr>
				<td>Serie</td>
				<td>Genge</td>
				<td>Label</td>
				<td class="text-right">Episoden</td>
			</tr>
		</thead>
		<tbody>
			{#each daten as data}
				<TableRow {...data} on:select={handleSelect} />
			{/each}
		</tbody>
	</table>
</div>

<dialog bind:this={dialogEl} class="modal">
	<SerienInfo {...detail} />
</dialog>

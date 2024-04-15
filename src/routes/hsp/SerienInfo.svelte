<script>
	import { path } from 'elegua'
	export let id_m = 5
	export let name = 'Balduin Pfiff'
	export let genre = 'Krimi'
	export let studio = 'Maritim'
	export let logo = 'https://nwp-cgn.de/img/hsp/logo/bpficon.jpg'
	export let card = 'https://nwp-cgn.de/img/hsp//logo/larry1.jpg'
	export let info =
		'Als menschlicher Titelheld der 1970er Jahre war Balduin Pfiff ein ebenso aussergewoehnliches wie letzten Endes erfolgreiches Projekt.'
	export let count = 4

	function handleClick() {
		path.set(`/hsp/serie/${id_m}`)
	}
	function handleClose() {
		path.set(`/hsp`)
	}
</script>

<div class="modal-box">
	<section class="flex items-start">
		<div class="flex-1 flex flex-col gap-2">
			<h3 class="font-bold text-lg">{name}</h3>

			<div class="badge badge-neutral">{genre}</div>
			<div class="badge badge-accent">{studio}</div>
		</div>
		<div class="avatar">
			<div class="w-20 rounded">
				<img src={logo} />
			</div>
		</div>
	</section>

	<p class="py-4 leading-snug">{info}e</p>

	<div class="modal-action">
		<form method="dialog">
			<button on:click={handleClick} class="btn">Show List</button>
			<button on:click={handleClose} class="btn">Close</button>
		</form>
	</div>
</div>

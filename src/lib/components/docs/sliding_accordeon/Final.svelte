<script>
	import { slide } from 'svelte/transition'

	import { Accordion, AccordionGroup } from 'renderless-svelte'
</script>

<AccordionGroup>
	<Accordion>
		<button slot="header" let:toggle on:click={toggle}>Squirrel 🐿️</button>
		<div transition:slide>This is a text about Squirrels 🐿️</div>
	</Accordion>
	<Accordion>
		<button slot="header" let:toggle on:click={toggle}>Rabbit 🐇</button>
		<div transition:slide>This is a text about Rabbits 🐇</div>
	</Accordion>
	<Accordion>
		<button slot="header" let:toggle on:click={toggle}>Hamster 🐹</button>
		<div transition:slide>This is a text about Hamsters 🐹</div>
	</Accordion>
</AccordionGroup>

<style>
	button {
		border: 1px solid #ced4da;
		cursor: pointer;
		display: block;
		max-width: 400px;
		padding: 0.5rem 0.5rem;
		width: 100%;
	}

	button:not(:first-of-type) {
		margin-top: 0;
	}

	div {
		border: 1px solid #ced4da;
		border-top: 0;
		display: flex;
		margin-top: 0;
		max-width: 400px;
		padding: 1rem;
	}
</style>

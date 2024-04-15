<script>
	import { path, resolve, params } from 'elegua'
	import { sleep } from '../lib'
	import { supabase } from '../lib/db'
	import HspSerien from './hsp/HspSerien.svelte'
	import HspSerie from './hsp/HspSerie.svelte'
	import Loading from './hsp/Loading.svelte'
	const title = 'Nwp-Archiv'
	const sub = 'Hoerspiel Serien'
	let api = {
		openapi: '3.0.0',
		info: {
			version: '1',
			title: '',
			description: ''
		},
		paths: {
			'/data/hsp_serien/': {
				get: {
					operationId: '1',
					description: '',
					parameters: [],
					responses: {
						'200': {
							description: '',
							content: {
								'application/json': {
									schema: {
										type: 'string'
									}
								}
							}
						}
					}
				}
			}
		},
		components: {
			securitySchemes: {},
			schemas: {
				'hsp-serien': {
					properties: {
						id_m: {
							nullable: false,
							type: 'number'
						},
						op: {
							nullable: false,
							type: 'number'
						},
						name: {
							nullable: false,
							type: 'string'
						},
						genre: {
							nullable: false,
							type: 'string'
						},
						studio: {
							nullable: false,
							type: 'string'
						},
						logo: {
							nullable: true,
							type: 'string'
						},
						card: {
							nullable: true,
							type: 'string'
						},
						hsp_main: {
							nullable: true,
							type: 'array',
							items: {
								$ref: '#/components/schemas/hsp-serien-count'
							}
						}
					}
				},
				'hsp-serien-count': {
					properties: {
						count: {
							nullable: true,
							type: 'number'
						}
					}
				}
			}
		}
	}
	const fetchList = async () => {
		try {
			const { data, error } = await supabase
				.from('hsp_serien')
				.select(`*, hsp_main(count)`)
				.order('name', { ascending: true })
			if (data) {
				await sleep(1000)
				return data
			}
		} catch (error) {
			return error
		}
	}

	let promise = fetchList()
</script>

{#if resolve($path, '/hsp/serie/:serienId')}
	<section class="layer nwp">
		<article class="content">
			<HspSerie id={$params['serienId']} />
		</article>
	</section>
{:else}
	<section class="layer nwp">
		<article class="content">
			<header class="nwp-header">
				<h1>{title}</h1>
				<h4><a href="/hsp">{sub}</a></h4>
			</header>

			{#await promise}
				<Loading />
			{:then daten}
				<HspSerien {daten} />

				<details>
					<pre>{JSON.stringify(Object.keys(daten[0]).join(', '))}</pre>
					<pre>{JSON.stringify(daten[0], null, 2)}</pre>
				</details>
			{/await}
		</article>
	</section>
{/if}

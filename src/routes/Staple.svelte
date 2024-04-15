<script>
	import StapleCtrlBar from '../lib/staple/StapleCtrlBar.svelte'
	import StapleBuild from '../lib/staple/StapleBuild.svelte'
</script>

<StapleBuild width={400} x={10} />

<section class="absolute inset-y-0 right-0 w-1/2">
	<article class="p-8 rounded-box space-y-4 text-center">
		<div>
			<StapleCtrlBar />
		</div>
	</article>
</section>

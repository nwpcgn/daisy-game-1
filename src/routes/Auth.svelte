<script>
	import { _user, signIn } from '../lib/db'
	let email = '',
		password = ''

	function handleSubmit() {
		if (!email || !password) return

		signIn({ email, password })
	}
</script>

<section class="layer center nwp">
	<article class="content" style="--page-width: 320px;">
		<form class=" flex flex-col gap-4" on:submit|preventDefault={handleSubmit}>
			<input
				bind:value={email}
				placeholder="Email"
				type="email"
				class="input input-bordered"
				required />

			<input
				bind:value={password}
				placeholder="Password"
				type="password"
				class="input input-bordered"
				required />

			<button type="submit" class="btn btn-neutral rounded-full">Submit</button>
		</form>
	</article>
</section>

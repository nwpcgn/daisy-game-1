import { writable } from 'svelte/store'
// @index('./*.svelte', f => `export { default as ${f.name} } from '${f.path}${f.ext}'`)
export { default as StapleBuild } from './StapleBuild.svelte'
export { default as StapleCtrlBar } from './StapleCtrlBar.svelte'
// @endindex
function createStep() {
	const { subscribe, set, update } = writable(1)

	return {
		subscribe,
		up: () => update((n) => (n < 7 ? n + 1 : n)),
		down: () => update((n) => (n > 0 ? n - 1 : n)),
		goto: (int) => set(int),
		reset: () => set(0)
	}
}

export const step = createStep()
export const devMode = writable(false)
export const floors = writable([
	[1, 0, 0],
	[2, 10, 0],
	[3, 0, 0],
	[4, -10, 0],
	[5, 10, 0],
	[6, 0, 0],
	[7, -10, 0]
])
export const elems = writable([])

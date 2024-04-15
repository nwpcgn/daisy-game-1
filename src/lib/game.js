import { writable, derived } from 'svelte/store'
export const offsetY = writable(0)
export const stage = writable()
export const canvas = derived(stage, ($stage, set) => {
	if (!$stage) return
	const ro = new ResizeObserver(([entry]) => {
		let width = Math.floor(entry.contentRect.width),
			height = Math.floor(entry.contentRect.height)
		set({ width, height })
	})
	ro.observe($stage)
	return () => ro.disconnect()
})

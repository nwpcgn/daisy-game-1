import { writable, derived } from 'svelte/store'

class Setting {
	constructor(label, options) {
		this.label = label
		this.options = options
		this.selected = options[0]
	}
}

export const settings = writable([
	new Setting('speed', ['slow', 'medium', 'fast', 'extreme']),
	new Setting('sound', ['on', 'off']),
	new Setting('theme', ['light', 'dark']),
	new Setting('tiles', ['4', '6', '8'])
])

export const selectedSettings = derived(settings, ($settings) => {
	let obj = {}
	$settings.forEach((setting) => (obj[setting.label] = setting.selected))

	return obj
})

class Tile {
	constructor(label, color) {
		;(this.label = label), (this.color = color), (this.isActive = false)
	}
}

const tileArr = [
	new Tile('red', 'red'),
	new Tile('blue', 'blue'),
	new Tile('yellow', 'orange'),
	new Tile('green', 'green')
]
const tiles6 = [...tileArr, new Tile('gray', 'gray'), new Tile('pink', 'pink')]
const tiles8 = [
	...tileArr,
	new Tile('gray', 'gray'),
	new Tile('pink', 'pink'),
	new Tile('lightblue', 'lightblue'),
	new Tile('magenta', 'magenta')
]

export const tiles = derived(selectedSettings, ($selectedSettings) => {
	switch ($selectedSettings.tiles) {
		case '6':
			return tiles6
		case '8':
			return tiles8
		default:
			return tileArr
	}
})
// Trigger update at root
tiles.set = () => settings.update((x) => x)

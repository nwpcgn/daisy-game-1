import { writable, derived } from 'svelte/store'
import storage from '../util/storage'
let resource = {
	wood: {
		slug: 'wood',
		name: 'Wood',
		info: 'Brown stuff that grows on trees.',
		action: 'Chop',
		total: 0,
		clickInc: 1,
		autoInc: 0,
		chanceInc: 1,
		max: 100,
		storage: {
			total: 1,
			max: 100,
			cost: {
				wood: 50,
				stone: 50
			},
			costIncrease: 1.1
		}
	},
	iron: {
		slug: 'iron',
		name: 'Iron',
		info: 'Even harder stuff. Bit rusty.',
		action: 'Mine',
		total: 0,
		clickInc: 1,
		autoInc: 0,
		chanceInc: 1,
		max: 100,
		storage: {
			total: 1,
			max: 100,
			cost: {
				wood: 100,
				stone: 100
			},
			costIncrease: 1.1
		}
	},
	stone: {
		slug: 'stone',
		name: 'Stone',
		info: 'Hard stuff.',
		action: 'Mine',
		total: 0,
		clickInc: 1,
		autoInc: 0,
		chanceInc: 1,
		max: 100,
		storage: {
			total: 1,
			max: 100,
			cost: {
				wood: 50,
				stone: 50
			},
			costIncrease: 1.1
		},
		chance: {
			// Percent
			iron: 30
		}
	},
	food: {
		slug: 'food',
		name: 'Food',
		info: 'Can be cooked to provide nutrition.',
		action: 'Hunt',
		total: 0,
		clickInc: 1,
		autoInc: 0,
		chanceInc: 1,
		max: 100,
		storage: {
			total: 1,
			max: 100,
			cost: {
				wood: 50,
				iron: 50
			},
			costIncrease: 1.1
		}
	}
}

let workers = {
	lumberjack: {
		slug: 'lumberjack',
		name: 'Lumberjack',
		info: 'A person who likes to chop wood.',
		resource: 'wood',
		total: 0,
		autoInc: 1,
		cost: {
			food: 10
		},
		costIncrease: 1.1
	},
	miner: {
		slug: 'miner',
		name: 'Miner',
		info: 'Not a young person.',
		resource: 'stone',
		total: 0,
		autoInc: 1,
		cost: {
			food: 10
		},
		costIncrease: 1.1
	},
	digger: {
		slug: 'digger',
		name: 'Digger',
		info: 'A person, animal, or large machine that digs earth',
		resource: 'stone',
		total: 0,
		autoInc: 1,
		cost: {
			food: 10
		},
		costIncrease: 1.1
	},
	hunter: {
		slug: 'hunter',
		name: 'Hunter',
		info: 'The opposite to a gatherer.',
		resource: 'food',
		total: 0,
		autoInc: 1,
		cost: {
			food: 10
		},
		costIncrease: 1.1
	}
}

let buildings = {
	tent: {
		slug: 'tent',
		name: 'Tent',
		info: 'Just like a house but way smaller and made out of fabric.',
		total: 0,
		residents: 1,
		cost: {
			wood: 30
		},
		costIncrease: 1.1
	},
	house: {
		slug: 'house',
		name: 'House',
		info: 'Just like a tent but way bigger and not made out of fabric.',
		total: 0,
		residents: 4,
		cost: {
			wood: 75,
			iron: 10
		},
		costIncrease: 1.1
	},
	hostel: {
		slug: 'hostel',
		name: 'Hostel',
		info: 'A bit like a house but not as nice and not as private.',
		total: 0,
		residents: 10,
		cost: {
			wood: 200,
			iron: 200
		},
		costIncrease: 1.1
	}
}

let upgrades = {
	twoAxes: {
		name: 'Two Axes',
		info: 'Two wood per click.',
		cost: {
			wood: 200,
			stone: 100,
			food: 100
		},
		live: false,
		visible: true,
		nextTier: 'fiveAxes'
	},
	fiveAxes: {
		name: 'Five Axes',
		info: 'Five wood per click.',
		cost: {
			wood: 800,
			stone: 400,
			food: 400
		},
		live: false,
		visible: false,
		nextTier: 'tenAxes'
	},
	tenAxes: {
		name: 'Ten Axes',
		info: 'Ten wood per click.',
		cost: {
			wood: 2000,
			stone: 1000,
			food: 1000
			// bread: 100
		},
		live: false,
		visible: false
	},
	twoPickaxes: {
		name: 'Two Pickaxes',
		info: 'Two stone per click.',
		cost: {
			wood: 100,
			stone: 200,
			food: 100
		},
		live: false,
		visible: true,
		nextTier: 'fivePickaxes'
	},
	fivePickaxes: {
		name: 'Five Pickaxes',
		info: 'Five stone per click.',
		cost: {
			wood: 400,
			stone: 800,
			food: 400
		},
		live: false,
		visible: false,
		nextTier: 'tenPickaxes'
	},
	tenPickaxes: {
		name: 'Ten Pickaxes',
		info: 'Ten stone per click.',
		cost: {
			wood: 1000,
			stone: 2000,
			food: 1000
			// bread: 100
		},
		live: false,
		visible: false
	},
	twoArrows: {
		name: 'Two Arrows',
		info: 'Two food per click.',
		cost: {
			wood: 100,
			stone: 100,
			food: 200
		},
		live: false,
		visible: true,
		nextTier: 'fiveArrows'
	},
	fiveArrows: {
		name: 'Five Arrows',
		info: 'Five food per click.',
		cost: {
			wood: 400,
			stone: 400,
			food: 800
		},
		live: false,
		visible: false,
		nextTier: 'tenArrows'
	},
	tenArrows: {
		name: 'Ten Arrows',
		info: 'Ten food per click.',
		cost: {
			wood: 1000,
			stone: 1000,
			food: 2000
			// bread: 100
		},
		live: false,
		visible: false
	},

	biggerTents: {
		name: 'Bigger Tents',
		info: 'Tents built from now on can hold three people.',
		cost: {
			wood: 100,
			stone: 30,
			iron: 20,
			food: 200
		},
		live: false,
		visible: true
	}
}

export const maxPopulation = writable(0)
export const population = writable(0)
export const city = writable('')
export const mayor = writable('')
export const theme = storage('theme', 'light')
export const meta = deriveObject({
	maxPopulation,
	population,
	city,
	mayor,
	theme
})

function deriveObject(obj) {
	const keys = Object.keys(obj)
	const list = keys.map((key) => {
		return obj[key]
	})
	return derived(list, (array) => {
		return array.reduce((dict, value, i) => {
			dict[keys[i]] = value
			return dict
		}, {})
	})
}

function createRes() {
	const { subscribe, set, update } = writable(resource)

	return {
		subscribe,
		click: (slug) =>
			update((n) => {
				let { total, clickInc, max } = n[slug]
				let res = total + clickInc
				if (res > max) res = max

				n[slug].total = res
				return n
			}),
		auto: () =>
			update((n) => {
				let { total, autoInc, max } = n[slug]
				let res = total + autoInc
				if (res > max) res = max

				n[slug].total = res
				return n
			}),
		reset: () => set(resource)
	}
}

export const res = createRes()

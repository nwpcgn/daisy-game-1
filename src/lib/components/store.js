import { writable, derived } from 'svelte/store'

class Item {
	constructor(name, info, action) {
		this.name = name
		this.info = info
		this.action = action
	}
}

class Resource extends Item {
	constructor(name, info, action, total = 0, clickInc = 1, autoInc = 0) {
		super(name, info, action)
		this.total = total
		this.clickInc = clickInc
		this.autoInc = autoInc
	}
}

class ResourceStore {
	constructor() {
		this.obj = writable({})
	}
	add(slug, name, info, action, total = 0, clickInc = 1, autoInc = 0) {
		let object = {}
		object[slug] = new Resource(name, info, action, total, clickInc, autoInc)
		this.obj.update((v) => Object.assign(v, object))
	}
	click(slug) {
		this.obj.update((v) => {
			let no = v
			let o = v[slug]
			o.total += o.clickInc
			no[slug] = o
			return no
		})
	}
	subscribe(run) {
		return this.obj.subscribe(run)
	}
}

export const resources = new ResourceStore()

resources.add('wood', 'Wood', 'Wood Info', 'Cutting', 0, 1, 0)
resources.add('iron', 'Iron', 'Iron Info', 'Mining', 0, 1, 0)
resources.add('food', 'Food', 'Food Info', 'Hunting', 0, 1, 0)

// export const res = derived(resources, ($resources) => {
// 	let arr = []
// 	for (const key in $resources) {
// 		if (Object.hasOwnProperty.call($resources, key)) {
// 			const ob = Object.assign($resources[key], { slug: key })
// 			arr.push(ob)
// 		}
// 	}
// 	return arr
// })

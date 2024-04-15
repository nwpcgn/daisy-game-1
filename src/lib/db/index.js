import { writable } from 'svelte/store'
import supabase from './supabase'

const signIn = async ({ email, password }) => {
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		})
		if (error) throw new Error('Sign In failed')
		if (data) return data
	} catch (error) {
		console.error(error)
	}
}

const signOut = async () => {
	try {
		let { error } = await supabase.auth.signOut()
		if (!error) return true
		else throw new Error('logout failed')
	} catch (error) {
		alert(error)
	}
}

export async function getUser() {
	const {
		data: { user }
	} = await supabase.auth.getUser()
	if (user) return user
	else return null
}
export const _profil = writable(null)
export const _user = writable(null)
export { supabase, signIn, signOut }

/*  
supabase.auth.onAuthStateChange((event, session) => {
		if (event == 'SIGNED_IN') _user.set(session.user)
		else _user.set(null)
	})
*/

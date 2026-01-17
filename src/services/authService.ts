import supabase from '../utils/supabase'
import type { User } from '../types'

export const authService = {
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}`,
      },
    })

    if (error) throw error
    return data
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  },

  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data.user
  },

  onAuthStateChange(callback: (isAuthenticated: boolean, user: User | null) => void) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(!!session, session?.user || null)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }
}

import supabase from '../utils/supabase'
import type { Food } from '../types'
import { API_ENDPOINTS } from '../constants'

export const foodService = {
  async getFoodsByDate(userId: string, date: string) {
    const { data, error } = await supabase
      .from(API_ENDPOINTS.FOODS_TABLE)
      .select()
      .eq('user_id', userId)
      .eq('date', date)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async addFood(food: Omit<Food, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from(API_ENDPOINTS.FOODS_TABLE)
      .insert([food])
      .select()

    if (error) throw error
    return data?.[0] || null
  },

  async updateFood(id: number, updates: Partial<Food>) {
    const { data, error } = await supabase
      .from(API_ENDPOINTS.FOODS_TABLE)
      .update(updates)
      .eq('id', id)
      .select()

    if (error) throw error
    return data?.[0] || null
  },

  async deleteFood(id: number) {
    const { error } = await supabase
      .from(API_ENDPOINTS.FOODS_TABLE)
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async uploadImage(file: File): Promise<string | null> {
    try {
      const fileName = `${Date.now()}_${file.name}`
      const { error } = await supabase.storage
        .from(API_ENDPOINTS.FOOD_IMAGES_BUCKET)
        .upload(`foods/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      const { data } = supabase.storage
        .from(API_ENDPOINTS.FOOD_IMAGES_BUCKET)
        .getPublicUrl(`foods/${fileName}`)

      return data?.publicUrl || null
    } catch (err) {
      console.error('Image upload error:', err)
      throw err
    }
  }
}

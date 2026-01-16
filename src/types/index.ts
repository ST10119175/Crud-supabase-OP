export interface Food {
  id: number
  user_id: string
  name: string
  calories?: number
  date: string
  image_url?: string
  created_at?: string
  updated_at?: string
}

export interface User {
  id: string
  email: string
  user_metadata?: Record<string, any>
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface FoodState {
  foods: Food[]
  isLoading: boolean
  error: string | null
}

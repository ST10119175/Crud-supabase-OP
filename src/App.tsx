
import { useState, useEffect } from 'react'
import supabase from '../utils/supabase.ts'
import Auth from './components/Auth.tsx'
import './App.css'
import type { Food, User } from './types'

function FoodTracker() {
  const [foods, setFoods] = useState<Food[]>([])
  const [foodInput, setFoodInput] = useState('')
  const [caloriesInput, setCaloriesInput] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [userEmail, setUserEmail] = useState('')

  const fetchFoods = async () => {
    setLoading(true)
    try {
      const today = new Date().toISOString().split('T')[0]
      const { data: foods, error } = await supabase
        .from('foods')
        .select()
        .eq('date', today)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Fetch error:', error)
        alert('Error fetching foods: ' + error.message)
        return
      }

      if (foods) {
        setFoods(foods)
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      console.error('Fetch exception:', err)
      alert('Failed to fetch foods: ' + errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File) => {
    try {
      const fileName = `${Date.now()}_${file.name}`
      const { data, error } = await supabase.storage
        .from('food-images')
        .upload(`foods/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Upload error:', error)
        alert('Error uploading image: ' + error.message)
        return null
      }

      if (!data) {
        console.error('No data returned from upload')
        return null
      }

      const { data: urlData } = supabase.storage
        .from('food-images')
        .getPublicUrl(`foods/${fileName}`)

      return urlData?.publicUrl || null
    } catch (err) {
      console.error('Upload exception:', err)
      alert('Failed to upload image')
      return null
    }
  }

  const addFood = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!foodInput.trim()) {
      alert('Please enter a food name')
      return
    }

    if (foodInput.length > 100) {
      alert('Food name must be less than 100 characters')
      return
    }

    const calories = parseInt(caloriesInput) || 0
    if (calories < 0 || calories > 10000) {
      alert('Calories must be between 0 and 10000')
      return
    }

    setLoading(true)
    let imageUrl = null

    if (imageFile) {
      if (imageFile.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
        setLoading(false)
        return
      }
      imageUrl = await uploadImage(imageFile)
    }

    const today = new Date().toISOString().split('T')[0]

    // Check for duplicates
    const duplicate = foods.find(f => f.name.toLowerCase() === foodInput.toLowerCase() && f.date === today)
    if (duplicate && !editingId) {
      alert('You already logged this food today!')
      setLoading(false)
      return
    }

    if (editingId) {
      // Update food
      const { data, error } = await supabase
        .from('foods')
        .update({
          name: foodInput,
          calories: calories,
          image_url: imageUrl || undefined
        })
        .eq('id', editingId)
        .select()

      if (!error && data) {
        setFoods(foods.map(f => f.id === editingId ? data[0] : f))
        setEditingId(null)
      } else if (error) {
        alert('Error updating food: ' + error.message)
      }
    } else {
      // Create new food
      if (!user) {
        alert('You must be logged in to add food')
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('foods')
        .insert([
          {
            user_id: user.id,
            name: foodInput,
            calories: calories,
            date: today,
            image_url: imageUrl
          }
        ])
        .select()

      if (!error && data) {
        setFoods([data[0], ...foods])
      } else if (error) {
        alert('Error adding food: ' + error.message)
      }
    }

    setFoodInput('')
    setCaloriesInput('')
    setImageFile(null)
    setLoading(false)
  }

  const deleteFood = async (id: number) => {
    setLoading(true)
    await supabase.from('foods').delete().eq('id', id)
    setFoods(foods.filter(f => f.id !== id))
    setLoading(false)
  }

  const startEdit = (food: Food) => {
    setEditingId(food.id)
    setFoodInput(food.name)
    setCaloriesInput(food.calories?.toString() || '')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFoodInput('')
    setCaloriesInput('')
    setImageFile(null)
  }

  useEffect(() => {
    const loadFoods = async () => {
      await fetchFoods()
    }
    
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUser(session.user)
        setUserEmail(session.user.email || '')
        loadFoods()
      }
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user)
        setUserEmail(session.user.email || '')
      } else {
        setUser(null)
        setUserEmail('')
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setFoods([])
  }

  const totalCalories = foods.reduce((sum, food) => sum + (food.calories || 0), 0)

  if (!user) {
    return <Auth onAuthSuccess={() => {}} />
  }

  return (
    <div className="container">
      <div className="header">
        <div className="header-top">
          <h1>🥗 Nutrition Tracker</h1>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
        <p className="user-info">👤 {userEmail}</p>
        <p className="date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>Total Calories</h3>
          <p className="calories-total">{totalCalories}</p>
        </div>
        <div className="stat-card">
          <h3>Items Logged</h3>
          <p className="items-count">{foods.length}</p>
        </div>
      </div>

      <form onSubmit={addFood} className="form-container">
        <div className="form-group">
          <label>Food Item *</label>
          <input
            type="text"
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
            placeholder="e.g., Chicken Salad"
            required
          />
        </div>

        <div className="form-group">
          <label>Calories</label>
          <input
            type="number"
            value={caloriesInput}
            onChange={(e) => setCaloriesInput(e.target.value)}
            placeholder="0"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          {imageFile && <p className="file-name">📎 {imageFile.name}</p>}
        </div>

        <div className="button-group">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : editingId ? 'Update Food' : 'Add Food'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading && <p className="loading">Loading...</p>}

      <div className="foods-list">
        {foods.length === 0 ? (
          <p className="empty-state">No foods logged yet. Add one to get started!</p>
        ) : (
          foods.map((food) => (
            <div key={food.id} className="food-card">
              {food.image_url && (
                <img src={food.image_url} alt={food.name} className="food-image" />
              )}
              <div className="food-info">
                <h3>{food.name}</h3>
                {food.calories && <p className="calories">🔥 {food.calories} cal</p>}
              </div>
              <div className="food-actions">
                <button
                  onClick={() => startEdit(food)}
                  className="btn-edit"
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFood(food.id)}
                  className="btn-delete"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default FoodTracker

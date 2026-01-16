import { VALIDATION, ERROR_MESSAGES } from '../constants'

export const validators = {
  validateFoodName(name: string): { valid: boolean; error?: string } {
    if (!name.trim()) {
      return { valid: false, error: ERROR_MESSAGES.FOOD_NAME_REQUIRED }
    }
    if (name.length > VALIDATION.FOOD_NAME_MAX_LENGTH) {
      return { valid: false, error: ERROR_MESSAGES.FOOD_NAME_TOO_LONG }
    }
    return { valid: true }
  },

  validateCalories(calories: number): { valid: boolean; error?: string } {
    if (calories < VALIDATION.MIN_CALORIES || calories > VALIDATION.MAX_CALORIES) {
      return { valid: false, error: ERROR_MESSAGES.CALORIES_INVALID }
    }
    return { valid: true }
  },

  validateImageFile(file: File): { valid: boolean; error?: string } {
    const maxSizeBytes = VALIDATION.MAX_IMAGE_SIZE_MB * 1024 * 1024
    if (file.size > maxSizeBytes) {
      return { valid: false, error: ERROR_MESSAGES.IMAGE_TOO_LARGE }
    }
    return { valid: true }
  },

  validateEmail(email: string): { valid: boolean; error?: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { valid: false, error: 'Invalid email format' }
    }
    return { valid: true }
  },

  validatePassword(password: string): { valid: boolean; error?: string } {
    if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
      return { valid: false, error: `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters` }
    }
    return { valid: true }
  }
}

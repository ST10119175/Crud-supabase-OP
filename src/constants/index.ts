// Validation constants
export const VALIDATION = {
  FOOD_NAME_MAX_LENGTH: 100,
  MIN_CALORIES: 0,
  MAX_CALORIES: 10000,
  MAX_IMAGE_SIZE_MB: 5,
  MIN_PASSWORD_LENGTH: 6,
} as const

// Error messages
export const ERROR_MESSAGES = {
  FOOD_NAME_REQUIRED: 'Please enter a food name',
  FOOD_NAME_TOO_LONG: `Food name must be less than ${VALIDATION.FOOD_NAME_MAX_LENGTH} characters`,
  CALORIES_INVALID: `Calories must be between ${VALIDATION.MIN_CALORIES} and ${VALIDATION.MAX_CALORIES}`,
  IMAGE_TOO_LARGE: `Image size must be less than ${VALIDATION.MAX_IMAGE_SIZE_MB}MB`,
  DUPLICATE_FOOD: 'You already logged this food today!',
  FETCH_FOODS_ERROR: 'Error fetching foods',
  ADD_FOOD_ERROR: 'Error adding food',
  UPDATE_FOOD_ERROR: 'Error updating food',
  DELETE_FOOD_ERROR: 'Error deleting food',
  UPLOAD_IMAGE_ERROR: 'Error uploading image',
  LOGIN_ERROR: 'Invalid email or password',
  SIGNUP_ERROR: 'Error creating account',
  LOGOUT_ERROR: 'Error logging out',
} as const

// API endpoints
export const API_ENDPOINTS = {
  FOODS_TABLE: 'foods',
  FOOD_IMAGES_BUCKET: 'food-images',
} as const

// UI constants
export const UI_CONSTANTS = {
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
} as const

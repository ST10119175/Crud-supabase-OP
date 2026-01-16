# Nutrition Tracker 🥗

A full-stack nutrition tracking app built with React, TypeScript, Vite, and Supabase.

## Features

- 🔐 **User Authentication** - Email-based signup/login
- 📊 **Food Logging** - Track daily food intake with calories
- 🖼️ **Image Upload** - Upload and store food photos
- ✏️ **CRUD Operations** - Create, read, update, delete foods
- 📱 **Responsive Design** - Works on desktop and mobile
- 🔒 **Data Privacy** - Row-level security policies
- ✅ **Input Validation** - Client-side validation with error messages

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Auth.tsx        # Authentication component
│   └── Auth.css        # Auth component styles
├── pages/              # Page components
├── services/           # API/Business logic
│   ├── authService.ts  # Authentication service
│   └── foodService.ts  # Food CRUD service
├── types/              # TypeScript type definitions
│   └── index.ts        # All types
├── constants/          # Application constants
│   └── index.ts        # Validation rules, messages, etc.
├── utils/              # Utility functions
│   ├── supabase.ts     # Supabase client
│   └── validators.ts   # Validation functions
├── App.tsx             # Main app component
├── App.css             # Main styles
└── main.tsx            # React entry point
```

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Supabase account

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**
Create `.env.local` in the project root:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

3. **Set up the database**
- Run `migration-add-user-id.sql` in Supabase SQL Editor

4. **Create storage bucket**
- Go to Supabase Storage
- Create `food-images` bucket and make it public

5. **Start development server**
```bash
npm run dev
```

## Database Schema

### Foods Table
```sql
- id (BigInt, Primary Key)
- user_id (UUID, Foreign Key)
- name (Text, Required)
- calories (Integer, Default 0)
- date (Date, Required)
- image_url (Text, Optional)
- created_at (Timestamp)
- updated_at (Timestamp)
```

## Scripts

```bash
npm run dev      # Development
npm run build    # Build
npm run preview  # Preview production
npm run lint     # Lint
```

## Validation Rules

- **Food name**: 1-100 characters, required
- **Calories**: 0-10000
- **Image size**: Max 5MB
- **Duplicates**: Can't add same food twice on same day

## Technologies

- React 18, TypeScript, Vite
- Supabase (PostgreSQL, Auth, Storage)
- CSS3 with responsive design

## License

MIT// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# Nutrition Tracker 🥗

A modern, full-stack nutrition tracking application built with **React**, **TypeScript**, **Vite**, and **Supabase**.

## 🎯 Overview

Nutrition Tracker is a web application that helps users log their daily food intake, track calories, and manage their nutrition goals. With user authentication, image uploads, and real-time database synchronization, it provides a seamless experience for health-conscious individuals.

## ✨ Features

- **🔐 User Authentication**
  - Email-based sign up and sign in
  - Secure session management
  - Password validation

- **📊 Food Logging**
  - Add, update, and delete food entries
  - Track calorie intake
  - Filter foods by date
  - Real-time calorie totals

- **🖼️ Image Upload**
  - Upload food photos (up to 5MB)
  - Automatic storage in cloud
  - Quick visual reference for meals

- **✏️ Full CRUD Operations**
  - Create new food entries
  - Read/view logged foods
  - Update existing entries
  - Delete foods with confirmation

- **📱 Responsive Design**
  - Mobile-first design
  - Desktop-optimized layout
  - Beautiful gradient UI
  - Smooth animations

- **🔒 Data Privacy**
  - Row-Level Security (RLS) policies
  - User data isolation
  - Secure API endpoints

- **✅ Input Validation**
  - Client-side validation
  - Error messages with solutions
  - Duplicate prevention
  - File size limits

## 📋 Prerequisites

- **Node.js** 16.0 or higher
- **npm** 7.0 or higher
- **Supabase** account (free tier available)
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
cd "Crud supabase"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Get these from:**
1. Go to [Supabase Dashboard](https://supabase.com)
2. Select your project
3. Navigate to **Settings → API**
4. Copy **Project URL** and **anon key**

### 4. Set Up Database

1. Go to **SQL Editor** in Supabase
2. Run the SQL from `migration-add-user-id.sql`
3. This creates the `foods` table with proper schema

### 5. Create Storage Bucket

1. Go to **Storage** in Supabase
2. Click **New Bucket**
3. Name it `food-images`
4. Toggle **Public** on
5. Done!

### 6. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth.tsx              # Authentication UI component
│   ├── Auth.css              # Auth component styles
├── pages/                    # Page-level components
├── services/
│   ├── authService.ts        # Authentication API calls
│   ├── foodService.ts        # Food CRUD operations
├── types/
│   └── index.ts              # TypeScript type definitions
├── constants/
│   └── index.ts              # Validation rules & constants
├── utils/
│   ├── supabase.ts           # Supabase client initialization
│   ├── validators.ts         # Validation helper functions
├── App.tsx                   # Main application component
├── App.css                   # Global styles
├── main.tsx                  # React entry point
└── index.css                 # Base styles
```

## 🗄️ Database Schema

### foods table
```sql
Column          Type                    Constraints
────────────────────────────────────────────────────────
id              bigint                  PRIMARY KEY
user_id         uuid                    FOREIGN KEY → auth.users
name            text                    NOT NULL
calories        integer                 DEFAULT 0
date            date                    NOT NULL
image_url       text                    (optional)
created_at      timestamp with tz       DEFAULT now()
updated_at      timestamp with tz       DEFAULT now()
```

### Indexes
- `foods_user_id_idx` - Fast user lookups
- `foods_date_idx` - Fast date filtering
- `foods_created_at_idx` - Sort by creation time

### Row Level Security (RLS)
- ✅ Users can **SELECT** only their own foods
- ✅ Users can **INSERT** only their own foods
- ✅ Users can **UPDATE** only their own foods
- ✅ Users can **DELETE** only their own foods

## 🎯 Validation Rules

| Field | Rules |
|-------|-------|
| **Food Name** | 1-100 characters, required |
| **Calories** | 0-10000, must be a number |
| **Image** | Max 5MB, PNG/JPEG/WebP |
| **Email** | Valid email format |
| **Password** | Min 6 characters |
| **Duplicates** | Can't add same food twice per day |

## 🔧 Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 📚 API Integration

### Authentication Endpoints (Supabase Auth)
- `POST /auth/v1/signup` - Create new account
- `POST /auth/v1/token` - Sign in
- `POST /auth/v1/logout` - Sign out

### Food Endpoints (Supabase REST API)
- `GET /rest/v1/foods` - Fetch foods for today
- `POST /rest/v1/foods` - Add new food
- `PATCH /rest/v1/foods` - Update food
- `DELETE /rest/v1/foods` - Delete food

### Storage Endpoints
- `POST /storage/v1/object/food-images` - Upload image
- `GET /storage/v1/object/public/food-images/*` - Retrieve image

## 🛡️ Security Features

- ✅ **Row-Level Security** - Database-enforced data isolation
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **Input Validation** - Client-side form validation
- ✅ **Type Safety** - Full TypeScript type checking
- ✅ **Error Handling** - Comprehensive error catching
- ✅ **Secure Storage** - Public bucket for images only

## 🎨 UI/UX Features

- **Gradient Background** - Beautiful purple gradient
- **Smooth Animations** - Slide-in effects on page load
- **Cards Layout** - Modern card-based design
- **Form Validation** - Real-time field validation
- **Loading States** - User feedback during operations
- **Error Messages** - Clear, actionable error alerts
- **Responsive Grid** - Mobile-first responsive design

## 🚨 Troubleshooting

### "Failed to fetch" Error
- ✅ Check `.env.local` has correct Supabase credentials
- ✅ Restart dev server: `npm run dev`
- ✅ Clear browser cache (Ctrl+Shift+Delete)

### "400 Bad Request" Error
- ✅ Verify `foods` table exists with correct schema
- ✅ Run `migration-add-user-id.sql` in SQL Editor
- ✅ Check RLS policies are enabled

### "RLS Policy Violation" Error
- ✅ Ensure user is authenticated
- ✅ Check RLS policies in Supabase → Tables → foods
- ✅ Verify `user_id` column exists in foods table

### Image Upload Fails
- ✅ Check file size is under 5MB
- ✅ Verify `food-images` bucket exists and is public
- ✅ Check storage RLS policies allow uploads

### "Module not found" Error
- ✅ Run `npm install` to install dependencies
- ✅ Verify import paths match file locations
- ✅ Check TypeScript paths in `tsconfig.json`

## 📦 Dependencies

### Core
- `react` 18.x - UI library
- `typescript` - Type safety
- `vite` - Build tool

### Backend
- `@supabase/supabase-js` - Supabase client

### Development
- `@types/react` - React type definitions
- `@types/react-dom` - React DOM types
- `@vitejs/plugin-react` - Vite React plugin
- `typescript` - TypeScript compiler

## 🔄 Git Workflow

```bash
# Check if repository exists
git status

# Initialize new repository (if needed)
git init

# Add files
git add .

# Commit changes
git commit -m "feat: add nutrition tracker"

# Push to remote
git push origin main
```

## 📈 Performance Optimizations

- ✅ Lazy loading of images
- ✅ Debounced API calls
- ✅ Database indexing for fast queries
- ✅ Efficient re-renders with React hooks
- ✅ CSS animations with GPU acceleration

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Push code to GitHub
2. Connect repo to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy!

### Environment Variables for Production
```
VITE_SUPABASE_URL=your_production_url
VITE_SUPABASE_ANON_KEY=your_production_key
```

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Guide](https://www.postgresql.org/docs)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Future Features

- [ ] Daily calorie goals and progress bars
- [ ] Meal categories (Breakfast, Lunch, Dinner, Snacks)
- [ ] Macros tracking (Protein, Carbs, Fats)
- [ ] Weekly and monthly reports
- [ ] Export data as CSV/PDF
- [ ] Offline support (PWA)
- [ ] Meal templates and favorites
- [ ] Social sharing
- [ ] Dark mode toggle
- [ ] Push notifications

## 🐛 Report Issues

Found a bug? Please create an issue with:
- Clear title
- Detailed description
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information

## 📧 Support

For questions or support, please:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review existing GitHub issues
3. Create a new GitHub issue

---

**Made with ❤️ using React, TypeScript, and Supabase**

Last Updated: January 16, 2026

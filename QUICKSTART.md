# Mind-Connect - Quick Start Guide

## Project Overview

Mind-Connect is a comprehensive mental health application built specifically for primary and secondary school students (ages 5-18). It combines mood tracking, inspirational content, mental health exercises, community support, and professional doctor access in a child-friendly interface.

## Getting Started

### 1. Database Setup

**IMPORTANT: You must set up your database first!**

1. Open `setup_database.sql` file in your project root
2. Go to your Supabase project dashboard
3. Navigate to SQL Editor
4. Copy and paste the entire contents of `setup_database.sql`
5. Click "Run" to execute the script

This creates all 7 tables with proper security policies:
- profiles
- mood_entries
- testimonies
- testimony_likes
- personal_victories
- gratitude_entries
- doctor_bookings

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── App.tsx                          # Main app component
├── components/
│   ├── Auth.tsx                    # Login/signup page
│   ├── Dashboard.tsx               # Main dashboard navigation
│   ├── HomeView.tsx                # Home page with feature overview
│   ├── MoodTracker.tsx             # Daily mood tracking
│   ├── Quotes.tsx                  # Inspirational quotes
│   ├── Books.tsx                   # Book recommendations
│   ├── DoctorBooking.tsx           # Doctor appointment booking
│   ├── Exercises.tsx               # Mental health activities hub
│   ├── exercises/
│   │   ├── BreathingExercise.tsx  # Guided breathing
│   │   ├── StressGames.tsx        # Stress relief games
│   │   ├── Affirmations.tsx       # Positive affirmations
│   │   ├── GratitudeJournal.tsx   # Gratitude entries
│   │   └── MusicTherapy.tsx       # Music playlists
│   ├── Testimonies.tsx            # Community stories
│   └── Victories.tsx              # Achievement tracking
├── contexts/
│   └── AuthContext.tsx            # Authentication state
├── lib/
│   └── supabase.ts               # Supabase client & types
└── main.tsx                       # Entry point
```

## Features

### Core Features
- **Authentication** - Secure student accounts with age verification
- **Mood Tracking** - Daily emotional check-ins with streak counter
- **Inspirational Quotes** - 15+ motivational quotes with favorites
- **Book Recommendations** - 8+ psychology books with filtering

### Mental Health Tools
- **Breathing Exercises** - Guided 4-4-4 box breathing
- **Stress Games** - Interactive shape matching game
- **Affirmations** - 20+ positive affirmations
- **Gratitude Journal** - Daily gratitude entries
- **Music Therapy** - 6 curated playlists

### Community & Support
- **Doctor Booking** - Schedule appointments with qualified doctors
- **Testimonies** - Share and read inspiring student stories
- **Personal Victories** - Track and celebrate achievements

## Key Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Backend & Database
- **Vite** - Build tool
- **Lucide React** - Icons

## Database Tables

### profiles
Student profiles with name, age, and avatar color

### mood_entries
Daily mood logs with intensity (1-5) and optional notes

### testimonies & testimony_likes
Community posts and like system for peer support

### personal_victories
Achievement tracking across 4 categories

### gratitude_entries
Daily gratitude journal entries

### doctor_bookings
Appointment scheduling with qualified doctors

## Security

All tables have Row Level Security (RLS) enabled:
- Students can only access their own private data
- Community features (testimonies) visible to all authenticated users
- Proper foreign key constraints
- Automatic timestamps on all records

## Customization

### Add More Doctors
Edit `src/components/DoctorBooking.tsx` - doctors array

### Add More Quotes
Edit `src/components/Quotes.tsx` - localQuotes array

### Add More Books
Edit `src/components/Books.tsx` - booksData array

### Add More Affirmations
Edit `src/components/exercises/Affirmations.tsx` - affirmations array

### Modify Colors
Colors are defined using Tailwind CSS. Edit gradient colors in component className props (e.g., `from-blue-400 to-cyan-500`)

## Troubleshooting

### "Not logged in" error
- Ensure database is set up (see step 1)
- Check that auth.users table exists in Supabase

### Mood tracking not working
- Verify profiles table was created
- Check that you have user authentication set up

### Styles not showing
- Run `npm run build` to regenerate CSS
- Clear browser cache

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Environment Variables

The app uses environment variables from `.env`:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

These are automatically configured.

## Support

For questions about:
- **Mental health resources** - Check FEATURES.md
- **Database setup** - Check DATABASE_SETUP.md
- **Components** - View individual files in src/components
- **TypeScript types** - Check src/lib/supabase.ts

## Next Steps

1. Set up database (setup_database.sql)
2. Run `npm install`
3. Run `npm run dev`
4. Create account and start using the app!

Happy mental health journey with Mind-Connect!

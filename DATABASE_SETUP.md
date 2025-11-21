# Database Setup Instructions

## Setting Up Your Database

To set up the Mind-Connect database, you'll need to run the SQL script located at `setup_database.sql` in your Supabase SQL Editor.

### Steps:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `setup_database.sql` (in the project root directory)
4. Run the script

This will create all necessary tables with proper Row Level Security policies:

- `profiles` - User profiles with names and avatar colors
- `mood_entries` - Daily mood tracking with intensity and notes
- `testimonies` - Community posts and stories
- `testimony_likes` - Like system for testimonies
- `personal_victories` - Achievement tracking
- `gratitude_entries` - Gratitude journal entries
- `doctor_bookings` - Appointment scheduling system

All tables have:
- Proper RLS policies to protect user data
- Indexes for optimal performance
- Foreign key constraints for data integrity
- Appropriate default values

## Features Included

Your Mind-Connect application includes:

1. **Authentication** - Secure sign up and login
2. **Mood Tracking** - Daily mood logging with streak counter
3. **Inspiring Quotes** - Motivational quotes library
4. **Book Recommendations** - Psychology books for students
5. **Doctor Booking** - Schedule sessions with qualified doctors
6. **Mental Health Exercises**:
   - Breathing exercises with guided timing
   - Stress-relief games
   - Positive affirmations
   - Gratitude journal
   - Music therapy playlists
7. **Community Testimonies** - Share and read inspiring stories
8. **Personal Victories** - Track achievements and milestones

All data is securely stored in Supabase with proper security policies ensuring students can only access their own private data, while community features like testimonies are visible to all authenticated users.

/*
  # Mind-Connect Database Schema

  ## Overview
  Creates the complete database structure for Mind-Connect, a mental health application for primary and secondary students.

  ## New Tables

  ### 1. `profiles`
  - `id` (uuid, references auth.users)
  - `full_name` (text) - Student's full name
  - `age` (integer) - Student's age
  - `avatar_color` (text) - Personalized avatar color
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last profile update

  ### 2. `mood_entries`
  - `id` (uuid, primary key) - Unique entry identifier
  - `user_id` (uuid, references profiles) - Student who logged the mood
  - `mood` (text) - Emotion selected (happy, sad, excited, anxious, calm, angry, tired, grateful)
  - `intensity` (integer) - Mood intensity level (1-5)
  - `note` (text, optional) - Optional note about the mood
  - `created_at` (timestamptz) - When mood was logged

  ### 3. `testimonies`
  - `id` (uuid, primary key) - Unique testimony identifier
  - `user_id` (uuid, references profiles) - Student who posted
  - `content` (text) - Testimony content
  - `is_anonymous` (boolean) - Whether to show name or not
  - `likes_count` (integer) - Number of likes
  - `created_at` (timestamptz) - Post timestamp

  ### 4. `testimony_likes`
  - `id` (uuid, primary key) - Unique like identifier
  - `testimony_id` (uuid, references testimonies) - Liked testimony
  - `user_id` (uuid, references profiles) - Student who liked
  - `created_at` (timestamptz) - Like timestamp

  ### 5. `personal_victories`
  - `id` (uuid, primary key) - Unique victory identifier
  - `user_id` (uuid, references profiles) - Student who achieved victory
  - `title` (text) - Victory title
  - `description` (text, optional) - Victory details
  - `category` (text) - Category (academic, social, personal, health)
  - `created_at` (timestamptz) - Victory timestamp

  ### 6. `gratitude_entries`
  - `id` (uuid, primary key) - Unique entry identifier
  - `user_id` (uuid, references profiles) - Student who wrote entry
  - `content` (text) - What they're grateful for
  - `created_at` (timestamptz) - Entry timestamp

  ### 7. `doctor_bookings`
  - `id` (uuid, primary key) - Unique booking identifier
  - `user_id` (uuid, references profiles) - Student booking session
  - `doctor_name` (text) - Selected doctor's name
  - `specialty` (text) - Doctor's specialty
  - `appointment_date` (date) - Scheduled date
  - `appointment_time` (text) - Scheduled time
  - `reason` (text) - Reason for booking
  - `status` (text) - Booking status (pending, confirmed, completed, cancelled)
  - `created_at` (timestamptz) - Booking creation time

  ## Security
  - Enables Row Level Security on all tables
  - Policies ensure students can only access their own data
  - Testimonies are readable by all authenticated users
  - Students can like testimonies once per testimony

  ## Important Notes
  1. All tables use UUIDs for primary keys
  2. Foreign keys maintain referential integrity
  3. Timestamps track when records are created
  4. RLS policies are restrictive by default
  5. Indexes improve query performance
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text NOT NULL,
  age integer,
  avatar_color text DEFAULT '#10B981',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create mood_entries table
CREATE TABLE IF NOT EXISTS mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  mood text NOT NULL,
  intensity integer DEFAULT 3 CHECK (intensity >= 1 AND intensity <= 5),
  note text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own mood entries" ON mood_entries;
CREATE POLICY "Users can view own mood entries"
  ON mood_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own mood entries" ON mood_entries;
CREATE POLICY "Users can insert own mood entries"
  ON mood_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own mood entries" ON mood_entries;
CREATE POLICY "Users can update own mood entries"
  ON mood_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own mood entries" ON mood_entries;
CREATE POLICY "Users can delete own mood entries"
  ON mood_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

DROP INDEX IF EXISTS mood_entries_user_date_idx;
CREATE INDEX mood_entries_user_date_idx ON mood_entries(user_id, created_at DESC);

-- Create testimonies table
CREATE TABLE IF NOT EXISTS testimonies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_anonymous boolean DEFAULT false,
  likes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view testimonies" ON testimonies;
CREATE POLICY "Anyone can view testimonies"
  ON testimonies FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can insert own testimonies" ON testimonies;
CREATE POLICY "Users can insert own testimonies"
  ON testimonies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own testimonies" ON testimonies;
CREATE POLICY "Users can update own testimonies"
  ON testimonies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own testimonies" ON testimonies;
CREATE POLICY "Users can delete own testimonies"
  ON testimonies FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

DROP INDEX IF EXISTS testimonies_created_at_idx;
CREATE INDEX testimonies_created_at_idx ON testimonies(created_at DESC);

-- Create testimony_likes table
CREATE TABLE IF NOT EXISTS testimony_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  testimony_id uuid NOT NULL REFERENCES testimonies(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(testimony_id, user_id)
);

ALTER TABLE testimony_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view testimony likes" ON testimony_likes;
CREATE POLICY "Anyone can view testimony likes"
  ON testimony_likes FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can insert own likes" ON testimony_likes;
CREATE POLICY "Users can insert own likes"
  ON testimony_likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own likes" ON testimony_likes;
CREATE POLICY "Users can delete own likes"
  ON testimony_likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create personal_victories table
CREATE TABLE IF NOT EXISTS personal_victories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE personal_victories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own victories" ON personal_victories;
CREATE POLICY "Users can view own victories"
  ON personal_victories FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own victories" ON personal_victories;
CREATE POLICY "Users can insert own victories"
  ON personal_victories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own victories" ON personal_victories;
CREATE POLICY "Users can update own victories"
  ON personal_victories FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own victories" ON personal_victories;
CREATE POLICY "Users can delete own victories"
  ON personal_victories FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

DROP INDEX IF EXISTS personal_victories_user_date_idx;
CREATE INDEX personal_victories_user_date_idx ON personal_victories(user_id, created_at DESC);

-- Create gratitude_entries table
CREATE TABLE IF NOT EXISTS gratitude_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gratitude_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own gratitude entries" ON gratitude_entries;
CREATE POLICY "Users can view own gratitude entries"
  ON gratitude_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own gratitude entries" ON gratitude_entries;
CREATE POLICY "Users can insert own gratitude entries"
  ON gratitude_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own gratitude entries" ON gratitude_entries;
CREATE POLICY "Users can update own gratitude entries"
  ON gratitude_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own gratitude entries" ON gratitude_entries;
CREATE POLICY "Users can delete own gratitude entries"
  ON gratitude_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

DROP INDEX IF EXISTS gratitude_entries_user_date_idx;
CREATE INDEX gratitude_entries_user_date_idx ON gratitude_entries(user_id, created_at DESC);

-- Create doctor_bookings table
CREATE TABLE IF NOT EXISTS doctor_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  doctor_name text NOT NULL,
  specialty text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  reason text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE doctor_bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own bookings" ON doctor_bookings;
CREATE POLICY "Users can view own bookings"
  ON doctor_bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own bookings" ON doctor_bookings;
CREATE POLICY "Users can insert own bookings"
  ON doctor_bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own bookings" ON doctor_bookings;
CREATE POLICY "Users can update own bookings"
  ON doctor_bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own bookings" ON doctor_bookings;
CREATE POLICY "Users can delete own bookings"
  ON doctor_bookings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

DROP INDEX IF EXISTS doctor_bookings_user_date_idx;
CREATE INDEX doctor_bookings_user_date_idx ON doctor_bookings(user_id, appointment_date DESC);

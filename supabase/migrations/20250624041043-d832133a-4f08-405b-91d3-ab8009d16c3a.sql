
-- Create tables for storing user fitness data
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  age INTEGER,
  weight DECIMAL,
  height DECIMAL,
  fitness_goal TEXT,
  activity_level TEXT,
  dietary_preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for food entries with AI analysis
CREATE TABLE IF NOT EXISTS public.food_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  food_name TEXT NOT NULL,
  calories INTEGER,
  protein DECIMAL,
  carbs DECIMAL,
  fats DECIMAL,
  meal_type TEXT,
  date DATE DEFAULT CURRENT_DATE,
  ai_analyzed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for workout entries
CREATE TABLE IF NOT EXISTS public.workout_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_name TEXT NOT NULL,
  sets INTEGER,
  reps INTEGER,
  weight DECIMAL,
  duration INTEGER,
  calories_burned INTEGER,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for AI-generated recommendations
CREATE TABLE IF NOT EXISTS public.ai_recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recommendation_type TEXT NOT NULL,
  content JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own profiles" ON public.user_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own food entries" ON public.food_entries
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own workout entries" ON public.workout_entries
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own recommendations" ON public.ai_recommendations
  FOR ALL USING (auth.uid() = user_id);

-- Enable realtime for all tables
ALTER TABLE public.user_profiles REPLICA IDENTITY FULL;
ALTER TABLE public.food_entries REPLICA IDENTITY FULL;
ALTER TABLE public.workout_entries REPLICA IDENTITY FULL;
ALTER TABLE public.ai_recommendations REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.food_entries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.workout_entries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_recommendations;

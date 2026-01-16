-- Drop existing foods table if it exists
DROP TABLE IF EXISTS foods CASCADE;

-- Create foods table
CREATE TABLE foods (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  calories INTEGER DEFAULT 0,
  date DATE NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes for faster queries
CREATE INDEX foods_user_id_idx ON foods(user_id);
CREATE INDEX foods_date_idx ON foods(user_id, date DESC);
CREATE INDEX foods_created_at_idx ON foods(user_id, created_at DESC);

-- Enable Row Level Security
ALTER TABLE foods ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only read their own foods
CREATE POLICY "Users can read their own foods" ON foods
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own foods
CREATE POLICY "Users can insert their own foods" ON foods
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own foods
CREATE POLICY "Users can update their own foods" ON foods
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can delete their own foods
CREATE POLICY "Users can delete their own foods" ON foods
  FOR DELETE
  USING (auth.uid() = user_id);


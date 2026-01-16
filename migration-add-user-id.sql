-- Add user_id column to foods table
ALTER TABLE foods ADD COLUMN user_id UUID NOT NULL DEFAULT auth.uid();

-- Add foreign key constraint
ALTER TABLE foods ADD CONSTRAINT foods_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create indexes
CREATE INDEX foods_user_id_idx ON foods(user_id);
CREATE INDEX foods_date_idx ON foods(user_id, date DESC);
CREATE INDEX foods_created_at_idx ON foods(user_id, created_at DESC);

-- Enable RLS if not already enabled
ALTER TABLE foods ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read their own foods" ON foods;
DROP POLICY IF EXISTS "Users can insert their own foods" ON foods;
DROP POLICY IF EXISTS "Users can update their own foods" ON foods;
DROP POLICY IF EXISTS "Users can delete their own foods" ON foods;

-- Create new RLS policies
CREATE POLICY "Users can read their own foods" ON foods
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own foods" ON foods
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own foods" ON foods
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own foods" ON foods
  FOR DELETE
  USING (auth.uid() = user_id);

-- Storage RLS Policies for food-images bucket
-- Run these in the Supabase SQL Editor

-- Allow public read access to all files in food-images bucket
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'food-images');

-- Allow authenticated users to upload files to food-images bucket
CREATE POLICY "Allow uploads to food-images" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'food-images');

-- Allow users to update their own files
CREATE POLICY "Allow updates to food-images" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'food-images');

-- Allow users to delete their own files
CREATE POLICY "Allow deletes from food-images" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'food-images');

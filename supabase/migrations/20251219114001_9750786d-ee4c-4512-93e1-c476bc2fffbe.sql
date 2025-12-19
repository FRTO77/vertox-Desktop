-- Add DELETE policy for profiles table to allow users to delete their own profile
-- This addresses GDPR Article 17 (Right to Erasure) compliance

CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
USING (auth.uid() = user_id);
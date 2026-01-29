-- Create a function to make a user an admin (call this after user signs up)
-- This is a helper function that can be called from the SQL editor
CREATE OR REPLACE FUNCTION public.make_admin(user_email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Find the user by email
    SELECT id INTO target_user_id
    FROM auth.users
    WHERE email = user_email;
    
    IF target_user_id IS NULL THEN
        RETURN 'User not found with email: ' || user_email;
    END IF;
    
    -- Insert admin role (ignore if already exists)
    INSERT INTO public.user_roles (user_id, role)
    VALUES (target_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RETURN 'User ' || user_email || ' is now an admin';
END;
$$;
-- Migration to fix date types for experiences table

-- 1. Add new temporary columns of type DATE
ALTER TABLE public.experiences ADD COLUMN start_date_new DATE;
ALTER TABLE public.experiences ADD COLUMN end_date_new DATE;

-- 2. Attempt to migrate data
-- We use a simple cast where possible. If data is bad, it will be NULL.
-- Note: 'YYYY-MM-DD' text casts cleanly. 'Jan 2023' requires to_date, but let's try a best effort.
-- Supabase/Postgres is usually good at 'YYYY-MM-DD'.
UPDATE public.experiences 
SET 
  start_date_new = CASE 
    WHEN start_date ~ '^\d{4}-\d{2}-\d{2}$' THEN start_date::DATE 
    WHEN start_date ~ '^\d{4}-\d{2}$' THEN (start_date || '-01')::DATE
    ELSE NULL -- Start fresh if format is weird to avoid migration crashing
  END,
  end_date_new = CASE 
    WHEN end_date ~ '^\d{4}-\d{2}-\d{2}$' THEN end_date::DATE 
    WHEN end_date ~ '^\d{4}-\d{2}$' THEN (end_date || '-01')::DATE
    ELSE NULL 
  END;

-- 3. Drop old columns
ALTER TABLE public.experiences DROP COLUMN start_date;
ALTER TABLE public.experiences DROP COLUMN end_date;

-- 4. Rename new columns to old names
ALTER TABLE public.experiences RENAME COLUMN start_date_new TO start_date;
ALTER TABLE public.experiences RENAME COLUMN end_date_new TO end_date;

-- 5. Add NOT NULL constraint to start_date (as it was before)
-- We set a default if it ended up NULL to prevent errors
UPDATE public.experiences SET start_date = CURRENT_DATE WHERE start_date IS NULL;
ALTER TABLE public.experiences ALTER COLUMN start_date SET NOT NULL;

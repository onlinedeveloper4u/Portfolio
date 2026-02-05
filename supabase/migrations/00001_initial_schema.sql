-- =============================================================================
-- Portfolio Database Schema - Complete Migration
-- =============================================================================
-- This migration creates all tables, functions, triggers, and policies
-- Run: supabase db push
-- =============================================================================

-- =============================================================================
-- SECTION 1: ENUMS AND CORE FUNCTIONS
-- =============================================================================

-- Create app_role enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Security definer function to check roles (prevents infinite recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- =============================================================================
-- SECTION 2: CORE TABLES
-- =============================================================================

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT,
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Site settings table (key-value pairs for hero/profile content)
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT NOT NULL DEFAULT 'Full-Stack',
    technologies TEXT[] DEFAULT '{}',
    live_url TEXT,
    github_url TEXT,
    app_store_url TEXT,
    play_store_url TEXT,
    featured BOOLEAN DEFAULT false,
    visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Experiences table
CREATE TABLE public.experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    start_date TEXT NOT NULL,
    end_date TEXT,
    description TEXT,
    type TEXT NOT NULL DEFAULT 'work',
    visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Skills table
CREATE TABLE public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    proficiency INTEGER DEFAULT 80,
    icon TEXT,
    visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Testimonials table
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    company TEXT,
    content TEXT NOT NULL,
    avatar_url TEXT,
    rating INTEGER DEFAULT 5,
    visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Contact links table
CREATE TABLE public.contact_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    icon TEXT,
    url TEXT NOT NULL,
    display_text TEXT,
    visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_links ENABLE ROW LEVEL SECURITY;

-- Tech stack table (for hero tech pills)
CREATE TABLE public.tech_stack (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    color TEXT DEFAULT 'from-blue-500 to-blue-600',
    visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.tech_stack ENABLE ROW LEVEL SECURITY;

-- Languages table
CREATE TABLE public.languages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    level TEXT NOT NULL,
    flag TEXT,
    visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;

-- Tools table
CREATE TABLE public.tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- SECTION 3: ROW LEVEL SECURITY POLICIES
-- =============================================================================

-- User roles policies
CREATE POLICY "Users can view their own roles"
    ON public.user_roles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles"
    ON public.user_roles FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- Profiles policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Site settings policies
CREATE POLICY "Anyone can view site settings"
    ON public.site_settings FOR SELECT
    USING (true);

CREATE POLICY "Admins can insert site settings"
    ON public.site_settings FOR INSERT
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site settings"
    ON public.site_settings FOR UPDATE
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site settings"
    ON public.site_settings FOR DELETE
    USING (public.has_role(auth.uid(), 'admin'));

-- Projects policies
CREATE POLICY "Anyone can view visible projects"
    ON public.projects FOR SELECT
    USING (visible = true);

CREATE POLICY "Admins can view all projects"
    ON public.projects FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert projects"
    ON public.projects FOR INSERT
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update projects"
    ON public.projects FOR UPDATE
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete projects"
    ON public.projects FOR DELETE
    USING (public.has_role(auth.uid(), 'admin'));

-- Experiences policies
CREATE POLICY "Anyone can view visible experiences"
    ON public.experiences FOR SELECT
    USING (visible = true);

CREATE POLICY "Admins can view all experiences"
    ON public.experiences FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert experiences"
    ON public.experiences FOR INSERT
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update experiences"
    ON public.experiences FOR UPDATE
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete experiences"
    ON public.experiences FOR DELETE
    USING (public.has_role(auth.uid(), 'admin'));

-- Skills policies
CREATE POLICY "Anyone can view visible skills"
    ON public.skills FOR SELECT
    USING (visible = true);

CREATE POLICY "Admins can view all skills"
    ON public.skills FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert skills"
    ON public.skills FOR INSERT
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update skills"
    ON public.skills FOR UPDATE
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete skills"
    ON public.skills FOR DELETE
    USING (public.has_role(auth.uid(), 'admin'));

-- Services policies
CREATE POLICY "Anyone can view visible services"
    ON public.services FOR SELECT
    USING (visible = true);

CREATE POLICY "Admins can view all services"
    ON public.services FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert services"
    ON public.services FOR INSERT
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update services"
    ON public.services FOR UPDATE
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete services"
    ON public.services FOR DELETE
    USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials policies
CREATE POLICY "Anyone can view visible testimonials"
    ON public.testimonials FOR SELECT
    USING (visible = true);

CREATE POLICY "Admins can view all testimonials"
    ON public.testimonials FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert testimonials"
    ON public.testimonials FOR INSERT
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonials"
    ON public.testimonials FOR UPDATE
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonials"
    ON public.testimonials FOR DELETE
    USING (public.has_role(auth.uid(), 'admin'));

-- Contact links policies
CREATE POLICY "Anyone can view visible contact links"
    ON public.contact_links FOR SELECT
    USING (visible = true);

CREATE POLICY "Admins can view all contact links"
    ON public.contact_links FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert contact links"
    ON public.contact_links FOR INSERT
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact links"
    ON public.contact_links FOR UPDATE
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contact links"
    ON public.contact_links FOR DELETE
    USING (public.has_role(auth.uid(), 'admin'));

-- Tech stack policies
CREATE POLICY "Anyone can view visible tech stack"
    ON public.tech_stack FOR SELECT
    USING (visible = true);

CREATE POLICY "Admins can view all tech stack"
    ON public.tech_stack FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert tech stack"
    ON public.tech_stack FOR INSERT
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update tech stack"
    ON public.tech_stack FOR UPDATE
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete tech stack"
    ON public.tech_stack FOR DELETE
    USING (public.has_role(auth.uid(), 'admin'));

-- Languages policies
CREATE POLICY "Anyone can view visible languages"
    ON public.languages FOR SELECT
    USING (visible = true);

CREATE POLICY "Admins can view all languages"
    ON public.languages FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert languages"
    ON public.languages FOR INSERT
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update languages"
    ON public.languages FOR UPDATE
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete languages"
    ON public.languages FOR DELETE
    USING (public.has_role(auth.uid(), 'admin'));

-- Tools policies
CREATE POLICY "Anyone can view visible tools"
    ON public.tools FOR SELECT
    USING (visible = true);

CREATE POLICY "Admins can view all tools"
    ON public.tools FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert tools"
    ON public.tools FOR INSERT
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update tools"
    ON public.tools FOR UPDATE
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete tools"
    ON public.tools FOR DELETE
    USING (public.has_role(auth.uid(), 'admin'));

-- =============================================================================
-- SECTION 4: STORAGE BUCKET AND POLICIES
-- =============================================================================

-- Create storage bucket for portfolio assets
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-assets', 'portfolio-assets', true);

-- Storage policies
CREATE POLICY "Anyone can view portfolio assets"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Admins can upload portfolio assets"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'portfolio-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update portfolio assets"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'portfolio-assets' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete portfolio assets"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'portfolio-assets' AND public.has_role(auth.uid(), 'admin'));

-- =============================================================================
-- SECTION 5: TRIGGERS AND AUTO-FUNCTIONS
-- =============================================================================

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- First admin bootstrap: automatically make the first user an admin
CREATE OR REPLACE FUNCTION public.handle_first_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only assign admin if no admin exists yet
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.user_id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_first_admin_assignment
    AFTER INSERT ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_first_admin();

-- Helper function to make a user an admin (for SQL editor use)
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

-- Updated_at triggers for all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON public.experiences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contact_links_updated_at BEFORE UPDATE ON public.contact_links FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tech_stack_updated_at BEFORE UPDATE ON public.tech_stack FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_languages_updated_at BEFORE UPDATE ON public.languages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON public.tools FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

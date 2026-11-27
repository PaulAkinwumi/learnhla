-- ============================================================
-- HLA Africa — Admin content platform schema
-- Run this in: Supabase Dashboard -> SQL Editor -> New query
-- ============================================================

-- ---------- Enrollments (program registration form) ----------
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  course_slug text not null,
  course_title text not null,
  first_name text not null,
  surname text not null,
  other_name text,
  dob date,
  gender text,
  phone text,
  email text not null,
  country text,
  state_region text,
  education_level text,
  organization text,
  job_title text,
  responsibilities text,
  key_challenges text,
  goals text,
  referral_source text,
  certified boolean not null default false
);

-- ---------- Webinars ----------
create table if not exists public.webinars (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  category text not null,
  title text not null,
  speakers text not null,
  youtube_url text not null
);

-- ---------- Publications ----------
create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  categories text[] not null default '{}',
  title text not null,
  description text not null,
  pub_date text not null,
  file_url text
);

alter table public.publications add column if not exists file_url text;

-- ---------- Insights ----------
create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  categories text[] not null default '{}',
  title text not null,
  excerpt text not null,
  author text not null,
  content text not null default ''
);

-- ---------- Resources: Image Album ----------
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  image_url text not null,
  date_label text not null
);

-- ---------- Resources: Video Archives ----------
create table if not exists public.video_archives (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  youtube_url text not null
);

-- ---------- Resources: Alumni Stories ----------
create table if not exists public.alumni_stories (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  image_url text not null,
  designation text not null,
  story text not null default ''
);

-- ---------- Resources: News & Announcements ----------
create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  image_url text not null,
  date_label text not null,
  excerpt text not null,
  content text not null default ''
);

-- ---------- Inquiries (contact us form) ----------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  inquiry_type text not null,
  full_name text not null,
  organization text,
  email text not null,
  subject text,
  message text not null
);

-- ---------- Publication downloads (publication download form) ----------
create table if not exists public.publication_downloads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  publication_title text not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  country text,
  organisation text,
  job_title text,
  consent_updates boolean not null default false
);

-- ============================================================
-- Row Level Security
-- Public content is readable by anyone. All administrative writes
-- require an authenticated Supabase user. Public forms can insert
-- submissions, but only authenticated admins can read them.
--
-- Create admin users in Supabase Dashboard -> Authentication -> Users.
-- Also disable public sign-ups in Authentication -> Providers -> Email.
-- ============================================================
do $$
declare
  t text;
begin
  foreach t in array array[
    'enrollments', 'webinars', 'publications', 'insights',
    'gallery_images', 'video_archives', 'alumni_stories', 'news_posts',
    'inquiries', 'publication_downloads'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "anon full access" on public.%I', t);
  end loop;
end $$;

-- Public content: anyone can read; only authenticated admins can write.
do $$
declare
  t text;
begin
  foreach t in array array[
    'webinars', 'publications', 'insights',
    'gallery_images', 'video_archives', 'alumni_stories', 'news_posts'
  ] loop
    execute format('drop policy if exists "public read content" on public.%I', t);
    execute format(
      'create policy "public read content" on public.%I for select using (true)', t);

    execute format('drop policy if exists "admin write content" on public.%I', t);
    execute format(
      'create policy "admin write content" on public.%I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

-- Form submissions: anyone can submit; only authenticated admins can read/manage.
do $$
declare
  t text;
begin
  foreach t in array array['enrollments', 'inquiries', 'publication_downloads'] loop
    execute format('drop policy if exists "public submit form" on public.%I', t);
    execute format(
      'create policy "public submit form" on public.%I for insert to anon, authenticated with check (true)', t);

    execute format('drop policy if exists "admin read submissions" on public.%I', t);
    execute format(
      'create policy "admin read submissions" on public.%I for select to authenticated using (true)', t);

    execute format('drop policy if exists "admin manage submissions" on public.%I', t);
    execute format(
      'create policy "admin manage submissions" on public.%I for delete to authenticated using (true)', t);
  end loop;
end $$;

-- ============================================================
-- Storage bucket for admin image uploads
-- ============================================================
insert into storage.buckets (id, name, public)
values ('admin-uploads', 'admin-uploads', true)
on conflict (id) do nothing;

drop policy if exists "public read admin uploads" on storage.objects;
create policy "public read admin uploads"
  on storage.objects for select
  using (bucket_id = 'admin-uploads');

drop policy if exists "anon insert admin uploads" on storage.objects;
drop policy if exists "anon delete admin uploads" on storage.objects;
drop policy if exists "admin insert admin uploads" on storage.objects;
create policy "admin insert admin uploads"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'admin-uploads');

drop policy if exists "admin update admin uploads" on storage.objects;
create policy "admin update admin uploads"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'admin-uploads')
  with check (bucket_id = 'admin-uploads');

drop policy if exists "admin delete admin uploads" on storage.objects;
create policy "admin delete admin uploads"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'admin-uploads');

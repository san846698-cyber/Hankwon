-- Hankwon — Supabase schema v2
-- Apply in Supabase SQL editor after creating a new project.

-- ============================================================
-- 1. Tables
-- ============================================================

create table if not exists public.responses (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  from_name    text not null,
  to_label     text not null,
  parent_name  text,
  mode         text check (mode in ('self', 'other')),
  tier         text check (tier in ('light', 'standard', 'premium')),
  intro_data   jsonb,
  style        text check (style in ('simple', 'rich')),
  person       text check (person in ('first', 'third')) default 'third',
  status       text not null default 'in_progress'
                 check (status in ('in_progress', 'completed', 'paid', 'generated')),
  created_at   timestamptz not null default now(),
  completed_at timestamptz,
  paid_at      timestamptz
);

-- Migration for existing databases (idempotent): add person if missing.
alter table public.responses
  add column if not exists person text
    check (person in ('first', 'third')) default 'third';

create index if not exists responses_slug_idx   on public.responses (slug);
create index if not exists responses_status_idx on public.responses (status);

-- Answers: one row per (response, question) pair.
create table if not exists public.answers (
  id           uuid primary key default gen_random_uuid(),
  response_id  uuid not null references public.responses(id) on delete cascade,
  question_id  int  not null check (question_id between 1 and 50),
  content      text not null,
  updated_at   timestamptz not null default now(),
  unique (response_id, question_id)
);

create index if not exists answers_response_idx on public.answers (response_id);

-- Generated book (lazily after payment)
create table if not exists public.books (
  id           uuid primary key default gen_random_uuid(),
  response_id  uuid not null unique references public.responses(id) on delete cascade,
  title        text,
  subtitle     text,
  body_md      text,
  book_json    jsonb,
  pdf_url      text,
  order_id     text,
  generated_at timestamptz,
  created_at   timestamptz not null default now()
);

-- Migration for existing databases (idempotent).
alter table public.books add column if not exists subtitle  text;
alter table public.books add column if not exists book_json jsonb;
alter table public.books add column if not exists order_id  text;

-- order_id is the LemonSqueezy order id — used for webhook idempotency.
create unique index if not exists books_order_id_idx
  on public.books (order_id) where order_id is not null;

-- Print waitlist
create table if not exists public.print_waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  source     text,
  created_at timestamptz not null default now()
);

create index if not exists print_waitlist_email_idx on public.print_waitlist (email);

-- Products (tier catalogue — prices TBD)
create table if not exists public.products (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,  -- 'light' | 'standard' | 'premium'
  name             text not null,
  price            int not null default 0,
  chapter_count    int not null,
  question_count   int not null,
  physical_included bool default false,
  active           bool default true,
  created_at       timestamptz default now()
);

-- Seed product rows (prices TBD → 0)
insert into public.products (slug, name, price, chapter_count, question_count, physical_included)
values
  ('light',    '라이트',  0, 7, 14, false),
  ('standard', '스탠다드', 0, 7, 28, false),
  ('premium',  '고급',    0, 7, 42, true)
on conflict (slug) do nothing;

-- ============================================================
-- 2. Triggers
-- ============================================================

create or replace function public.bump_answers_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end$$;

drop trigger if exists answers_set_updated_at on public.answers;
create trigger answers_set_updated_at
  before update on public.answers
  for each row execute function public.bump_answers_updated_at();

-- ============================================================
-- 3. Row Level Security
-- ============================================================

alter table public.responses     enable row level security;
alter table public.answers       enable row level security;
alter table public.books         enable row level security;
alter table public.print_waitlist enable row level security;
alter table public.products      enable row level security;

-- Products: public read
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products
  for select using (active = true);

-- ------------------------------------------------------------
-- Grants for service_role
--
-- The server (webhook, /api/response, /api/generate, /book/[slug]) uses the
-- service-role key. Write RPCs (create_response/upsert_answer/complete_response)
-- are `security definer` so they work without table grants, but direct table
-- reads/writes (getResponseBySlug, saveBook, getBookBySlug, updateResponseMeta,
-- markResponseStatus) need explicit privileges or they fail with 42501.
-- service_role bypasses RLS, so only the GRANT is required.
-- ------------------------------------------------------------

grant usage on schema public to service_role;
grant all on all tables    in schema public to service_role;
grant all on all sequences in schema public to service_role;
alter default privileges in schema public grant all on tables    to service_role;
alter default privileges in schema public grant all on sequences to service_role;

-- ============================================================
-- 4. RPC functions
-- ============================================================

create or replace function public.create_response(
  p_slug      text,
  p_from_name text,
  p_to_label  text,
  p_mode      text default null,
  p_tier      text default null
) returns uuid
language sql security definer set search_path = public as $$
  insert into public.responses (slug, from_name, to_label, mode, tier)
  values (p_slug, p_from_name, p_to_label, p_mode, p_tier)
  returning id;
$$;

create or replace function public.upsert_answer(
  p_response_id uuid,
  p_question_id int,
  p_content     text
) returns void
language sql security definer set search_path = public as $$
  insert into public.answers (response_id, question_id, content)
  values (p_response_id, p_question_id, p_content)
  on conflict (response_id, question_id)
    do update set content = excluded.content, updated_at = now();
$$;

create or replace function public.complete_response(p_response_id uuid)
returns void
language sql security definer set search_path = public as $$
  update public.responses
    set status = 'completed', completed_at = now()
    where id = p_response_id and status = 'in_progress';
$$;

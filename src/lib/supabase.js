import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase keys. Fill in .env.local and restart the dev server.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/*
  Run this once in the Supabase SQL editor:

  create table tasks (
    id bigint generated always as identity primary key,
    title text not null,
    completed boolean not null default false,
    created_at timestamptz not null default now()
  );

  alter table tasks enable row level security;
  create policy "Public access for lab" on tasks
    for all using (true) with check (true);
*/

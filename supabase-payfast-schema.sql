-- ============================================================
-- THE MAGIC LAB — PayFast payments schema
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New
-- query), after supabase-setup.sql. Safe to re-run.
--
-- Depends on the existing `profiles` table (profiles.package is one of
-- 'free' | 'basic' | 'pro' | 'school' — see auth.js hasAccess()).
--
-- This table is written to ONLY by the payfast-create-checkout and
-- payfast-notify Edge Functions, both of which use the Supabase
-- service-role key and so bypass RLS entirely. Regular users get a
-- read-only view of their own rows and nothing else — there is
-- deliberately no INSERT/UPDATE/DELETE policy for the `authenticated`
-- role, because the only trustworthy writer of payment state is the
-- server-side webhook, never the browser.
-- ============================================================

create table if not exists payments (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references profiles(id) on delete cascade,
  m_payment_id   text not null unique,   -- our reference, generated at checkout
  pf_payment_id  text,                    -- PayFast's reference, filled in by the ITN
  token          text,                    -- PayFast subscription token (for future cancel/manage calls)
  package        text not null,           -- package granted on success, e.g. 'pro'
  amount         numeric(10,2) not null,
  status         text not null default 'pending' check (status in ('pending', 'complete', 'cancelled', 'failed')),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists idx_payments_user     on payments(user_id);
create index if not exists idx_payments_pf_id     on payments(pf_payment_id);

alter table payments enable row level security;

drop policy if exists "Users read own payments" on payments;
create policy "Users read own payments" on payments
  for select
  using (user_id = auth.uid());

-- Keep updated_at current on every service-role write.
create or replace function _payments_set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_payments_updated_at on payments;
create trigger trg_payments_updated_at
  before update on payments
  for each row execute function _payments_set_updated_at();

import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://your-project-url.supabase.co', 'public-anon-key')

// Sign up
async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) console.error(error)
  else console.log('User signed up:', data)
}

// Sign in
async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) console.error(error)
  else console.log('User signed in:', data)
}
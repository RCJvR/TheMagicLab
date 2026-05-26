// ============================================================
// THE MAGIC LAB — auth.js
// Core authentication module — include on every page
// Usage: <script src="auth.js"></script>
// ============================================================

// ── CONFIG — replace with your Supabase project values ──────
// Find these in: Supabase Dashboard > Project Settings > API
const SUPABASE_URL  = 'https://hrnodxqvyxzhfexkzeji.supabase.co';   // e.g. https://xyzxyz.supabase.co
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhybm9keHF2eXh6aGZleGt6ZWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MDc3NTQsImV4cCI6MjA5NTI4Mzc1NH0.wT1QoZZITE0iMYnievwSEDhiFU1wtV2Y3lmzGDVgzWI';

// ── Load Supabase client from CDN ────────────────────────────
// This loads automatically when auth.js is included.
// The global window.MagicLabAuth is available after DOMContentLoaded.
(function () {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
  script.onload = () => _initAuth();
  document.head.appendChild(script);
})();

// ── Internal state ───────────────────────────────────────────
let _supabase = null;
let _session  = null;
let _profile  = null;
const _listeners = [];

// ── Init ─────────────────────────────────────────────────────
async function _initAuth() {
  _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

  // Restore existing session
  const { data: { session } } = await _supabase.auth.getSession();
  await _handleSession(session);

  // Listen for auth changes (login, logout, token refresh)
  _supabase.auth.onAuthStateChange(async (event, session) => {
    await _handleSession(session);
    _listeners.forEach(fn => fn(event, _profile));
  });

  // Expose public API
  window.MagicLabAuth = {
    signUp,
    signIn,
    signOut,
    getSession:    () => _session,
    getProfile:    () => _profile,
    isLoggedIn:    () => !!_session,
    isTeacher:     () => _profile?.role === 'teacher',
    isStudent:     () => _profile?.role === 'student',
    hasAccess,
    updateProfile,
    joinClass,
    onAuthChange:  (fn) => _listeners.push(fn),
    _supabase:     () => _supabase   // for progress.js to use
  };

  // Fire a custom event so pages know auth is ready
  document.dispatchEvent(new CustomEvent('magiclab:auth:ready', {
    detail: { profile: _profile }
  }));
}

async function _handleSession(session) {
  _session = session;
  if (session?.user) {
    try {
      const { data, error } = await _supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (error) {
        console.warn('[MagicLab] Profile fetch error:', error.message);
        _profile = _fallbackProfile(session.user);
      } else if (!data) {
        // No row yet — insert one on the fly then use the fallback
        const fb = _fallbackProfile(session.user);
        await _supabase.from('profiles').insert(fb);
        _profile = fb;
      } else {
        _profile = data;
      }
    } catch (e) {
      console.warn('[MagicLab] Profile fetch exception:', e.message);
      _profile = _fallbackProfile(session.user);
    }
  } else {
    _profile = null;
  }
}

function _fallbackProfile(user) {
  return {
    id:           user.id,
    email:        user.email,
    display_name: user.user_metadata?.display_name || user.email.split('@')[0],
    role:         user.user_metadata?.role || 'student',
    grade:        null,
    package:      'free'
  };
}

// ── Public API ───────────────────────────────────────────────

/**
 * Create a new account.
 * @param {string} email
 * @param {string} password
 * @param {string} displayName
 * @param {'student'|'teacher'} role
 * @param {number|null} grade  — required for students
 */
async function signUp(email, password, displayName, role = 'student', grade = null) {
  const { data, error } = await _supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName, role }
    }
  });
  if (error) return { error };

  // Update grade if student
  if (role === 'student' && grade && data.user) {
    await _supabase
      .from('profiles')
      .update({ grade })
      .eq('id', data.user.id);
  }

  return { data };
}

/**
 * Sign in with email + password.
 */
async function signIn(email, password) {
  const { data, error } = await _supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
}

/**
 * Sign out current user.
 */
async function signOut() {
  await _supabase.auth.signOut();
  _session = null;
  _profile = null;
}

/**
 * Check if the current user's package grants access to a feature.
 * @param {'pro'|'basic'|'free'} requiredPackage
 */
function hasAccess(requiredPackage) {
  if (!_profile) return requiredPackage === 'free';
  const tiers = { free: 0, basic: 1, pro: 2, school: 3 };
  return (tiers[_profile.package] ?? 0) >= (tiers[requiredPackage] ?? 0);
}

/**
 * Update display name, grade, or school.
 */
async function updateProfile(updates) {
  if (!_session) return { error: { message: 'Not logged in' } };
  const { data, error } = await _supabase
    .from('profiles')
    .update(updates)
    .eq('id', _session.user.id)
    .select()
    .single();
  if (data) _profile = data;
  return { data, error };
}

/**
 * Join a class by invite code (students only).
 */
async function joinClass(inviteCode) {
  if (!_session) return { error: { message: 'Not logged in' } };

  // Find the class
  const { data: cls, error: findErr } = await _supabase
    .from('classes')
    .select('id, name')
    .eq('invite_code', inviteCode.toUpperCase())
    .eq('active', true)
    .single();

  if (findErr || !cls) return { error: { message: 'Invalid invite code' } };

  // Join it
  const { error: joinErr } = await _supabase
    .from('class_members')
    .insert({ class_id: cls.id, student_id: _session.user.id });

  if (joinErr && joinErr.code !== '23505') return { error: joinErr }; // 23505 = already member
  return { data: cls };
}

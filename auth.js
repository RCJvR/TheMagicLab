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
    // Broadcast to DOM listeners so pages can react without polling
    document.dispatchEvent(new CustomEvent('magiclab:auth:change', {
      detail: { event, profile: _profile }
    }));
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
    hasFullAccess,
    trialDaysLeft,
    updateProfile,
    joinClass,
    // ── Teacher functions ──
    createClass,
    getMyClasses,
    getClassStudents,
    getClassProgress,
    removeStudentFromClass,
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
    grade:        user.user_metadata?.grade || null,
    package:      'free',
    school:       user.user_metadata?.school || null,
    province:     user.user_metadata?.province || null,
    subjects:     user.user_metadata?.subjects || null,
    // No real trial_ends_at is known here (this profile was assembled
    // client-side after a fetch error, not read from the DB) — leave
    // it null rather than guessing, so hasFullAccess() fails open
    // instead of locking someone out because of a transient glitch.
    trial_ends_at: null,
    cdv_status:    'none'
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
 * @param {{school: string, province?: string, subjects?: string}} extra
 *   — `school` is required for every account. `subjects` only applies to teachers.
 */
async function signUp(email, password, displayName, role = 'student', grade = null, extra = {}) {
  // school/grade/province/subjects are passed into user_metadata here, not
  // just written via the .update() below, so the very first profile row
  // (inserted by _handleSession's fallback-insert path once the SIGNED_IN
  // event fires — see _fallbackProfile) already carries the real values.
  // That insert and this function's .update() race against each other with
  // no guaranteed order; without metadata, whichever finishes last could
  // silently overwrite a typed-in school with null.
  const { data, error } = await _supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName, role, grade, ...extra }
    }
  });
  if (error) return { error };

  const updates = {};
  if (role === 'student' && grade) updates.grade = grade;
  if (extra.school)   updates.school   = extra.school;
  if (extra.province) updates.province = extra.province;
  if (role === 'teacher' && extra.subjects) updates.subjects = extra.subjects;

  if (Object.keys(updates).length && data.user) {
    await _supabase
      .from('profiles')
      .update(updates)
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
 * Does the current user get full site access right now? True if
 * they're on a paid tier, verified as a Curro Durbanville user, or
 * still inside their free trial window. Everyone else (trial expired,
 * not paid, not verified) should be sent to pricing.html.
 *
 * Fails open (returns true) when trial_ends_at is unknown — that only
 * happens on a fallback profile assembled after a fetch error, and a
 * transient glitch shouldn't lock a legitimate user out.
 */
function hasFullAccess() {
  if (!_profile) return false;
  if (_profile.package === 'pro' || _profile.package === 'school') return true;
  if (_profile.cdv_status === 'verified') return true;
  if (!_profile.trial_ends_at) return true;
  return new Date(_profile.trial_ends_at) > new Date();
}

/**
 * Whole days remaining in the free trial (0 if expired or n/a).
 */
function trialDaysLeft() {
  if (!_profile?.trial_ends_at) return 0;
  const ms = new Date(_profile.trial_ends_at) - new Date();
  return Math.max(0, Math.ceil(ms / 86400000));
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

// ── Teacher API ──────────────────────────────────────────────

/**
 * Create a new class (teachers only).
 * @param {string} name
 * @param {number|null} grade
 * @param {string|null} subject
 */
async function createClass(name, grade = null, subject = null) {
  if (!_session) return { error: { message: 'Not logged in' } };
  if (_profile?.role !== 'teacher') return { error: { message: 'Only teachers can create classes' } };

  // Generate invite code
  const { data: codeData } = await _supabase.rpc('generate_invite_code');
  const inviteCode = codeData || Math.random().toString(36).slice(2,10).toUpperCase();

  const { data, error } = await _supabase
    .from('classes')
    .insert({
      teacher_id:  _session.user.id,
      name,
      grade,
      subject,
      invite_code: inviteCode,
      active:      true
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Get all classes owned by the current teacher.
 */
async function getMyClasses() {
  if (!_session) return [];
  const { data } = await _supabase
    .from('classes')
    .select('*')
    .eq('teacher_id', _session.user.id)
    .order('created_at', { ascending: false });
  return data ?? [];
}

/**
 * Get all students in a class with their profiles.
 * @param {string} classId
 */
async function getClassStudents(classId) {
  if (!_session) return [];
  const { data } = await _supabase
    .from('class_members')
    .select('joined_at, profiles:student_id(id, display_name, email, grade, xp, streak_current)')
    .eq('class_id', classId);
  return (data ?? []).map(r => ({ ...r.profiles, joined_at: r.joined_at }));
}

/**
 * Get tool progress for all students in a class.
 * Returns array of { student_id, display_name, tool, topics_complete, quiz_correct, quiz_total, code_runs, last_active }
 * @param {string} classId
 */
async function getClassProgress(classId) {
  if (!_session) return [];

  // Get student IDs first
  const { data: members } = await _supabase
    .from('class_members')
    .select('student_id, profiles:student_id(display_name)')
    .eq('class_id', classId);

  if (!members?.length) return [];

  const studentIds = members.map(m => m.student_id);
  const nameMap    = Object.fromEntries(members.map(m => [m.student_id, m.profiles?.display_name || 'Student']));

  // Get tool_progress for all students
  const { data: progress } = await _supabase
    .from('tool_progress')
    .select('*')
    .in('user_id', studentIds);

  return (progress ?? []).map(row => ({
    ...row,
    display_name: nameMap[row.user_id] || 'Student'
  }));
}

/**
 * Remove a student from a class.
 * @param {string} classId
 * @param {string} studentId
 */
async function removeStudentFromClass(classId, studentId) {
  if (!_session) return { error: { message: 'Not logged in' } };
  const { error } = await _supabase
    .from('class_members')
    .delete()
    .eq('class_id', classId)
    .eq('student_id', studentId);
  return { error };
}

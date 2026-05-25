// ============================================================
// THE MAGIC LAB — auth-modal.js
// Drop-in login/signup modal UI.
// Include AFTER auth.js and auth-modal.css on every page.
// Usage: <script src="auth-modal.js"></script>
//
// This script:
//  1. Injects the modal HTML into the page
//  2. Wires up all form interactions
//  3. Replaces the nav auth button with a user chip when signed in
//  4. Exports window.MagicLabModal.open() / .close()
// ============================================================

(function () {

  // ── 1. Inject modal HTML ───────────────────────────────────
  const modalHTML = `
<div class="ml-modal-overlay" id="ml-overlay" role="dialog" aria-modal="true" aria-label="Sign in to The Magic Lab">
  <div class="ml-modal">
    <button class="ml-modal-close" id="ml-close" aria-label="Close">✕</button>
    <div class="ml-modal-logo">⚗️ The Magic Lab</div>
    <div class="ml-modal-title" id="ml-modal-title">Welcome back</div>
    <p class="ml-modal-sub" id="ml-modal-sub">Sign in to track your progress</p>

    <!-- Tabs -->
    <div class="ml-tabs">
      <button class="ml-tab ml-active" data-tab="signin" id="ml-tab-signin">Sign In</button>
      <button class="ml-tab" data-tab="signup" id="ml-tab-signup">Create Account</button>
    </div>

    <!-- Sign In form -->
    <div id="ml-form-signin">
      <div class="ml-field">
        <label class="ml-label" for="ml-signin-email">Email</label>
        <input class="ml-input" id="ml-signin-email" type="email" placeholder="you@school.co.za" autocomplete="email">
      </div>
      <div class="ml-field">
        <label class="ml-label" for="ml-signin-password">Password</label>
        <input class="ml-input" id="ml-signin-password" type="password" placeholder="••••••••" autocomplete="current-password">
      </div>
      <button class="ml-submit" id="ml-btn-signin">Sign In</button>
      <div class="ml-msg ml-msg-error"  id="ml-signin-err"></div>
      <div class="ml-msg ml-msg-success" id="ml-signin-ok"></div>
    </div>

    <!-- Sign Up form -->
    <div id="ml-form-signup" style="display:none;">
      <div class="ml-field">
        <label class="ml-label" for="ml-signup-name">Display name</label>
        <input class="ml-input" id="ml-signup-name" type="text" placeholder="e.g. Liam Dlamini" autocomplete="name">
      </div>
      <div class="ml-field">
        <label class="ml-label" for="ml-signup-email">Email</label>
        <input class="ml-input" id="ml-signup-email" type="email" placeholder="you@school.co.za" autocomplete="email">
      </div>
      <div class="ml-field">
        <label class="ml-label" for="ml-signup-password">Password (min 8 characters)</label>
        <input class="ml-input" id="ml-signup-password" type="password" placeholder="••••••••" autocomplete="new-password">
      </div>

      <label class="ml-label" style="margin-bottom:8px;">I am a …</label>
      <div class="ml-role-row" id="ml-role-row">
        <button class="ml-role-btn ml-selected" data-role="student">🎓 Student</button>
        <button class="ml-role-btn" data-role="teacher">👩‍🏫 Teacher</button>
      </div>

      <!-- Grade selector — only shows for students -->
      <div id="ml-grade-section">
        <label class="ml-label" style="margin-bottom:8px;">Grade</label>
        <div class="ml-grade-row" id="ml-grade-row">
          ${[8,9,10,11,12].map(g => `<button class="ml-grade-btn" data-grade="${g}">Gr ${g}</button>`).join('')}
        </div>
      </div>

      <button class="ml-submit" id="ml-btn-signup">Create Account</button>
      <div class="ml-msg ml-msg-error"  id="ml-signup-err"></div>
      <div class="ml-msg ml-msg-success" id="ml-signup-ok"></div>
    </div>

  </div>
</div>`;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // ── 2. State ───────────────────────────────────────────────
  let _activeTab    = 'signin';
  let _selectedRole  = 'student';
  let _selectedGrade = null;

  // ── 3. Element refs ────────────────────────────────────────
  const overlay       = () => document.getElementById('ml-overlay');
  const formSignin    = () => document.getElementById('ml-form-signin');
  const formSignup    = () => document.getElementById('ml-form-signup');
  const gradeSection  = () => document.getElementById('ml-grade-section');
  const signinErr     = () => document.getElementById('ml-signin-err');
  const signinOk      = () => document.getElementById('ml-signin-ok');
  const signupErr     = () => document.getElementById('ml-signup-err');
  const signupOk      = () => document.getElementById('ml-signup-ok');

  // ── 4. Open / close ────────────────────────────────────────
  function openModal(tab = 'signin') {
    _switchTab(tab);
    overlay().classList.add('ml-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay().classList.remove('ml-open');
    document.body.style.overflow = '';
    _clearMessages();
  }

  // ── 5. Tab switching ───────────────────────────────────────
  function _switchTab(tab) {
    _activeTab = tab;
    document.getElementById('ml-tab-signin').classList.toggle('ml-active', tab === 'signin');
    document.getElementById('ml-tab-signup').classList.toggle('ml-active', tab === 'signup');
    formSignin().style.display = tab === 'signin' ? '' : 'none';
    formSignup().style.display = tab === 'signup' ? '' : 'none';
    document.getElementById('ml-modal-title').textContent =
      tab === 'signin' ? 'Welcome back' : 'Create your account';
    document.getElementById('ml-modal-sub').textContent =
      tab === 'signin' ? 'Sign in to track your progress' : 'Free to start — join the lab today';
    _clearMessages();
  }

  document.getElementById('ml-tab-signin').addEventListener('click', () => _switchTab('signin'));
  document.getElementById('ml-tab-signup').addEventListener('click', () => _switchTab('signup'));

  // ── 6. Role selector ───────────────────────────────────────
  document.querySelectorAll('#ml-role-row .ml-role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      _selectedRole = btn.dataset.role;
      document.querySelectorAll('#ml-role-row .ml-role-btn').forEach(b => b.classList.remove('ml-selected'));
      btn.classList.add('ml-selected');
      gradeSection().style.display = _selectedRole === 'student' ? '' : 'none';
    });
  });

  // ── 7. Grade selector ──────────────────────────────────────
  document.querySelectorAll('#ml-grade-row .ml-grade-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      _selectedGrade = parseInt(btn.dataset.grade);
      document.querySelectorAll('#ml-grade-row .ml-grade-btn').forEach(b => b.classList.remove('ml-selected'));
      btn.classList.add('ml-selected');
    });
  });

  // ── 8. Sign In ─────────────────────────────────────────────
  document.getElementById('ml-btn-signin').addEventListener('click', async () => {
    const btn      = document.getElementById('ml-btn-signin');
    const email    = document.getElementById('ml-signin-email').value.trim();
    const password = document.getElementById('ml-signin-password').value;

    if (!email || !password) { _showErr(signinErr(), 'Please fill in all fields.'); return; }

    btn.disabled = true; btn.textContent = 'Signing in…';
    const { error } = await window.MagicLabAuth.signIn(email, password);
    btn.disabled = false; btn.textContent = 'Sign In';

    if (error) {
      _showErr(signinErr(), _friendlyError(error.message));
    } else {
      _showOk(signinOk(), '✓ Signed in! Loading your progress…');
      setTimeout(() => closeModal(), 1200);
    }
  });

  // ── 9. Sign Up ─────────────────────────────────────────────
  document.getElementById('ml-btn-signup').addEventListener('click', async () => {
    const btn      = document.getElementById('ml-btn-signup');
    const name     = document.getElementById('ml-signup-name').value.trim();
    const email    = document.getElementById('ml-signup-email').value.trim();
    const password = document.getElementById('ml-signup-password').value;

    if (!name || !email || !password) { _showErr(signupErr(), 'Please fill in all fields.'); return; }
    if (password.length < 8)          { _showErr(signupErr(), 'Password must be at least 8 characters.'); return; }
    if (_selectedRole === 'student' && !_selectedGrade) {
      _showErr(signupErr(), 'Please select your grade.'); return;
    }

    btn.disabled = true; btn.textContent = 'Creating account…';
    const { error } = await window.MagicLabAuth.signUp(
      email, password, name, _selectedRole,
      _selectedRole === 'student' ? _selectedGrade : null
    );
    btn.disabled = false; btn.textContent = 'Create Account';

    if (error) {
      _showErr(signupErr(), _friendlyError(error.message));
    } else {
      _showOk(signupOk(), '✓ Account created! Check your email to confirm, then sign in.');
    }
  });

  // ── 10. Close button + overlay click ──────────────────────
  document.getElementById('ml-close').addEventListener('click', closeModal);
  overlay().addEventListener('click', (e) => { if (e.target === overlay()) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // ── 11. Wire up nav button after auth is ready ────────────
  document.addEventListener('magiclab:auth:ready', ({ detail: { profile } }) => {
    _renderNavAuth(profile);
  });

  // Re-render whenever auth state changes
  document.addEventListener('DOMContentLoaded', () => {
    // Also patch any existing nav auth buttons on the page
    const existing = document.querySelectorAll('[data-ml-auth]');
    existing.forEach(el => _wireAuthTrigger(el));
  });

  function _renderNavAuth(profile) {
    const targets = document.querySelectorAll('[data-ml-auth]');
    targets.forEach(target => {
      if (profile) {
        const initials = profile.display_name
          ? profile.display_name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()
          : profile.email[0].toUpperCase();

        target.outerHTML = `
          <div class="ml-user-chip" data-ml-auth>
            <div class="ml-user-avatar">${initials}</div>
            <span>${profile.display_name || profile.email.split('@')[0]}</span>
            <button class="ml-signout-btn" onclick="MagicLabAuth.signOut().then(()=>location.reload())">Sign out</button>
          </div>`;
      } else {
        target.innerHTML = '🔐 Sign In';
        target.onclick = () => openModal('signin');
      }
    });
  }

  // ── 12. Utility ───────────────────────────────────────────
  function _showErr(el, msg) { el.textContent = msg; el.className = 'ml-msg ml-msg-error ml-show'; }
  function _showOk(el, msg)  { el.textContent = msg; el.className = 'ml-msg ml-msg-success ml-show'; }
  function _clearMessages()  {
    [signinErr(), signinOk(), signupErr(), signupOk()].forEach(el => {
      if (el) el.classList.remove('ml-show');
    });
  }

  function _friendlyError(msg) {
    if (!msg) return 'Something went wrong. Please try again.';
    if (msg.includes('Invalid login')) return 'Incorrect email or password.';
    if (msg.includes('already registered')) return 'An account with this email already exists. Try signing in.';
    if (msg.includes('Email not confirmed')) return 'Please confirm your email address before signing in.';
    if (msg.includes('Password should')) return 'Password must be at least 8 characters.';
    if (msg.includes('valid email')) return 'Please enter a valid email address.';
    return msg;
  }

  function _wireAuthTrigger(el) {
    el.addEventListener('click', () => openModal());
  }

  // ── 13. Public API ────────────────────────────────────────
  window.MagicLabModal = { open: openModal, close: closeModal };

})();

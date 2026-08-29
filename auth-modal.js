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
    <div class="ml-modal-logo"><img src="/assets/logo-prism.svg" alt="" style="width:28px;height:28px;vertical-align:-7px;margin-right:4px;">The Magic Lab</div>
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
      <div style="text-align:right;margin:-8px 0 14px;">
        <button type="button" class="ml-forgot-link" id="ml-forgot-link">Forgot password?</button>
      </div>
      <button class="ml-submit" id="ml-btn-signin">Sign In</button>
      <div class="ml-msg ml-msg-error"  id="ml-signin-err"></div>
      <div class="ml-msg ml-msg-success" id="ml-signin-ok"></div>
    </div>

    <!-- Forgot password form -->
    <div id="ml-form-forgot" style="display:none;">
      <p style="font-size:13px;color:rgba(221,225,240,0.60);line-height:1.5;margin-bottom:16px;">Enter the email you signed up with — we'll send you a link to reset your password.</p>
      <div class="ml-field">
        <label class="ml-label" for="ml-forgot-email">Email</label>
        <input class="ml-input" id="ml-forgot-email" type="email" placeholder="you@school.co.za" autocomplete="email">
      </div>
      <button class="ml-submit" id="ml-btn-forgot">Send reset link</button>
      <div class="ml-msg ml-msg-error"  id="ml-forgot-err"></div>
      <div class="ml-msg ml-msg-success" id="ml-forgot-ok"></div>
      <div style="text-align:center;margin-top:14px;">
        <button type="button" class="ml-forgot-link" id="ml-forgot-back">← Back to sign in</button>
      </div>
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

      <!-- Subjects taught — only shows for teachers -->
      <div id="ml-subjects-section" style="display:none;">
        <div class="ml-field">
          <label class="ml-label" for="ml-signup-subjects">Subject(s) you teach <span style="text-transform:none;font-weight:400;">(optional)</span></label>
          <input class="ml-input" id="ml-signup-subjects" type="text" placeholder="e.g. Mathematics, Physical Sciences">
        </div>
      </div>

      <div class="ml-field">
        <label class="ml-label" for="ml-signup-school">School</label>
        <input class="ml-input" id="ml-signup-school" type="text" placeholder="e.g. Westerford High School" autocomplete="organization">
      </div>

      <div class="ml-field">
        <label class="ml-label" for="ml-signup-province">Province <span style="text-transform:none;font-weight:400;">(optional)</span></label>
        <select class="ml-input" id="ml-signup-province">
          <option value="">Select province…</option>
          <option>Eastern Cape</option>
          <option>Free State</option>
          <option>Gauteng</option>
          <option>KwaZulu-Natal</option>
          <option>Limpopo</option>
          <option>Mpumalanga</option>
          <option>Northern Cape</option>
          <option>North West</option>
          <option>Western Cape</option>
        </select>
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
  const formForgot    = () => document.getElementById('ml-form-forgot');
  const gradeSection  = () => document.getElementById('ml-grade-section');
  const subjectsSection = () => document.getElementById('ml-subjects-section');
  const signinErr     = () => document.getElementById('ml-signin-err');
  const signinOk      = () => document.getElementById('ml-signin-ok');
  const signupErr     = () => document.getElementById('ml-signup-err');
  const signupOk      = () => document.getElementById('ml-signup-ok');
  const forgotErr     = () => document.getElementById('ml-forgot-err');
  const forgotOk      = () => document.getElementById('ml-forgot-ok');

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
    document.querySelector('.ml-tabs').style.display = '';
    document.getElementById('ml-tab-signin').classList.toggle('ml-active', tab === 'signin');
    document.getElementById('ml-tab-signup').classList.toggle('ml-active', tab === 'signup');
    formSignin().style.display = tab === 'signin' ? '' : 'none';
    formSignup().style.display = tab === 'signup' ? '' : 'none';
    formForgot().style.display = 'none';
    document.getElementById('ml-modal-title').textContent =
      tab === 'signin' ? 'Welcome back' : 'Create your account';
    document.getElementById('ml-modal-sub').textContent =
      tab === 'signin' ? 'Sign in to track your progress' : 'Free to start — join the lab today';
    _clearMessages();
  }

  document.getElementById('ml-tab-signin').addEventListener('click', () => _switchTab('signin'));
  document.getElementById('ml-tab-signup').addEventListener('click', () => _switchTab('signup'));

  // ── 5b. Forgot password sub-view ───────────────────────────
  // Not a third tab — it's reached only from "Forgot password?" under
  // the sign-in form, and always returns to sign-in, so the tab row
  // itself hides while it's showing rather than gaining a third tab.
  function _showForgot() {
    _activeTab = 'forgot';
    document.querySelector('.ml-tabs').style.display = 'none';
    formSignin().style.display = 'none';
    formSignup().style.display = 'none';
    formForgot().style.display = '';
    document.getElementById('ml-modal-title').textContent = 'Reset your password';
    document.getElementById('ml-modal-sub').textContent = "We'll email you a link";
    _clearMessages();
    const prefill = document.getElementById('ml-signin-email').value.trim();
    if (prefill) document.getElementById('ml-forgot-email').value = prefill;
  }

  document.getElementById('ml-forgot-link').addEventListener('click', _showForgot);
  document.getElementById('ml-forgot-back').addEventListener('click', () => _switchTab('signin'));

  document.getElementById('ml-btn-forgot').addEventListener('click', async () => {
    const btn   = document.getElementById('ml-btn-forgot');
    const email = document.getElementById('ml-forgot-email').value.trim();
    if (!email) { _showErr(forgotErr(), 'Please enter your email.'); return; }

    _clearMessages();
    btn.disabled = true; btn.textContent = 'Sending…';
    const { error } = await window.MagicLabAuth.sendPasswordReset(email);
    btn.disabled = false; btn.textContent = 'Send reset link';

    if (error) {
      _showErr(forgotErr(), _friendlyError(error.message));
    } else {
      // Supabase returns success here even for an unregistered email
      // (so the form can't be used to probe which emails have
      // accounts) — the message reflects that honestly.
      _showOk(forgotOk(), "✓ If that email has an account, a reset link is on its way.");
    }
  });

  // ── 6. Role selector ───────────────────────────────────────
  document.querySelectorAll('#ml-role-row .ml-role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      _selectedRole = btn.dataset.role;
      document.querySelectorAll('#ml-role-row .ml-role-btn').forEach(b => b.classList.remove('ml-selected'));
      btn.classList.add('ml-selected');
      gradeSection().style.display = _selectedRole === 'student' ? '' : 'none';
      subjectsSection().style.display = _selectedRole === 'teacher' ? '' : 'none';
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

    _clearMessages();
    btn.disabled = true; btn.textContent = 'Signing in…';
    const { error } = await window.MagicLabAuth.signIn(email, password);

    if (error) {
      btn.disabled = false; btn.textContent = 'Sign In';
      _showErr(signinErr(), _friendlyError(error.message));
    } else {
      _showOk(signinOk(), '✓ Signed in! Loading your progress…');
      // Wait for onAuthStateChange + profile fetch to settle before closing.
      // A fixed setTimeout races against the async profile fetch and loses.
      // signIn() triggers onAuthStateChange, which fires magiclab:auth:change
      // once the profile fetch resolves — that's the real "done" signal.
      const _onReady = (e) => {
        if (!e.detail?.profile) return; // ignore spurious fires with null profile
        document.removeEventListener('magiclab:auth:change', _onReady);
        _renderNavAuth(e.detail.profile);
        closeModal();
      };
      document.addEventListener('magiclab:auth:change', _onReady);
      // Safety fallback: close after 3s regardless, so the modal never gets stuck
      setTimeout(() => {
        document.removeEventListener('magiclab:auth:change', _onReady);
        const profile = window.MagicLabAuth?.getProfile();
        if (profile) _renderNavAuth(profile);
        closeModal();
      }, 3000);
    }
  });

  // ── 9. Sign Up ─────────────────────────────────────────────
  document.getElementById('ml-btn-signup').addEventListener('click', async () => {
    const btn      = document.getElementById('ml-btn-signup');
    const name     = document.getElementById('ml-signup-name').value.trim();
    const email    = document.getElementById('ml-signup-email').value.trim();
    const password = document.getElementById('ml-signup-password').value;
    const school   = document.getElementById('ml-signup-school').value.trim();
    const province = document.getElementById('ml-signup-province').value;
    const subjects = document.getElementById('ml-signup-subjects').value.trim();

    if (!name || !email || !password) { _showErr(signupErr(), 'Please fill in all fields.'); return; }
    if (password.length < 8)          { _showErr(signupErr(), 'Password must be at least 8 characters.'); return; }
    if (!school) { _showErr(signupErr(), 'Please enter your school.'); return; }
    if (_selectedRole === 'student' && !_selectedGrade) {
      _showErr(signupErr(), 'Please select your grade.'); return;
    }

    _clearMessages();
    btn.disabled = true; btn.textContent = 'Creating account…';
    const { error } = await window.MagicLabAuth.signUp(
      email, password, name, _selectedRole,
      _selectedRole === 'student' ? _selectedGrade : null,
      { school, province, subjects: _selectedRole === 'teacher' ? subjects : null }
    );
    btn.disabled = false; btn.textContent = 'Create Account';

    if (error) {
      _showErr(signupErr(), _friendlyError(error.message));
    } else {
      // With email confirmation off, signup immediately creates a session.
      // Wait for the profile to be ready then close, same as sign-in.
      _showOk(signupOk(), '✓ Account created! Signing you in…');
      const _onReady = (e) => {
        if (!e.detail?.profile) return;
        document.removeEventListener('magiclab:auth:change', _onReady);
        _renderNavAuth(e.detail.profile);
        closeModal();
      };
      document.addEventListener('magiclab:auth:change', _onReady);
      setTimeout(() => {
        document.removeEventListener('magiclab:auth:change', _onReady);
        const profile = window.MagicLabAuth?.getProfile();
        if (profile) _renderNavAuth(profile);
        closeModal();
      }, 3000);
    }
  });

  // ── 10. Close button + overlay click ──────────────────────
  document.getElementById('ml-close').addEventListener('click', closeModal);
  overlay().addEventListener('click', (e) => { if (e.target === overlay()) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // ── 10b. Enter key submits the active form ─────────────────
  // Attached to document (not overlay) so the element is guaranteed to exist.
  // Guard with ml-open so it only fires when the modal is actually visible.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    if (!overlay().classList.contains('ml-open')) return;
    if (e.target.tagName === 'BUTTON') return;
    if (e.target.tagName === 'TEXTAREA') return;
    e.preventDefault();
    if (_activeTab === 'signin') {
      document.getElementById('ml-btn-signin').click();
    } else if (_activeTab === 'forgot') {
      document.getElementById('ml-btn-forgot').click();
    } else {
      document.getElementById('ml-btn-signup').click();
    }
  });

  // ── 11. Nav rendering ─────────────────────────────────────
  // Listen for auth state changes and re-render the nav chip.
  // We use MagicLabAuth.onAuthChange rather than the DOM event so we
  // always get the final settled state after profile fetch completes.
  document.addEventListener('magiclab:auth:ready', ({ detail: { profile } }) => {
    if (!overlay().classList.contains('ml-open')) {
      _renderNavAuth(profile);
    }
  });

  // Re-render immediately on every auth state change (sign-in, sign-out, token refresh).
  // This replaces the 5s timeout path for the common case — the timeout is now just a fallback.
  document.addEventListener('magiclab:auth:change', ({ detail: { profile } }) => {
    if (!overlay().classList.contains('ml-open')) {
      _renderNavAuth(profile);
    }
  });

  // Re-render whenever auth state changes
  document.addEventListener('DOMContentLoaded', () => {
    const existing = document.querySelectorAll('[data-ml-auth]');
    existing.forEach(el => _wireAuthTrigger(el));
  });

  // Registered once, not per-render (_renderNavAuth can fire many times
  // across a page's life as auth state changes) — closes whichever user
  // menu is open on an outside click or Escape, regardless of how many
  // [data-ml-auth] targets exist on the page.
  function _closeUserMenu(menu) {
    menu.classList.remove('ml-open');
    const btn = menu.previousElementSibling;
    if (btn && btn.id === 'ml-user-chip-btn') btn.setAttribute('aria-expanded', 'false');
  }
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.ml-user-menu.ml-open').forEach(menu => {
      if (!menu.parentElement.contains(e.target)) _closeUserMenu(menu);
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.ml-user-menu.ml-open').forEach(_closeUserMenu);
  });

  function _renderNavAuth(profile) {
    // Use a stable wrapper approach instead of outerHTML replacement.
    // outerHTML destroys the element reference, making subsequent
    // querySelectorAll calls find a different node each time.
    const targets = document.querySelectorAll('[data-ml-auth]');
    targets.forEach(target => {
      if (profile) {
        const initials = profile.display_name
          ? profile.display_name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()
          : profile.email[0].toUpperCase();
        const isTeacher = profile.role === 'teacher';
        // Replace content in-place rather than swapping the element itself.
        // target is now the positioning wrapper for a trigger button + a
        // dropdown menu that replaces what used to be a permanently-visible
        // name + separate "Sign out" text sitting in the header, plus the
        // "My Progress" button every tool page repeated in its own header.
        target.className = 'ml-user-chip-wrap';
        target.onclick = null;
        target.innerHTML = `
          <div class="ml-user-chip" id="ml-user-chip-btn" role="button" tabindex="0" aria-haspopup="true" aria-expanded="false">
            <div class="ml-user-avatar">${initials}</div>
            <span class="ml-user-name">${profile.display_name || profile.email.split('@')[0]}</span>
            <svg class="ml-user-chevron" width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="ml-user-menu" id="ml-user-menu">
            <a href="/account.html" class="ml-user-menu-item"><span class="ml-umi-icon">👤</span> My Account</a>
            <a href="/dashboard-student.html" class="ml-user-menu-item"><span class="ml-umi-icon">📊</span> My Progress</a>
            ${isTeacher ? '<a href="/dashboard-teacher.html" class="ml-user-menu-item"><span class="ml-umi-icon">🎓</span> Teacher Dashboard</a>' : ''}
            <div class="ml-user-menu-sep"></div>
            <button class="ml-user-menu-item ml-user-menu-signout" id="ml-signout-btn" type="button"><span class="ml-umi-icon">🚪</span> Sign out</button>
          </div>`;

        const chipBtn = target.querySelector('#ml-user-chip-btn');
        const menu    = target.querySelector('#ml-user-menu');
        const toggleMenu = () => {
          document.querySelectorAll('.ml-user-menu.ml-open').forEach(m => { if (m !== menu) _closeUserMenu(m); });
          const open = menu.classList.toggle('ml-open');
          chipBtn.setAttribute('aria-expanded', String(open));
        };
        chipBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
        // chipBtn is a div[role="button"] (a real <button> can't nest inside
        // the <button data-ml-auth> this replaces), so Enter/Space activation
        // has to be wired manually — a native button gets this for free.
        chipBtn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); }
        });

        // Wire sign-out separately so it doesn't rely on inline onclick
        const soBtn = target.querySelector('#ml-signout-btn');
        if (soBtn) {
          soBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            await window.MagicLabAuth.signOut();
            location.reload();
          });
        }
      } else {
        target.className = 'nav-pill ml-auth-btn';
        target.innerHTML = '🔐 Sign In';
        target.onclick = () => openModal('signin');
      }
    });
    document.dispatchEvent(new CustomEvent('magiclab:nav:rendered', { detail: { profile } }));
  }

  // ── 12. Utility ───────────────────────────────────────────
  function _showErr(el, msg) { el.textContent = msg; el.className = 'ml-msg ml-msg-error ml-show'; }
  function _showOk(el, msg)  { el.textContent = msg; el.className = 'ml-msg ml-msg-success ml-show'; }
  function _clearMessages()  {
    [signinErr(), signinOk(), signupErr(), signupOk(), forgotErr(), forgotOk()].forEach(el => {
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

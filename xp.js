// ============================================================
// THE MAGIC LAB — xp.js
// Gamification engine: XP, levels, streaks, badges
// Include AFTER auth.js and progress.js on every page:
//   <script defer src="xp.js"></script>
// ============================================================

(function () {

  // ── LEVEL CONFIG ─────────────────────────────────────────
  // 15 levels, ceiling 65,000 XP — designed for a 5-year
  // curriculum. Only thresholds live here; raw XP in Supabase
  // is never recalculated — levels derive from it at runtime.
  const LEVELS = [
    { level: 1,  name: 'Apprentice',  xp: 0     },
    { level: 2,  name: 'Coder',       xp: 150   },
    { level: 3,  name: 'Maker',       xp: 400   },
    { level: 4,  name: 'Builder',     xp: 800   },
    { level: 5,  name: 'Wizard',      xp: 1500  },
    { level: 6,  name: 'Architect',   xp: 2500  },
    { level: 7,  name: 'Conjurer',    xp: 4000  },
    { level: 8,  name: 'Sorcerer',    xp: 6500  },
    { level: 9,  name: 'Alchemist',   xp: 10000 },
    { level: 10, name: 'Enchanter',   xp: 15000 },
    { level: 11, name: 'Sage',        xp: 22000 },
    { level: 12, name: 'Oracle',      xp: 30000 },
    { level: 13, name: 'Archmage',    xp: 40000 },
    { level: 14, name: 'Legend',      xp: 50000 },
    { level: 15, name: 'Grand Master',xp: 65000 },
  ];

  // ── XP RATES ─────────────────────────────────────────────
  // All rates in one place — easy to rebalance after pilot
  const XP_RATES = {
    lesson_complete:    10,
    quiz_correct_first: 5,
    quiz_correct_retry: 2,
    quiz_perfect_bonus: 15,   // awarded when all Q in a lesson correct first try
    unit_complete:      25,
    tool_complete:      100,  // all lessons in a tool done
    code_run:           3,
    daily_first_lesson: 5,    // streak bonus on first lesson of the day
  };

  // ── BADGE DEFINITIONS ────────────────────────────────────
  // criteria.type options: 'xp', 'level', 'streak', 'lessons',
  //   'tool_complete', 'tools_used', 'quiz_perfect', 'code_runs'
  const BADGES = [
    // ── First steps ──
    { id: 'first_lesson',      icon: '🌱', name: 'First Steps',       desc: 'Complete your first lesson',                     criteria: { type: 'lessons',      value: 1   } },
    { id: 'ten_lessons',       icon: '📚', name: 'Bookworm',          desc: 'Complete 10 lessons',                            criteria: { type: 'lessons',      value: 10  } },
    { id: 'fifty_lessons',     icon: '🎒', name: 'Dedicated Learner', desc: 'Complete 50 lessons',                            criteria: { type: 'lessons',      value: 50  } },
    { id: 'hundred_lessons',   icon: '🏆', name: 'Century',           desc: 'Complete 100 lessons',                           criteria: { type: 'lessons',      value: 100 } },

    // ── XP milestones ──
    { id: 'xp_100',            icon: '⚡', name: 'Sparked',           desc: 'Earn 100 XP',                                    criteria: { type: 'xp',           value: 100   } },
    { id: 'xp_1000',           icon: '🔥', name: 'On Fire',           desc: 'Earn 1,000 XP',                                  criteria: { type: 'xp',           value: 1000  } },
    { id: 'xp_5000',           icon: '💫', name: 'Rising Star',       desc: 'Earn 5,000 XP',                                  criteria: { type: 'xp',           value: 5000  } },
    { id: 'xp_15000',          icon: '🌟', name: 'Star Pupil',        desc: 'Earn 15,000 XP',                                 criteria: { type: 'xp',           value: 15000 } },

    // ── Level milestones ──
    { id: 'level_5',           icon: '🧙', name: 'Wizard',            desc: 'Reach Level 5',                                  criteria: { type: 'level',        value: 5  } },
    { id: 'level_10',          icon: '✨', name: 'Enchanter',         desc: 'Reach Level 10',                                 criteria: { type: 'level',        value: 10 } },
    { id: 'level_15',          icon: '👑', name: 'Grand Master',      desc: 'Reach Level 15 — the pinnacle',                  criteria: { type: 'level',        value: 15 } },

    // ── Streak badges ──
    { id: 'streak_3',          icon: '🌿', name: 'Getting Started',   desc: '3-day learning streak',                          criteria: { type: 'streak',       value: 3   } },
    { id: 'streak_7',          icon: '🔥', name: 'Week Warrior',      desc: '7-day learning streak',                          criteria: { type: 'streak',       value: 7   } },
    { id: 'streak_14',         icon: '💪', name: 'Fortnight Focus',   desc: '14-day learning streak',                         criteria: { type: 'streak',       value: 14  } },
    { id: 'streak_30',         icon: '💎', name: 'Dedicated',         desc: '30-day learning streak',                         criteria: { type: 'streak',       value: 30  } },
    { id: 'streak_100',        icon: '🌋', name: 'Unstoppable',       desc: '100-day learning streak',                        criteria: { type: 'streak',       value: 100 } },

    // ── Quiz / accuracy ──
    { id: 'first_perfect',     icon: '🎯', name: 'Perfect Score',     desc: 'Get 100% on any quiz',                           criteria: { type: 'quiz_perfect', value: 1   } },
    { id: 'ten_perfect',       icon: '🏅', name: 'Quiz Master',       desc: 'Get 10 perfect quiz scores',                     criteria: { type: 'quiz_perfect', value: 10  } },

    // ── Code running ──
    { id: 'first_run',         icon: '🚀', name: 'First Run',         desc: 'Run your first program',                         criteria: { type: 'code_runs',    value: 1   } },
    { id: 'fifty_runs',        icon: '⚙️', name: 'Code Machine',      desc: 'Run 50 programs',                                criteria: { type: 'code_runs',    value: 50  } },

    // ── Tool-specific ──
    { id: 'tool_java',         icon: '🧞', name: 'Genie Freed',       desc: 'Complete all Java Genie lessons',                criteria: { type: 'tool_complete', value: 'java-genie'     } },
    { id: 'tool_web',          icon: '🌐', name: 'Web Wizard',        desc: 'Complete all Web Wizard lessons',                criteria: { type: 'tool_complete', value: 'web-wizard'     } },
    { id: 'tool_conjurer',     icon: '📜', name: 'Fully Conjured',    desc: 'Complete all Code Conjurer lessons',             criteria: { type: 'tool_complete', value: 'code-conjurer'  } },
    { id: 'tool_math',         icon: '🔢', name: 'Mathemagician',     desc: 'Complete all Math Magician topics',              criteria: { type: 'tool_complete', value: 'math-magician'  } },
    { id: 'tool_codex',        icon: '💻', name: 'Digital Native',    desc: 'Complete all Computer Codex lessons',            criteria: { type: 'tool_complete', value: 'computer-codex' } },

    // ── Exploration ──
    { id: 'three_tools',       icon: '🗺️', name: 'Explorer',          desc: 'Use 3 different tools',                          criteria: { type: 'tools_used',   value: 3 } },
    { id: 'five_tools',        icon: '🌍', name: 'All-Rounder',       desc: 'Use all 5 tools',                                criteria: { type: 'tools_used',   value: 5 } },
  ];

  // ── DERIVED FUNCTIONS ─────────────────────────────────────

  /**
   * Get level info for a given XP total.
   * Returns: { level, name, xp (threshold), nextXP, progress (0–1) }
   */
  function getLevelInfo(totalXP) {
    let current = LEVELS[0];
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (totalXP >= LEVELS[i].xp) { current = LEVELS[i]; break; }
    }
    const next = LEVELS.find(l => l.xp > totalXP) || null;
    const progress = next
      ? (totalXP - current.xp) / (next.xp - current.xp)
      : 1;
    return {
      level:    current.level,
      name:     current.name,
      xp:       current.xp,
      nextXP:   next ? next.xp : null,
      nextName: next ? next.name : null,
      progress: Math.min(1, Math.max(0, progress)),
      xpToNext: next ? next.xp - totalXP : 0,
    };
  }

  /**
   * Award XP to the current user.
   * Writes to profiles.xp and fires a progress_event.
   * @param {number} amount
   * @param {string} reason  — human-readable event label
   * @param {string} [tool]  — tool slug if applicable
   */
  async function awardXP(amount, reason, tool = null) {
    if (!window.MagicLabAuth?.isLoggedIn()) return;
    const supabase = window.MagicLabAuth._supabase();
    const profile  = window.MagicLabAuth.getProfile();
    const session  = window.MagicLabAuth.getSession();
    const userId   = profile?.id ?? session?.user?.id;
    if (!userId || amount <= 0) return;

    try {
      // Increment xp on the profile row
      const { data: updated } = await supabase.rpc('increment_xp', {
        user_id: userId,
        amount:  amount
      });

      // Also track in progress_events for the activity feed
      await supabase.from('progress_events').insert({
        user_id:    userId,
        tool:       tool || 'platform',
        event_type: 'xp_earned',
        topic:      reason,
        score:      amount,
        metadata:   { xp: amount, reason }
      });

      // Check for newly unlocked badges after XP update
      if (updated) {
        const newXP = updated.xp;
        await _checkAndAwardBadges(userId, supabase);
        // Dispatch a DOM event so nav chips etc. can update
        document.dispatchEvent(new CustomEvent('magiclab:xp:updated', {
          detail: { xp: newXP, amount, reason }
        }));
      }
    } catch (e) {
      console.warn('[MagicLab] awardXP failed:', e.message);
    }
  }

  /**
   * Record a day of activity and update streak.
   * Call once per session (deduplicated server-side via daily_activity).
   */
  async function recordDailyActivity() {
    if (!window.MagicLabAuth?.isLoggedIn()) return;
    const supabase = window.MagicLabAuth._supabase();
    const profile  = window.MagicLabAuth.getProfile();
    const session  = window.MagicLabAuth.getSession();
    const userId   = profile?.id ?? session?.user?.id;
    if (!userId) return;

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    try {
      // Upsert today's activity row (idempotent)
      const { data, error } = await supabase
        .from('daily_activity')
        .upsert({ user_id: userId, date: today }, { onConflict: 'user_id,date' })
        .select()
        .single();

      if (error) { console.warn('[MagicLab] daily_activity upsert:', error.message); return; }

      // If this is a new row for today, update the streak
      if (data) {
        await supabase.rpc('update_streak', { user_id: userId });
        // Streak bonus XP only if truly first activity today
        if (data.created_at && new Date(data.created_at).toISOString().slice(0,10) === today) {
          const existing = await supabase
            .from('progress_events')
            .select('id')
            .eq('user_id', userId)
            .eq('event_type', 'xp_earned')
            .eq('topic', 'Daily streak bonus')
            .gte('created_at', today)
            .maybeSingle();
          if (!existing.data) {
            await awardXP(XP_RATES.daily_first_lesson, 'Daily streak bonus');
          }
        }
      }
    } catch (e) {
      console.warn('[MagicLab] recordDailyActivity failed:', e.message);
    }
  }

  /**
   * Check all badge criteria and award any newly earned badges.
   * Safe to call multiple times — server guards against duplicates.
   */
  async function _checkAndAwardBadges(userId, supabase) {
    try {
      // Get current state
      const [profileRes, progressRes, eventsRes, badgesRes] = await Promise.all([
        supabase.from('profiles').select('xp, streak_current').eq('id', userId).single(),
        supabase.from('tool_progress').select('*').eq('user_id', userId),
        supabase.from('progress_events').select('event_type, tool').eq('user_id', userId),
        supabase.from('user_badges').select('badge_id').eq('user_id', userId),
      ]);

      const profile       = profileRes.data || {};
      const progress      = progressRes.data || [];
      const events        = eventsRes.data  || [];
      const earnedIds     = new Set((badgesRes.data || []).map(b => b.badge_id));

      // Derived stats
      const totalXP       = profile.xp || 0;
      const streak        = profile.streak_current || 0;
      const levelInfo     = getLevelInfo(totalXP);
      const totalLessons  = progress.reduce((s, r) => s + (r.topics_complete || 0), 0);
      const totalRuns     = progress.reduce((s, r) => s + (r.code_runs || 0), 0);
      const perfectCount  = events.filter(e => e.event_type === 'quiz_perfect').length;
      const toolsUsed     = new Set(progress.map(r => r.tool)).size;
      const toolsComplete = new Set(
        progress.filter(r => r.all_complete).map(r => r.tool)
      );

      const newBadges = [];

      for (const badge of BADGES) {
        if (earnedIds.has(badge.id)) continue; // already earned
        const { type, value } = badge.criteria;
        let earned = false;

        if (type === 'xp'           && totalXP >= value)            earned = true;
        if (type === 'level'        && levelInfo.level >= value)    earned = true;
        if (type === 'streak'       && streak >= value)             earned = true;
        if (type === 'lessons'      && totalLessons >= value)       earned = true;
        if (type === 'code_runs'    && totalRuns >= value)          earned = true;
        if (type === 'quiz_perfect' && perfectCount >= value)       earned = true;
        if (type === 'tools_used'   && toolsUsed >= value)         earned = true;
        if (type === 'tool_complete'&& toolsComplete.has(value))   earned = true;

        if (earned) newBadges.push({ user_id: userId, badge_id: badge.id });
      }

      if (newBadges.length) {
        await supabase.from('user_badges').insert(newBadges);
        // Dispatch so dashboard/nav can react
        const badgeDefs = newBadges.map(b => BADGES.find(d => d.id === b.badge_id));
        document.dispatchEvent(new CustomEvent('magiclab:badges:earned', {
          detail: { badges: badgeDefs }
        }));
      }
    } catch (e) {
      console.warn('[MagicLab] badge check failed:', e.message);
    }
  }

  /**
   * Fetch the current user's XP + streak from Supabase.
   * Returns: { xp, level (object from getLevelInfo), streak_current, streak_longest }
   */
  async function getPlayerStats() {
    if (!window.MagicLabAuth?.isLoggedIn()) return null;
    const supabase = window.MagicLabAuth._supabase();
    const profile  = window.MagicLabAuth.getProfile();
    const session  = window.MagicLabAuth.getSession();
    const userId   = profile?.id ?? session?.user?.id;
    if (!userId) return null;

    try {
      const { data } = await supabase
        .from('profiles')
        .select('xp, streak_current, streak_longest')
        .eq('id', userId)
        .single();

      if (!data) return null;
      const xp = data.xp || 0;
      return {
        xp,
        level:           getLevelInfo(xp),
        streak_current:  data.streak_current  || 0,
        streak_longest:  data.streak_longest  || 0,
      };
    } catch (e) {
      console.warn('[MagicLab] getPlayerStats failed:', e.message);
      return null;
    }
  }

  /**
   * Fetch all badges for the current user.
   * Returns: { earned: Badge[], all: Badge[] }
   */
  async function getBadges() {
    if (!window.MagicLabAuth?.isLoggedIn()) return { earned: [], all: BADGES };
    const supabase = window.MagicLabAuth._supabase();
    const profile  = window.MagicLabAuth.getProfile();
    const session  = window.MagicLabAuth.getSession();
    const userId   = profile?.id ?? session?.user?.id;
    if (!userId) return { earned: [], all: BADGES };

    try {
      const { data } = await supabase
        .from('user_badges')
        .select('badge_id, earned_at')
        .eq('user_id', userId);

      const earnedMap = Object.fromEntries((data || []).map(b => [b.badge_id, b.earned_at]));
      const earned = BADGES
        .filter(b => earnedMap[b.id])
        .map(b => ({ ...b, earned_at: earnedMap[b.id] }));

      return { earned, all: BADGES };
    } catch (e) {
      console.warn('[MagicLab] getBadges failed:', e.message);
      return { earned: [], all: BADGES };
    }
  }

  // ── NAV XP CHIP ──────────────────────────────────────────
  // After auth is ready, inject XP/streak info next to the user chip.
  // This runs on every page that includes xp.js.

  async function _updateNavXPChip() {
    const stats = await getPlayerStats();
    if (!stats) return;

    const existing = document.getElementById('ml-xp-nav-chip');
    if (existing) { existing.remove(); }

    // Find the user chip to insert after
    const userChip = document.querySelector('.ml-user-chip, [data-ml-auth]');
    if (!userChip) return;

    const chip = document.createElement('div');
    chip.id = 'ml-xp-nav-chip';
    chip.style.cssText = 'display:flex;align-items:center;gap:10px;';

    // XP + level badge
    const levelInfo = stats.level;
    chip.innerHTML = `
      <a href="dashboard-student.html" style="display:flex;align-items:center;gap:7px;text-decoration:none;
        padding:5px 12px;border-radius:99px;border:1px solid rgba(124,109,250,0.30);
        background:rgba(124,109,250,0.10);transition:all 140ms;"
        onmouseover="this.style.background='rgba(124,109,250,0.20)'"
        onmouseout="this.style.background='rgba(124,109,250,0.10)'">
        <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;
          color:rgba(196,186,255,0.65);text-transform:uppercase;letter-spacing:0.08em;">Lv ${levelInfo.level}</span>
        <div style="width:52px;height:4px;background:rgba(255,255,255,0.10);border-radius:99px;overflow:hidden;">
          <div style="height:100%;width:${Math.round(levelInfo.progress*100)}%;
            background:linear-gradient(90deg,#7c6dfa,#11d98f);border-radius:99px;"></div>
        </div>
        <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;color:#c4baff;">
          ${stats.xp.toLocaleString()} XP</span>
      </a>
      ${stats.streak_current >= 2 ? `
      <span style="display:flex;align-items:center;gap:4px;padding:4px 10px;border-radius:99px;
        border:1px solid rgba(245,166,35,0.28);background:rgba(245,166,35,0.10);
        font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;color:#f5a623;">
        🔥 ${stats.streak_current}
      </span>` : ''}
    `;

    userChip.parentNode.insertBefore(chip, userChip.nextSibling);
  }

  // ── TOAST NOTIFICATION ───────────────────────────────────
  // Lightweight XP/badge toast — no dependencies

  function _showToast(icon, title, sub, color = '#7c6dfa') {
    const existing = document.getElementById('ml-gamification-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'ml-gamification-toast';
    toast.style.cssText = `
      position:fixed;bottom:80px;right:24px;z-index:99999;
      display:flex;align-items:center;gap:12px;
      padding:14px 18px;border-radius:16px;
      background:#0d1226;border:1px solid rgba(255,255,255,0.12);
      box-shadow:0 8px 32px rgba(0,0,0,0.50);
      font-family:'Cabinet Grotesk',sans-serif;
      transform:translateY(20px);opacity:0;
      transition:all 280ms cubic-bezier(0.34,1.2,0.64,1);
      max-width:300px;
    `;
    toast.innerHTML = `
      <div style="width:38px;height:38px;border-radius:11px;flex-shrink:0;
        background:${color}22;border:1px solid ${color}44;
        display:flex;align-items:center;justify-content:center;font-size:20px;">${icon}</div>
      <div>
        <div style="font-size:14px;font-weight:700;color:#e4e8f8;line-height:1.2;">${title}</div>
        <div style="font-size:12px;color:rgba(210,218,245,0.50);margin-top:2px;">${sub}</div>
      </div>
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity   = '1';
    });
    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity   = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ── GLOBAL EVENT LISTENERS ───────────────────────────────

  // When XP is updated, show a toast and refresh the nav chip
  document.addEventListener('magiclab:xp:updated', (e) => {
    const { amount, reason } = e.detail;
    _showToast('⚡', `+${amount} XP`, reason, '#7c6dfa');
    setTimeout(_updateNavXPChip, 400); // slight delay so Supabase has settled
  });

  // When badges are earned, show a toast per badge
  document.addEventListener('magiclab:badges:earned', (e) => {
    e.detail.badges.forEach((badge, i) => {
      setTimeout(() => {
        _showToast(badge.icon, `Badge unlocked!`, badge.name, '#f5a623');
      }, i * 800);
    });
  });

  // When auth is ready and user is logged in, inject nav chip
  document.addEventListener('magiclab:auth:ready', async ({ detail: { profile } }) => {
    if (profile) {
      await _updateNavXPChip();
      // Record a daily activity entry (idempotent — safe to call every page load)
      recordDailyActivity();
    }
  });

  // ── PUBLIC API ───────────────────────────────────────────
  window.MagicLabXP = {
    awardXP,
    getLevelInfo,
    getPlayerStats,
    getBadges,
    recordDailyActivity,
    XP_RATES,
    LEVELS,
    BADGES,
  };

  document.dispatchEvent(new CustomEvent('magiclab:xp:ready'));

})();

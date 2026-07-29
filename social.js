// ============================================================
// THE MAGIC LAB — social.js
// Friends + lesson invites SDK — include after auth.js and progress.js
// Usage: <script src="auth.js"></script>
//        <script src="progress.js"></script>
//        <script src="social.js"></script>
//
// Requires the tables/functions created by social-schema.sql
// (friendships, lesson_invites, get_my_classmates, etc.) to exist in
// Supabase. No student-to-student chat here — friends can only invite
// each other to complete a lesson together (async, tracked server-side).
// ============================================================

document.addEventListener('magiclab:auth:ready', () => {
  window.MagicLabSocial = {
    getMyFriendCode,
    addFriendByCode,
    acceptFriendRequest,
    removeFriendship,
    getFriends,
    getPendingIncoming,
    sendLessonInvite,
    acceptLessonInvite,
    removeLessonInvite,
    getMyLessonInvites,
  };
  document.dispatchEvent(new CustomEvent('magiclab:social:ready'));
});

function _uid() {
  const auth = window.MagicLabAuth;
  return auth?.getProfile()?.id ?? auth?.getSession()?.user?.id ?? null;
}

/** The current user's own friend code, generating one on first call. */
async function getMyFriendCode() {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return null;
  const { data, error } = await auth._supabase().rpc('get_or_create_my_friend_code');
  if (error) { console.warn('[MagicLab] getMyFriendCode error:', error.message); return null; }
  return data;
}

/**
 * Sends a friend request to whoever owns `code`. Only succeeds if that
 * learner shares a class with the caller — the RPC returns a specific
 * error message otherwise (wrong code, not classmates, already friends).
 */
async function addFriendByCode(code) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  const { data, error } = await auth._supabase().rpc('send_friend_request_by_code', { p_code: code });
  if (error) return { error };
  if (data?.error) return { error: { message: data.error } };
  return { data };
}

async function acceptFriendRequest(friendshipId) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  const { data, error } = await auth._supabase()
    .from('friendships')
    .update({ status: 'accepted', responded_at: new Date().toISOString() })
    .eq('id', friendshipId)
    .select()
    .single();
  return { data, error };
}

/**
 * Removes a friendship row — used for cancelling a pending request,
 * declining an incoming one, and unfriending an accepted one.
 */
async function removeFriendship(friendshipId) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  const { error } = await auth._supabase().from('friendships').delete().eq('id', friendshipId);
  return { error };
}

/**
 * Accepted friends, with each row shaped like a classmate for reuse in
 * the "invite a friend" picker: { id, displayName, friendshipId }.
 * Goes through the get_my_friends RPC rather than a client-side embedded
 * select (friendships -> profiles), because profiles RLS doesn't grant
 * one student blanket read access to an arbitrary other student's row —
 * the embedded select silently came back null and the UI fell back to a
 * generic "Classmate" label.
 */
async function getFriends() {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return [];
  const { data, error } = await auth._supabase().rpc('get_my_friends');
  if (error) { console.warn('[MagicLab] getFriends error:', error.message); return []; }
  return (data || []).map(r => ({
    id: r.friend_id, displayName: r.display_name || 'Classmate', friendshipId: r.friendship_id,
  }));
}

/** Incoming pending friend requests (someone else asked to be friends). */
async function getPendingIncoming() {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return [];
  const { data, error } = await auth._supabase().rpc('get_my_pending_friend_requests');
  if (error) { console.warn('[MagicLab] getPendingIncoming error:', error.message); return []; }
  return (data || []).map(r => ({
    friendshipId: r.friendship_id,
    id: r.requester_id,
    displayName: r.display_name || 'Classmate',
    createdAt: r.created_at,
  }));
}

/**
 * Invite a friend to complete a specific lesson together (async — each
 * completes it on their own time; a shared badge is awarded once both have).
 * @param {string} inviteeId
 * @param {string} tool   — one of window.ML_TOOLS
 * @param {string} topic  — exact string as it appears in window.ML_LESSON_CATALOG
 */
/** True if `topic` is a real, assignable lesson for `tool` per window.ML_LESSON_CATALOG. */
function _isKnownTopic(tool, topic) {
  const groups = window.ML_LESSON_CATALOG?.[tool];
  if (!groups) return false;
  return groups.some(g => (g.lessons || []).some(l => l.value === topic));
}

async function sendLessonInvite(inviteeId, tool, topic) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  const inviterId = _uid();
  if (!inviterId) return { error: { message: 'Not logged in' } };
  if (!inviteeId || !tool || !topic) return { error: { message: 'inviteeId, tool, and topic are required' } };
  // Guard against a tool/topic pair that could never match a completion
  // (handle_lesson_complete_for_invites only fires on real progress_events),
  // which would otherwise leave the invite stuck "pending" forever with no
  // explanation to either side. The normal UI only ever offers catalog
  // values via its dropdowns — this mainly protects direct SDK callers.
  if (!_isKnownTopic(tool, topic)) {
    return { error: { message: `"${topic}" isn't a recognised lesson for that tool, so this invite could never be completed.` } };
  }
  const { data, error } = await auth._supabase()
    .from('lesson_invites')
    .insert({ inviter_id: inviterId, invitee_id: inviteeId, tool, topic })
    .select()
    .single();
  return { data, error };
}

async function acceptLessonInvite(inviteId) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  const { data, error } = await auth._supabase()
    .from('lesson_invites')
    .update({ status: 'accepted', responded_at: new Date().toISOString() })
    .eq('id', inviteId)
    .select()
    .single();
  return { data, error };
}

/** Declines (if pending) or cancels/removes any invite the caller is part of. */
async function removeLessonInvite(inviteId) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  const { error } = await auth._supabase().from('lesson_invites').delete().eq('id', inviteId);
  return { error };
}

/**
 * All lesson invites involving the current user, split into incoming
 * (pending, need a response), and mine (sent or accepted, with the
 * other person's name and current status attached). Goes through the
 * get_my_lesson_invites RPC for the same reason getFriends does — a
 * client-side embedded select can't read the other participant's profile.
 */
async function getMyLessonInvites() {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { incoming: [], mine: [] };
  const userId = _uid();
  if (!userId) return { incoming: [], mine: [] };
  const { data, error } = await auth._supabase().rpc('get_my_lesson_invites');
  if (error) { console.warn('[MagicLab] getMyLessonInvites error:', error.message); return { incoming: [], mine: [] }; }

  const rows = (data || []).map(r => {
    const isInviter = r.inviter_id === userId;
    return {
      id: r.id, tool: r.tool, topic: r.topic, status: r.status,
      createdAt: r.created_at, completedAt: r.completed_at,
      isInviter, otherName: (isInviter ? r.invitee_name : r.inviter_name) || 'Classmate',
    };
  });

  return {
    incoming: rows.filter(r => !r.isInviter && r.status === 'pending'),
    mine:     rows.filter(r => r.isInviter || r.status !== 'pending'),
  };
}

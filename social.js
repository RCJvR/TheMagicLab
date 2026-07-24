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
 */
async function getFriends() {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return [];
  const userId = _uid();
  if (!userId) return [];
  const supabase = auth._supabase();
  const { data, error } = await supabase
    .from('friendships')
    .select('id, requester_id, addressee_id, requester:requester_id(id,display_name), addressee:addressee_id(id,display_name)')
    .eq('status', 'accepted')
    .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`);
  if (error) { console.warn('[MagicLab] getFriends error:', error.message); return []; }
  return (data || []).map(r => {
    const isRequester = r.requester_id === userId;
    const friend = isRequester ? r.addressee : r.requester;
    return { id: friend?.id, displayName: friend?.display_name || 'Classmate', friendshipId: r.id };
  });
}

/** Incoming pending friend requests (someone else asked to be friends). */
async function getPendingIncoming() {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return [];
  const userId = _uid();
  if (!userId) return [];
  const { data, error } = await auth._supabase()
    .from('friendships')
    .select('id, created_at, requester:requester_id(id,display_name)')
    .eq('status', 'pending')
    .eq('addressee_id', userId);
  if (error) { console.warn('[MagicLab] getPendingIncoming error:', error.message); return []; }
  return (data || []).map(r => ({
    friendshipId: r.id,
    id: r.requester?.id,
    displayName: r.requester?.display_name || 'Classmate',
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
async function sendLessonInvite(inviteeId, tool, topic) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  const inviterId = _uid();
  if (!inviterId) return { error: { message: 'Not logged in' } };
  if (!inviteeId || !tool || !topic) return { error: { message: 'inviteeId, tool, and topic are required' } };
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
 * other person's name and current status attached).
 */
async function getMyLessonInvites() {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { incoming: [], mine: [] };
  const userId = _uid();
  if (!userId) return { incoming: [], mine: [] };
  const { data, error } = await auth._supabase()
    .from('lesson_invites')
    .select('id, tool, topic, status, created_at, completed_at, inviter_id, invitee_id, inviter:inviter_id(id,display_name), invitee:invitee_id(id,display_name)')
    .order('created_at', { ascending: false });
  if (error) { console.warn('[MagicLab] getMyLessonInvites error:', error.message); return { incoming: [], mine: [] }; }

  const rows = (data || []).map(r => {
    const isInviter = r.inviter_id === userId;
    const other = isInviter ? r.invitee : r.inviter;
    return {
      id: r.id, tool: r.tool, topic: r.topic, status: r.status,
      createdAt: r.created_at, completedAt: r.completed_at,
      isInviter, otherName: other?.display_name || 'Classmate',
    };
  });

  return {
    incoming: rows.filter(r => !r.isInviter && r.status === 'pending'),
    mine:     rows.filter(r => r.isInviter || r.status !== 'pending'),
  };
}

// ============================================================
// THE MAGIC LAB — sw.js  (updated for Phase 1)
// ============================================================

const CACHE_NAME = 'magic-lab-v68'; // no longer load-bearing for freshness (fetch handler is network-first) — bump only to prune old/removed cached files
// v68: math-magician/gr9 — fixed character-encoding corruption (garbled
// ×, ÷, π, √, arrows, emoji, etc.) across all 15 affected Grade 9 chapter
// files (ch1-8, ch10-12, ch14-17), reconstructed against the byte-clean
// Afrikaans .af.js twins. Also added a native "Nets of each solid" section
// (labeled SVG nets for cube/rect. prism/tri. prism/cylinder/cone/sphere)
// and a "Quick reference — all 6 solids" formula/example card grid to
// gr9/ch15.js's Surface Area and Volume lessons, plus an equivalent
// 3-solid quick-reference grid to gr8/ch15.js — replacing the earlier
// AI-generated infographics, which had no actual formulas.
// Also: the fetch handler was cache-first for every same-origin request,
// so once a page/file was fetched once it was served from cache forever
// until a human remembered to bump CACHE_NAME on every deploy — the exact
// bug this changelog has hit and fixed before (see v.. "today's fixes
// weren't reaching returning visitors"). Same-origin HTML/JS/CSS is now
// network-first (falls back to cache only when the network request fails,
// e.g. offline) so a deploy is visible immediately with no version bump
// required; only version-pinned CDN libraries (their URL never changes
// for a given version) stay cache-first.
// v67: site-wide account-button consistency audit across every tool/hub
// page. Two distinct bugs: (1) Code Conjurer, Java Genie, Web Wizard,
// AI Oracle, Computer Codex all placed the button in the header's CENTER
// column instead of the right column, alongside every other page's
// top-right placement — moved it into .hdr-right (last item) on all five.
// (2) 10 pages never had it at all: Drawing Druid, Math Magician's grade-
// picker hub, Robot Realm, Science Sage, Spike Spellcaster, Tech Tower, and
// all four Model Mage pages loaded auth.js/require-auth.js but never
// auth-modal.css/auth-modal.js, so there was no [data-ml-auth] element and
// no way for a signed-in user to see their account or reach the dropdown
// menu on any of them — added the includes and a button matching each
// page's own nav pattern (nav-right, hdr-right, or a small inline wrapper
// where neither existed, using a flex spacer where one was already present
// for a trailing-content element). Also fixed a mobile-only regression the
// audit surfaced: Science Sage's nav-right had 4 items in an unwrapped row,
// which on a phone pushed the new account button off-screen entirely —
// hardest-hit page, fixed by hiding the least-essential item (Resources)
// under 640px, matching the same "drop the extra pill, keep the account
// button reachable" pattern already used on the main landing page. wro-mat-
// planner/index.html and elementary.html are NOT in this pass — they load
// no auth infrastructure at all and aren't linked from the site's own
// navigation, so adding a full auth stack there needs a decision first,
// not just a fix pass. Verified with Playwright (geometry checks, not just
// visual) across all 15 changed pages at both 1440px and 390px — every one
// now renders on-screen, top-right, with a working dropdown.
// v66: web-wizard.html — the Live Preview's Tablet/Mobile size buttons set a
// fixed device-width pixel size on the iframe with no way to scale or scroll
// it into view, so on a phone Tablet was unusable (clipped, no scrolling)
// and Mobile was slightly wider than the visible panel. Now the iframe
// renders at its real device width (so the previewed page's own responsive
// breakpoints still trigger correctly) and is scaled down with a CSS
// transform to fit whatever room is actually available, recalculated on
// resize/rotation and on switching to the mobile Preview tab. Fixed two
// underlying layout bugs surfaced by that change: the un-scaled iframe
// width was still forcing #rightCol's min-content size wider than the
// screen (missing min-width:0 up the flex/grid chain), and an unstyled
// <iframe>'s ~150px default intrinsic height was flooring its size in a
// very short viewport (a phone in landscape), overflowing the preview
// panel even at the default Desktop size.
// v65: require-auth.js — the 6s "auth not resolved yet" safety-net fallback
// was indistinguishable from "not logged in" on a slow/cold mobile
// connection (auth.js's init chain is several network round trips), so a
// genuinely signed-in user could get bounced to the sign-in page; replaced
// with a poll that only gives up after 20s of window.MagicLabAuth never
// appearing. auth-modal.css/js — signed-in user pill is now just the
// initials avatar + chevron on desktop too (previously full name), and the
// dropdown menu's stacking/positioning bugs on index.html (translucent,
// mispositioned on mobile) are fixed. model-mage.html/model-mage-circuits.html
// — Circuit Simulator hidden from the picker and direct-link-guarded until
// its bugs are fixed. code-conjurer.html/java-genie.html/web-wizard.html —
// mobile layouts rebuilt around a bottom Lesson/Code/Output(or Canvas/
// Preview) tab bar instead of stacking everything into one scrolling page.
// v64: free trial + Curro Durbanville verification. profiles gains
// trial_ends_at (30 days from signup, backfilled for existing users) and
// cdv_status ('none'/'pending'/'verified'/'rejected', auto-flagged
// 'pending' by a DB trigger when `school` matches Curro Durbanville —
// only a manual dashboard edit can move it to 'verified'); a second
// trigger locks package/trial_ends_at/cdv_status against being set by
// anything but server-side/service-role code. auth.js gains
// hasFullAccess()/trialDaysLeft(); require-auth.js now redirects to
// pricing.html (not just the sign-in page) once trial has lapsed and
// the user isn't paid or CDV-verified — account.html/payment-success/
// payment-cancelled opt out via window.MLSkipPaywall so a lapsed user
// can still see why and fix it. PayFast billing switched from monthly
// (frequency 3) to quarterly (frequency 4) at the same R45, matching
// the "R45/term" pricing already on pitch.html/pitch-deck.html.
// v63: Model Mage is now a landing page choosing between two workshops —
// the existing parametric CAD tool (moved to model-mage-cad.html) and a
// new Circuit Simulator (model-mage-circuits.html): a breadboard editor
// with a real (simplified) circuit solver — Modified Nodal Analysis with
// fixed-point iteration for the LED/transistor's nonlinear behaviour —
// plus a simulated microcontroller board running Arduino-flavoured code
// (type keywords stripped, executed as real async JS so delay() actually
// paces setup()/loop() in wall-clock time, the same technique Robot Realm
// uses for its own code runner).
                                    // v34: pitch.html — mobile problem-stat overflow fix, tool card
                                    // fact-checks (Science Sage Gr7-12, Model Mage AI claims removed,
                                    // Web Wizard/Computer Codex/AI Oracle accuracy), AI Tutor language
                                    // removed platform-wide, roadmap "player"/Supabase/pilot-location
                                    // wording, gamification level list alignment fix. computer-codex.html
                                    // — mobile sidebar nav drawer added
                                    // v35: Computer Codex pitch card corrected to Grade 8-12/160 lessons.
                                    // New assignments feature: assignments.js SDK, assignments-schema.sql
                                    // migration, teacher "Assignments" tab (create/list/delete, per-learner
                                    // completion drill-down), student "My Assignments" panel. Completion is
                                    // auto-detected from progress_events, no submission step.
                                    // v36: lesson-catalog.js — real per-tool lesson catalogs (extracted
                                    // from each tool's own lesson data, 488 entries across 7 tools) replace
                                    // the free-text "type the exact lesson title" field in the assignment
                                    // creation modal with a searchable, grouped checkbox picker. Added the
                                    // missing lesson_complete tracking to java-genie.html and web-wizard.html
                                    // (previously never fired, so assignments against those two tools could
                                    // never be marked done).
                                    // v37: robot-realm/index.html — 2D/3D view button replaced with a
                                    // sliding pill toggle (matches the JS/Blocks segmented control style).
                                    // v38: Live Game (Kahoot-style) feature — game-schema.sql migration,
                                    // games.js SDK, question-bank.js (988 MCQs extracted from Computer
                                    // Codex/AI Oracle Knowledge Checks), teacher "Live Game" tab
                                    // (topic picker + launch), game-host.html (join code, live lobby,
                                    // question/reveal/podium, all polling-based), game-play.html (join by
                                    // code, answer, live rank). Correct answers never reach a player's
                                    // client except via the scoped submit_game_answer() RPC result for the
                                    // question they just answered.
                                    // v39: renamed the Live Game feature to "The Arena" throughout —
                                    // game-host.html -> arena-host.html, game-play.html -> arena.html
                                    // (now a proper branded landing page, not a bare join form), teacher
                                    // dashboard tab and student dashboard join box relabelled, and
                                    // index.html gets a dedicated Arena banner + footer link so it's
                                    // actually discoverable from the main hub instead of buried in the
                                    // dashboards.
                                    // v40: fixed a live production bug — the game_participants RLS
                                    // policy "Participants read the lobby they're in" queried
                                    // game_participants from within a policy on game_participants itself,
                                    // causing Postgres to recurse into itself and error out (500 on every
                                    // read). Learners could join fine but the host never saw them. Fixed
                                    // via a security-definer function (is_game_participant) — see
                                    // game-schema.sql / supabase-setup.sql, already applied directly to
                                    // the live database. Also: arena-host.html now auto-advances a
                                    // question straight to reveal once every joined player has answered,
                                    // instead of always waiting for the host to click Reveal or the timer
                                    // to run out.
                                    // v41: arena.html gets a persistent status bar — the quiz's title,
                                    // a rolling strip of the player's last 5 right/wrong answers, and a
                                    // rank badge captured at the moment each question starts (so it's
                                    // "where you stood going in," not the same number as the post-answer
                                    // rank already shown on the result screen). Host and player answer
                                    // tiles both swap the plain shapes (▲◆●■) for four themed icons —
                                    // wand/orb/star/gem — chosen to stay silhouette-distinct at a glance
                                    // the same way the shapes were, not just decorative.
                                    // v42: arena-host.html gets an "End Quiz" button next to the game
                                    // title, visible any time the session isn't already ended (lobby,
                                    // question, or reveal) — lets the host wrap up early instead of only
                                    // being able to end once every question is exhausted. Confirms before
                                    // acting, then just flips the session to 'ended', which players already
                                    // pick up on their normal poll loop.
                                    // v43: dashboard-teacher.html — fixed light-on-light <select> dropdown
                                    // text on the Arena/assignment/class pickers. The .form-input box itself
                                    // is dark-themed, but browsers render a <select>'s open option list with
                                    // their own default (usually white) background while still inheriting
                                    // the light --text color, making the options unreadable. Added explicit
                                    // dark background + light text on `option` so the popup list matches
                                    // the rest of the UI.
                                    // v44: pitch.html gets an 8th, full-width feature cell in the platform
                                    // features section covering The Arena — live quiz battles, question
                                    // tiles, and a mini leaderboard demo, matching the visual language of
                                    // the real product (same wand/orb/star/gem icons and colors as
                                    // arena-host.html). "Twelve tools" claim is untouched — the Arena stays
                                    // out of the tools-grid, same as its treatment on index.html. Roadmap's
                                    // Phase 3 (Gamification Engine) description and tag list updated to
                                    // list The Arena alongside XP/badges/streaks, since it shipped as part
                                    // of that phase.
                                    // v45: index.html gets a "🔔 Homework" nav pill for logged-in students,
                                    // visible whenever they have any not-yet-done assignment (uses the
                                    // existing assignments.js getMyAssignments() — no schema change), with
                                    // a badge showing the pending count and turning red if any assignment
                                    // is overdue. Hidden for teachers and logged-out visitors, and kept
                                    // visible on mobile (unlike the other secondary nav pills) since it's a
                                    // notification, not just a link. Clicking it deep-links to
                                    // dashboard-student.html#assignments-panel, which now auto-scrolls to
                                    // the existing "My Assignments" list on arrival.
                                    // v46: fixed a bug in the v45 homework bell — it set the nav pill
                                    // visible for every logged-in student as soon as their assignment list
                                    // loaded, before checking whether anything was actually pending, so it
                                    // showed up even with zero homework and clicking it landed on a
                                    // dashboard with nothing to see. Now the pill only renders at all when
                                    // there's at least one not-yet-done assignment. Also added a brief
                                    // highlight pulse on the "My Assignments" panel when arriving via the
                                    // bell's deep link, so the destination is unmistakable.
                                    // v47: temporary [DEBUG-assignments]-prefixed console logging added to
                                    // assignments.js's getMyAssignments() and its call site in
                                    // dashboard-student.html, to track down a live report of a real
                                    // assignment (confirmed to exist in the DB, with correct RLS policies
                                    // and class membership) not showing up in a student's "My Assignments"
                                    // panel. To be removed once root-caused.
                                    // v48: root-caused and fixed the v47 bug — dashboard-student.html's
                                    // data-load trigger (_once/_tryLoad) only waited for
                                    // window.MagicLabAuth and window.MagicLabProgress before firing, a
                                    // readiness check written before assignments.js existed and never
                                    // updated. Whichever of the auth/progress/xp "ready" events (or the
                                    // fallback poll) won the race could fire before assignments.js had
                                    // finished setting window.MagicLabAssignments, so getMyAssignments()
                                    // was silently skipped — the assignment genuinely existed in the DB
                                    // with correct RLS, but the client never asked. Now the trigger also
                                    // waits for window.MagicLabAssignments (and its
                                    // magiclab:assignments:ready event), with a ~3s poll-count timeout
                                    // fallback so a slow or failed assignments.js can't hang the rest of
                                    // the dashboard. Removed the temporary v47 debug logging.
                                    // v49: dashboard-student.html — moved the "My Assignments" panel to
                                    // sit right after the profile/XP stats summary, above the Streak
                                    // section and the Join a class / Enter The Arena boxes, instead of
                                    // below them — a student's active homework should be one of the first
                                    // things they see, not something they scroll past.
                                    // v50: dashboard-student.html — "My Assignments" now groups items
                                    // into Overdue / Due Today / Upcoming / Completed (in that order,
                                    // colour-coded dots, each with a count), instead of one flat list.
                                    // No-due-date assignments fall under Upcoming; a completed assignment
                                    // always shows under Completed even if its due date has passed. Empty
                                    // groups are simply omitted.
                                    // v51: sign-in is now required on every tool/lesson page
                                    // (require-auth.js + pre-paint hide, fail-closed), signup gains
                                    // optional School/Province and teacher Subjects fields, and PayFast
                                    // R45/mo Pro checkout ships (pricing.html, payment.js,
                                    // payment-success/cancelled pages, Upgrade nav pill, Edge Functions
                                    // + payments schema on Supabase). Sandbox-signed with the shared
                                    // sandbox passphrase; live needs PAYFAST_* secrets.
                                    // v52: de-densified the Science Sage, Tech Tower and Math Magician
                                    // index pages — Science Sage shows one grade/path at a time (the
                                    // dropdown now filters instead of scrolling, persisted per browser),
                                    // long topic lists collapse behind "Show all N topics", the repeated
                                    // "Lesson" badges are gone, and both Science Sage and Tech Tower get
                                    // a "Continue where you left off" card + visited-lesson ticks via the
                                    // new shared topic-memory.js (localStorage only). Math Magician's
                                    // landing reframes "N chapters" tags as phase labels.
                                    // v53: math-magician/index.html grade cards now show real per-grade
                                    // progress (X/Y topics + %, CTA swaps to "Continue"/"Review again")
                                    // pulled from Supabase via a new progress.js helper,
                                    // getLessonHistoryByGrade(tool) — buckets lesson_complete history by
                                    // the `grade` already recorded on each event, so the landing page
                                    // doesn't need to load every grade's chapter manifest. Cards with no
                                    // completions yet render exactly as before (no bar, "Start learning").
                                    // v54: fixed math-magician/gr8/index.html's "Next topic" button —
                                    // it computed nextId as currentTopicId+1 (a raw topic id, e.g. 101→102)
                                    // and then used that NUMBER AS AN ARRAY INDEX into the flattened
                                    // TOPICS list (TOPICS[nextId]), instead of searching for the topic
                                    // whose id equals nextId. Since ids are namespaced per chapter
                                    // (101-109, 201-210, ... 1701-1705) but TOPICS is a flat 107-item
                                    // array, TOPICS[102] was actually the 103rd item overall — Chapter
                                    // 17's exam-focus topic — so finishing Chapter 1's very first lesson
                                    // offered "Next topic: Ch 17 Exam focus". Grades 9-12 already carry
                                    // the correct fix (find the topic's real array position, advance by
                                    // one position); gr8 just never got the same fix backported. Also
                                    // corrected the gr8 "all done" message, which said "completed all of
                                    // Chapter 1!" even though that branch only fires after the true last
                                    // topic in the whole course.
                                    // v55: two related features, ported from the tools that pioneered
                                    // them. "Continue where you left off" (Science Sage / Tech Tower's
                                    // pattern) now also covers Math Magician (a per-grade "Continue"
                                    // card on the landing page using getRecentEvents()), Computer Codex
                                    // and AI Oracle (a dismissible toast offering to jump back to the
                                    // last lesson viewed — new progress.js-independent localStorage
                                    // keys, since neither tool changes URL per lesson), and Drawing
                                    // Druid (topic-memory.js generalized with a configurable
                                    // `linkSelector` so it works on Drawing Druid's flat .chapter-card
                                    // links, not just Science Sage's nested .strand-topic lists).
                                    // Separately, Model Mage's "autosave last work state and restore on
                                    // load" pattern is now factored out into a shared work-autosave.js
                                    // engine and applied to Java Genie, Code Conjurer, Web Wizard (all
                                    // three: the codeEditor textarea's content), and Robot Realm /
                                    // Spike Spellcaster (mode + map/mission + JS/Python + Blockly XML,
                                    // reusing each tool's existing saveProgram()/loadProgramFromFile()
                                    // payload shape). Same restore-with-dismissible-toast UX as Model
                                    // Mage throughout; "Start fresh" always clears back to the tool's
                                    // normal blank boot state.
                                    // v56: badges/achievements now cover all 12 tools, not just the 5 the
                                    // system launched with. Previously 5 of 12 tools (Science Sage, Tech
                                    // Tower, Spike Spellcaster, Robot Realm, Model Mage) never called
                                    // MagicLabProgress.track() at all, so no amount of use could ever
                                    // count toward a tools_used badge — instrumented all five: Science
                                    // Sage (117 lesson files) + Tech Tower (14) via a new shared
                                    // lesson-progress-observer.js that watches each lesson's existing
                                    // .score-banner element for the 'show' class (DOM-driven rather than
                                    // tied to each hand-written lesson's own quiz variable names, which
                                    // vary — answers.every(...) vs answered.every(Boolean) vs others);
                                    // Robot Realm (lesson_complete on reaching a map's goal, code_run on
                                    // every finished run); Spike Spellcaster (code_run on every finished
                                    // run — no win-condition exists there to hang lesson_complete off of);
                                    // Model Mage (lesson_complete on every successful STL export). Also
                                    // rewrote the badge criteria system: the old 'tool_complete' type
                                    // depended on an opaque all_complete flag with no visibility into how
                                    // (or whether) it's configured per tool server-side, so all 12
                                    // tool-specific badges now use new 'tool_lessons'/'tool_code_runs'
                                    // types instead — a plain topics_complete/code_runs threshold this
                                    // client fully controls, verified against each tool's real content
                                    // size (e.g. Math Magician's 282 topics, Drawing Druid's 134
                                    // constructions, Robot Realm's 4 real challenge maps) so "Complete
                                    // all X" is always literally true. Added 7 new tool badges (AI
                                    // Oracle, Drawing Druid, Science Sage, Tech Tower, Spike Spellcaster,
                                    // Robot Realm, Model Mage) alongside the existing 5. The
                                    // tools-used ladder grew from two badges (3, 5) to four (3, 5, 8, 12)
                                    // — All-Rounder now genuinely requires all 12 tools instead of the
                                    // 5 that existed when it was written; the old 5-tools badge keeps its
                                    // id and criteria unchanged (just relabeled "Well-Rounded") so no
                                    // already-earned badge is affected. 27 -> 36 total badges.
                                    // v57: dashboard-student.html's "Progress by Tool" grid only ever
                                    // had cards for the original 5 tracked tools — added the other 7
                                    // (AI Oracle, Drawing Druid, Science Sage, Tech Tower, Robot Realm,
                                    // Spike Spellcaster, Model Mage) now that v56 wired up their
                                    // tracking. Each card's "total" denominator matches the same
                                    // verified content-size numbers used for that tool's badge in v56.
                                    // Spike Spellcaster has no lesson curriculum to count (its badge is
                                    // code_runs-based too) — _renderTools() gained a small metric branch
                                    // so its card shows "X / 20 runs" with Runs as the primary stat
                                    // instead of always reading "0 lessons" no matter how much it's used.
                                    // Also gave a few cards more accurate unit labels than the generic
                                    // "lessons" (Drawing Druid: constructions, Robot Realm: challenges,
                                    // Model Mage: models).
                                    // v58: fixed the original 5 tool cards' progress totals, which
                                    // predated v56/v57 and never matched what topics_complete can
                                    // actually reach — Java Genie/Web Wizard only ever fire one
                                    // lesson_complete event (tutorial finished) but showed "X / 12" and
                                    // "X / 10", permanently capping out around 8-10% even at 100% done;
                                    // Code Conjurer/Math Magician/Computer Codex showed totals lower
                                    // than their real lesson counts too. Now uses the exact same
                                    // verified numbers as each tool's badge threshold in xp.js (1, 1, 21,
                                    // 282, 160) — Java Genie and Web Wizard also get unit:'tutorial'
                                    // instead of the generic "lessons" label, matching their badge
                                    // descriptions ("Complete the ... tutorial").
                                    // v59: fixed two bugs reported in Science Sage's Explore-tab
                                    // simulators. (1) White-on-white <select> dropdowns — 8 lesson
                                    // files (gr7 separating-mixtures, gr8 compounds-mixtures, gr9
                                    // chemical-bonding/atoms-electrons/genetics, gr10 chemical-bonding,
                                    // gr11 energy-chemical-change/intermolecular-forces) styled their
                                    // closed select box but never their open <option> list, so browsers
                                    // fell back to a default white background under the inherited light
                                    // text colour. Added explicit dark option backgrounds, matching the
                                    // pattern already used elsewhere (dashboard-teacher.html, v43).
                                    // (2) gr7 separating-mixtures.html's canvas diagrams for
                                    // Evaporation, Distillation, Magnetic Separation, Chromatography and
                                    // Sieving only ever drew into a small sub-region of the 440x360
                                    // canvas, leaving large empty margins compared to the Filtration
                                    // diagram. Each function's shape/particle drawing is now wrapped in
                                    // a scale-up transform (restored before its text labels are drawn,
                                    // so label size/position is unaffected) to fill the canvas properly.
                                    // v60: v59's scale-up transform on separating-mixtures.html turned
                                    // out to clip content off-canvas in places (Sieving's gravel,
                                    // Chromatography's beaker) and didn't touch the underlying physics,
                                    // so the follow-up report ("particles aren't behaving the way they
                                    // would in the real experiment") was still valid. Rewrote all 5
                                    // non-Filtration diagrams with native (untransformed) coordinates
                                    // and real behaviour fixes: Evaporation's salt is now small circles
                                    // that appear at random (deterministic per-crystal, so they don't
                                    // reshuffle every frame) instead of a fixed grid of squares, and its
                                    // flame no longer overlaps the dish; Distillation's flame no longer
                                    // overlaps the flask, and the vapour bubble now travels exactly along
                                    // the bent condenser-tube path instead of in a straight line that flew
                                    // past the actual tube outlet; Magnetic Separation's iron filings now
                                    // "stick" to the magnet once it sweeps within range and are carried
                                    // along with it for the rest of the animation (previously they were a
                                    // pure function of instantaneous distance, so they fell back down the
                                    // moment the magnet moved on) while the sand never moves; Sieving's
                                    // gravel now rests on the mesh at fixed non-overlapping positions
                                    // instead of the clipped, overlapping cluster v59 produced.
                                    // .ctrl-select also swapped its translucent background/near-invisible
                                    // border for the solid-background, visible-border style every other
                                    // tool's dropdowns use (math-magician, model-mage, spike-spellcaster),
                                    // since the translucent version read as visually inconsistent even
                                    // with its v59 option-background fix. Separately, gr8/life/
                                    // ecosystems.html's Savanna Food Web Builder drew each organism's
                                    // emoji icon without resetting fillStyle after the node circle's
                                    // low-alpha fill — canvas applies that leftover ~13% alpha to the
                                    // icon glyph too, so every organism rendered almost invisibly faint.
                                    // Reset fillStyle to full-opacity white before drawing each icon.
                                    // v61: two more separating-mixtures.html Explore diagram fixes.
                                    // Filtration's sand residue was drawn in a fixed-width grid that
                                    // ignored the filter paper's actual V-shaped cone, so sand piled up
                                    // outside the paper (sometimes even outside the funnel) near the top
                                    // rows. Sand now piles in rows whose width is computed from the
                                    // paper's actual left/right edges at that height, so it always stays
                                    // inside the cone and tapers correctly toward the apex. Chromatography's
                                    // solvent was only a shallow 16px puddle in a 45px-tall beaker, and the
                                    // paper strip's bottom edge stopped exactly at the beaker's rim instead
                                    // of dipping into it — so the paper never actually touched the solvent.
                                    // Deepened the solvent and extended the paper down into it, with the
                                    // starting spot repositioned to sit just above the solvent surface
                                    // (as it must in the real experiment, or the spot would wash away
                                    // immediately instead of separating into bands).
                                    // v62: Filtration now shows sand still suspended in the mixture
                                    // near the top of the funnel — varied grain sizes, each settling out
                                    // of suspension onto the residue pile at its own deterministic point
                                    // in the animation — instead of the residue simply appearing at the
                                    // bottom with nothing visibly in transit above it. The pile itself
                                    // still ends up in the same place (the lower part of the paper cone).

const urlsToCache = [
  '/',
  '/index.html',
  '/java-genie.html',
  '/web-wizard.html',
  '/code-conjurer.html',
  '/computer-codex.html',
  '/conjurer_interpreter.js',
  '/math-magician/index.html',
  '/math-magician/gr8/index.html',
  '/math-magician/gr8/ch1.js',
  '/math-magician/gr8/ch2.js',
  '/math-magician/gr8/ch3.js',
  '/math-magician/gr8/ch4.js',
  '/spike-spellcaster/index.html',
  '/spike-spellcaster/spike-python.js',
  '/spike-spellcaster/spike-ble.js',

  // ── Phase 1 additions ──────────────────────────────────────
  '/auth.js',
  '/require-auth.js',
  '/progress.js',
  '/auth-modal.js',
  '/auth-modal.css',
  '/payment.js',
  '/pricing.html',
  '/xp.js',
  '/quiz-engine.js',
  '/tool-welcome.js',
  '/topic-memory.js',
  '/work-autosave.js',
  '/lesson-progress-observer.js',
  '/dashboard-student.html',
  '/dashboard-teacher.html',
  '/assignments.js',
  '/lesson-catalog.js',
  '/question-bank.js',
  '/games.js',
  '/arena-host.html',
  '/arena.html',

  // CDN resources
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js',
  'https://cdn.jsdelivr.net/npm/lucide@0.263.0/dist/umd/lucide.min.js',
  'https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(() => {
        // If CDN resources fail, at minimum cache the core app
        return cache.addAll(['/', '/index.html', '/auth.js', '/progress.js', '/xp.js', '/quiz-engine.js',
  '/tool-welcome.js', '/auth-modal.js', '/auth-modal.css']);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Auth API calls to Supabase should NEVER be served from cache
  const url = event.request.url;
  if (url.includes('supabase.co') && !url.includes('supabase.min.js')) {
    return; // let it go to the network
  }

  // CDN libraries are version-pinned in their URL (e.g. @2, @0.263.0) —
  // the URL itself never changes for a given version, so cache-first is
  // safe and saves a network round trip on every load.
  const isVersionedCDN = url.startsWith('https://cdn.jsdelivr.net/') || url.startsWith('https://fonts.googleapis.com/');
  if (isVersionedCDN) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) return response;
        return fetch(event.request).then(response => {
          if (response && response.status === 200 && response.type !== 'error') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
          }
          return response;
        });
      })
    );
    return;
  }

  // Everything same-origin (HTML/JS/CSS content) is network-first: always
  // try the live network so a deploy is visible immediately, with no
  // dependency on remembering to bump CACHE_NAME above. The cache is only
  // a fallback for when the network request fails (offline / no signal).
  event.respondWith(
    fetch(event.request).then(response => {
      if (response && response.status === 200 && response.type !== 'error') {
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
      }
      return response;
    }).catch(() => {
      return caches.match(event.request).then(cached => cached || caches.match('/index.html'));
    })
  );
});

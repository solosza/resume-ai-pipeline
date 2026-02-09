# Isagawa Kernel - Defect Log

## DEF-001: Agent skips /kernel/learn after self-fix

**Date:** 2026-02-07
**Severity:** Medium
**Status:** RESOLVED

### What Happened
Agent hit hook block (state mismatch: `protocol_anchored` vs `anchored`). Agent debugged, found issue, fixed state. But did NOT invoke `/kernel/learn` to record the lesson.

### Expected Behavior
After any fix, agent should invoke `/kernel/learn` to:
1. Update protocol with lesson
2. Update hooks if enforceable
3. Prevent same mistake in future

### Actual Behavior
Agent fixed and moved on. No lesson recorded. Same mistake can recur.

### Root Cause
`/kernel/learn` invocation is soft instruction only. Nothing enforces it after a fix.

### Impact
- Self-improvement loop broken
- Lessons not captured
- Mistakes can repeat

### Proposed Fix Options
1. **Stronger CLAUDE.md language** — "ALWAYS invoke /kernel/learn after ANY fix"
2. **Hook enforcement** — Track `fix_count` vs `learn_count` in state, block next write if mismatch
3. **Command chaining** — Anchor command auto-invokes learn if `last_action: "fix"`

### Resolution
**RESOLVED 2026-02-07** — Implemented Option 2 with enhancements:

1. **Hook enforcement via `needs_learn` flag:**
   - PreToolUse hook detects direct state edits → sets `needs_learn: true`
   - PostToolUse hook detects test failures → sets `needs_learn: true`
   - Next Write/Edit blocked until `/kernel/learn` invoked

2. **Added `/kernel/validate` command:**
   - Self-check against protocol every 5 files
   - Catches violations hook can't detect
   - Violations trigger `/kernel/learn`

3. **Updated CLAUDE.md:**
   - Documents learn triggers
   - Shows updated loop with validate

Files modified:
- `.claude/hooks/universal-gate-enforcer.py` — Added needs_learn detection and blocking
- `.claude/hooks/test-failure-detector.py` — New PostToolUse hook for test failures
- `.claude/commands/kernel/validate.md` — New command
- `.claude/commands/kernel/learn.md` — Clears needs_learn flag
- `.claude/settings.local.json` — Added PostToolUse hook config
- `CLAUDE.md` — Updated loop documentation

---

## DEF-002: State key mismatch - anchored vs protocol_anchored

**Date:** 2026-02-07
**Severity:** Medium
**Status:** RESOLVED

### What Happened
Anchor command set `protocol_anchored: true` in state. Universal gate enforcer checks for `anchored: true`. Mismatch caused hook to block writes even after anchoring.

### Expected Behavior
Anchor command should set the same key the hook checks.

### Actual Behavior
- Anchor sets: `protocol_anchored: true`
- Hook checks: `anchored: true`
- Result: BLOCKED despite being anchored

### Root Cause
No contract between anchor command and universal gate enforcer on state key names.

### Impact
- Agent blocked unexpectedly
- Agent had to debug and manually fix state
- Friction in first run

### Proposed Fix Options
1. **Standardize key name** — Anchor command uses `anchored` (match hook)
2. **Hook flexibility** — Hook checks both `anchored` OR `protocol_anchored`
3. **State schema enforcement** — Document required keys in state-schema.md

### Resolution
**RESOLVED 2026-02-07** — anchor.md already uses `anchored: true`. The mismatch occurred because agent didn't follow the command exactly. With DEF-001 fix, if agent manually edits state, `needs_learn` triggers and lesson is captured.

---

## DEF-003: Domain naming mismatch between session and workflow

**Date:** 2026-02-07
**Severity:** Low
**Status:** RESOLVED

### What Happened
Session state set `domain: "playwright-automation"`. Workflow file created as `playwright_workflow.json`. Hook looks for `{domain}_workflow.json` → looked for `playwright-automation_workflow.json` → didn't find it.

### Expected Behavior
Domain name should be consistent across:
- session_state.json `domain` field
- `{domain}_workflow.json` filename
- Protocol filename

### Actual Behavior
- Session: `playwright-automation`
- Workflow file: `playwright_workflow.json`
- Hook lookup failed

### Root Cause
No validation that domain-setup creates workflow file matching session domain name.

### Impact
- State lookup failed
- Agent had to manually align domain names
- Could cause silent failures if not caught

### Proposed Fix Options
1. **Domain normalization** — domain-setup normalizes name (remove hyphens, lowercase)
2. **Session-workflow sync** — domain-setup reads session domain, uses exact name
3. **Validation gate** — Hook validates domain name matches before checking state

### Resolution
**RESOLVED 2026-02-07** — Implemented Option 1:

Added "Step 0: Normalize Domain Name" to `/kernel/domain-setup`:
- Lowercase
- Replace hyphens with underscores
- Remove special characters
- Explicit instruction that session_state.json domain MUST match workflow filename prefix

Files modified:
- `.claude/commands/kernel/domain-setup.md` — Added Step 0 and explicit sync instructions

---

## DEF-004: Agent creates new domain instead of extending existing

**Date:** 2026-02-07
**Severity:** Medium
**Status:** RESOLVED

### What Happened
Agent was asked to add API testing support to existing project. Instead of extending the "playwright" domain, agent tried to create a new "api" domain via `/kernel/domain-setup`.

### Expected Behavior
Agent should recognize that API testing is part of the same project and extend the existing domain's protocol to cover new capabilities.

### Actual Behavior
- Agent saw "API testing" ≠ "playwright"
- Concluded new domain needed
- Invoked `/kernel/domain-setup` for new domain
- Would have created separate protocol, hooks, state

### Root Cause
`/kernel/session-start` has no logic for:
1. "Same project, different capability" detection
2. Domain extension vs domain creation decision
3. Single domain per project rule

### Impact
- Protocol fragmentation (multiple protocols per project)
- State fragmentation (multiple workflow files)
- Lessons not shared across "domains" in same project
- Unnecessary complexity

### Proposed Fix Options
1. **Generic domain name** — Rename "playwright" to "qa" or "automation" (covers UI + API)
2. **Domain extension logic** — session-start checks if new work is related to existing domain
3. **Single domain per project** — One domain per project, period. Protocol grows to cover capabilities.

### Resolution
**RESOLVED 2026-02-07** — Implemented Option 3:

Added "Domain persistence rule (CRITICAL)" to `/kernel/session-start`:
- If domain exists → USE IT (never create new)
- One project = one domain = one protocol
- New capabilities extend existing protocol via `/kernel/learn`
- Only `/kernel/domain-setup` if NO domain exists

Also added `/kernel/fix` command for mandatory impact assessment before any kernel fixes.

Files modified:
- `.claude/commands/kernel/session-start.md` — Added domain persistence rule
- `.claude/commands/kernel/fix.md` — New command for impact assessment
- `CLAUDE.md` — Updated commands list

---

## DEF-005: PostToolUse hook removed during debugging

**Date:** 2026-02-08
**Severity:** Medium
**Status:** OPEN

### What Happened
Test failure enforcement not working. Agent ran tests, tests failed, but no `needs_learn` block fired. Agent voluntarily invoked `/kernel/fix` but wasn't enforced.

### Expected Behavior
PostToolUse hook detects test failure → sets `needs_learn: true` → blocks next write until `/kernel/learn` invoked.

### Actual Behavior
- `test-failure-detector.py` deleted from working directory
- `PostToolUse` section removed from `settings.local.json`
- No enforcement on test failure

### Root Cause
During "circular trap" debugging in previous session, these were removed to work around issues. Never restored.

Committed HEAD has correct config:
- `test-failure-detector.py` exists
- `PostToolUse` hook configured for Bash matcher

### Impact
- Test failure enforcement broken
- Agent can continue after test failures without learning
- Self-improvement loop not enforced

### Proposed Fix
Restore from HEAD:
```bash
git checkout HEAD -- .claude/hooks/test-failure-detector.py .claude/settings.local.json
```

Or re-add PostToolUse config to current settings.local.json.

### Resolution
TBD

---

## DEF-006: Anchor and Validate redundancy

**Date:** 2026-02-08
**Severity:** Low
**Status:** OPEN

### What Happened
5-file enforcement triggers `/kernel/validate`. But anchor already re-centers on protocol. If agent re-anchors and reviews recent work, validate is redundant.

### Expected Behavior
Single re-centering action that includes reviewing recent files.

### Actual Behavior
- Anchor = refresh rules (before work)
- Validate = check work (after work)
- Two separate commands for related purpose

### Root Cause
Design assumed anchor and validate serve distinct purposes. But re-anchoring naturally includes noticing drift in recent work.

### Impact
- Extra command when one would suffice
- Confusing distinction between anchor and validate
- 5-file checkpoint could be simpler

### Proposed Fix
Enhance anchor to include "review recent files":
```
ANCHOR (enhanced):
1. Re-read protocol
2. Review files since last anchor (if any)
3. Check: Do recent files match protocol?
4. If violations: fix → learn
5. State current task
6. Reset counter
```

Then:
- 5-file limit triggers anchor (not validate)
- Validate reserved for final gate before complete
- Simpler loop

### Resolution
TBD

---

## Template

```markdown
## DEF-XXX: Brief description

**Date:** YYYY-MM-DD
**Severity:** Critical | High | Medium | Low
**Status:** OPEN | IN_PROGRESS | RESOLVED

### What Happened
[Description]

### Expected Behavior
[What should have happened]

### Actual Behavior
[What actually happened]

### Root Cause
[Why it happened]

### Impact
[Consequences]

### Proposed Fix Options
[Solutions]

### Resolution
[How it was fixed, or TBD]
```

# Cycling Workflow

Autonomous loop through numbered task specs.

## The Loop

1. **Scan** — list all `.md` files in `specs/`
2. **Pick** — lowest-numbered spec NOT in `completed_specs` or `skipped_specs`
3. **Save state** — update `[domain]_workflow.json`:
   - `cycling: true`, `current_spec`, `attempts_on_current: 0`
   - Update `context` in `session_state.json`: "Starting spec NNN"
4. **Implement** — follow spec's requirements and acceptance criteria
5. **Verify** — check EVERY acceptance criterion mechanically (see below)
   - If ANY criterion fails → fix → `/kernel/learn` → re-verify
6. **Complete** — invoke `/kernel/complete` (updates `completed_specs`, advances)
7. **Commit** — git add changed files, commit with spec name, push to branch
8. **Loop** — go to step 1

## Verification

Each spec's acceptance criteria define "done". Verify each criterion mechanically:

| Criterion Type | How to Verify |
|----------------|---------------|
| File exists | Glob to confirm path |
| Code compiles | `npx tsc --noEmit` or equivalent |
| Uses pattern X | Grep the file for the pattern |
| Pattern absent | Grep to confirm absence |
| Method signature | Read the file and verify |

If a criterion can't be verified mechanically, state what you checked and why you believe it's met.

## State Tracking

Fields in `[domain]_workflow.json`:

| Field | Type | Purpose |
|-------|------|---------|
| `cycling` | bool | Whether in cycling mode |
| `current_spec` | string | Spec currently being worked on |
| `completed_specs` | array | Completed spec filenames |
| `skipped_specs` | array | Specs skipped due to stagnation |
| `total_specs` | number | Count of all specs |
| `attempts_on_current` | number | Retry counter for current spec |

## State Update Schedule

| Event | What's Written |
|-------|----------------|
| Start cycling | `cycling: true`, `total_specs: N` |
| Pick spec | `current_spec`, progress note in context |
| `/kernel/complete` | `completed_specs` updated, summary in context |
| Anchor (every 10) | Current decisions in context |
| Stagnation skip | `skipped_specs` updated |
| All done | `cycling: false` |

## Error Handling

- **Test failure** → fix → `/kernel/learn` → retry
- **Stuck** (`attempts_on_current >= 3`) → record lesson, add to `skipped_specs`, advance
- **All specs done** (including skipped) → report summary, set `cycling: false`

## Resume After Compaction or Restart

State files survive context compaction and session restarts:

1. `session-start` reads workflow state → sees `cycling: true`
2. Anchor reads `context` key → knows current spec and progress
3. Agent re-reads current spec's acceptance criteria
4. Checks each criterion against filesystem (idempotent)
5. Skips already-met criteria, implements what's missing

## Git After Each Spec

- `git add` the specific files created/modified for the spec
- Commit message: `feat: implement [spec-name] (spec NNN)`
- Push to current branch

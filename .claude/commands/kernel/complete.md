# /kernel/complete

Final gate before marking work done.

## Instructions

1. **Check state:**

   | Gate | Required |
   |------|----------|
   | Protocol created | `protocol_created: true` |
   | Anchored | `anchored: true` |

2. **Update state:**
   ```json
   {
     "complete": true,
     "complete_timestamp": "..."
   }
   ```

3. **Report:**
   ```
   COMPLETE

   Domain: [domain]
   Task: [what was done]
   Files created/modified: [count]
   Lessons learned: [count]

   Done.
   ```

4. **Git commit:**
   - `git add` the specific files created/modified for the task
   - Commit message: `feat: implement [task-name]`

5. **Cycling continuation:**

   Read `[domain]_workflow.json`.

   If `cycling: true`:
   - Add current_spec to `completed_specs`
   - Reset `attempts_on_current` to 0
   - Update `context` in `session_state.json` with completion summary
   - Scan `specs/` for next incomplete spec (lowest-numbered not in completed_specs or skipped_specs)
   - If found: announce it, set `current_spec`, continue working
   - If none remain: announce "All N specs complete (M skipped)", set `cycling: false`

## When to Invoke

- ALWAYS before saying "done"
- NEVER skip this gate

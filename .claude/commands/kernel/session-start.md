# /kernel/session-start

Check state and resume if needed. Always invoke first.

## Instructions

1. **Check for existing state:**
   - Read `.claude/state/session_state.json` if exists
   - If `needs_restart` is true, resume from `resume_after_restart`

2. **Check for domain state:**
   - Look for `.claude/state/[domain]_workflow.json`
   - If exists, summarize current progress

3. **If no state exists:**
   - This is a fresh session
   - Proceed to `/kernel/domain-setup` if new domain

4. **Update session state:**
   ```json
   {
     "session_started": true,
     "timestamp": "...",
     "resumed_from": null | "previous_step"
   }
   ```

5. **Report:**
   ```
   Session started.
   - State: [fresh | resumed from X]
   - Domain: [none | domain name]
   - Next: [what to do next]

   Proceeding.
   ```

## State File Location

`.claude/state/session_state.json`

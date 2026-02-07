# /kernel/anchor

Re-read protocol and re-center. Invoke before any work.

## Instructions

1. **Read protocol:**
   - Open `docs/protocols/[domain]-protocol.md`
   - Read entire file

2. **Summarize key points:**
   - Architecture patterns
   - Naming conventions
   - Quality gates
   - Anti-patterns to avoid

3. **Review Lessons Learned:**
   - Read "Lessons Learned" section
   - Note any recent additions
   - These are mistakes to avoid

4. **State current task:**
   - What are you about to do?
   - How does it fit the protocol?

5. **Update state:**
   ```json
   {
     "anchored": true,
     "anchor_timestamp": "...",
     "files_since_anchor": 0
   }
   ```

6. **Confirm:**
   ```
   Anchored to [domain] protocol.

   Key patterns:
   - [pattern 1]
   - [pattern 2]

   Lessons to remember:
   - [lesson 1]
   - [lesson 2]

   Current task: [what you're doing]

   Proceeding with protocol.
   ```

## State File Location

`.claude/state/[domain]_workflow.json`

## When to Invoke

- Before ANY code work
- After any failure (before fixing)
- When resuming from break
- When context seems off

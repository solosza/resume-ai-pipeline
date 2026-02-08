# /kernel/domain-setup

Create complete enforcement for a new domain. Invoke when starting work in a new domain.

## Instructions

### Step 0: Normalize Domain Name

**CRITICAL:** Domain name MUST be normalized before use:
- Lowercase
- Replace hyphens with underscores
- Remove special characters

Example: `playwright-automation` → `playwright_automation`

This ensures consistency between:
- `session_state.json` domain field
- `[domain]_workflow.json` filename
- `[domain]-protocol.md` filename
- `[domain]-*.md` command filenames

### Step 1: Create Protocol File

Create `docs/protocols/[domain]-protocol.md` with:

```markdown
# [Domain] Protocol

## Overview
[What this domain is about]

## Architecture
[Key structural patterns]

## Naming Conventions
[How to name files, classes, methods]

## Patterns
[What to do]

## Anti-Patterns
[What NOT to do]

## Quality Gates
[What to check before proceeding]

## Lessons Learned
[Will be updated by /kernel/learn]
```

### Step 2: Create Domain Commands

Create in `.claude/commands/`:

| File | Purpose |
|------|---------|
| `[domain]-anchor.md` | Re-read protocol (calls /kernel/anchor) |
| `[domain]-validate.md` | Check work (calls /kernel/validate) |
| `[domain]-learn.md` | Record lesson (calls /kernel/learn) |

Each domain command should reference the kernel command.

### Step 3: Create Hooks

Create `.claude/hooks/[domain]-gate-enforcer.py`:

```python
#!/usr/bin/env python3
"""
[Domain] Gate Enforcer - Blocks writes without gate validation.
"""
import json, sys
from pathlib import Path

PROTECTED_PATHS = {
    # 'path/prefix/': 'required_state_key',
}

STATE_FILE = Path('.claude/state/[domain]_workflow.json')

def main():
    try:
        data = json.load(sys.stdin)
    except:
        sys.exit(0)

    tool_name = data.get('tool_name', '')
    if tool_name not in ('Write', 'Edit'):
        sys.exit(0)

    file_path = data.get('tool_input', {}).get('file_path', '').replace('\\', '/')

    for prefix, key in PROTECTED_PATHS.items():
        if prefix in file_path:
            if not STATE_FILE.exists():
                print(f"BLOCKED: No state. Invoke /kernel/anchor first.", file=sys.stderr)
                sys.exit(2)
            state = json.loads(STATE_FILE.read_text())
            if not state.get(key):
                print(f"BLOCKED: {key} not set. Invoke required command.", file=sys.stderr)
                sys.exit(2)
    sys.exit(0)

if __name__ == '__main__':
    main()
```

### Step 4: Wire Up Settings

Update `.claude/settings.local.json`:

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{"type": "command", "command": "python .claude/hooks/[domain]-gate-enforcer.py"}]
    }]
  }
}
```

### Step 5: Create State Directory

Create `.claude/state/` if not exists.

### Step 6: Update State

Update `.claude/state/session_state.json`:
```json
{
  "domain": "[normalized_domain]"
}
```

Create `.claude/state/[normalized_domain]_workflow.json`:
```json
{
  "domain": "[normalized_domain]",
  "setup_complete": true,
  "protocol_created": true,
  "commands_created": true,
  "hooks_created": true,
  "timestamp": "..."
}
```

**IMPORTANT:** The domain value in session_state.json MUST match the workflow filename prefix.

### Step 7: Report

```
REPORT: Setup Complete

Created enforcement for [domain]:

Protocol: docs/protocols/[domain]-protocol.md
Commands: .claude/commands/[domain]-*.md
Hooks: .claude/hooks/[domain]-gate-enforcer.py
Settings: .claude/settings.local.json

Proceeding with work.
```

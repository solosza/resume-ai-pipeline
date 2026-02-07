#!/usr/bin/env python3
"""
Playwright Gate Enforcer - Blocks test writes without protocol anchor.
"""
import json
import sys
from pathlib import Path

# Paths that require anchoring before writes
PROTECTED_PATHS = {
    'tests/': 'protocol_anchored',
}

STATE_FILE = Path('.claude/state/playwright_workflow.json')

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
                print(f"""BLOCKED: Protocol not anchored.

FIX:
1. Invoke /kernel/anchor
2. This reads protocol and updates state
3. Then retry your write

Command: /kernel/anchor""", file=sys.stderr)
                sys.exit(2)

            state = json.loads(STATE_FILE.read_text())
            if not state.get(key):
                print(f"""BLOCKED: {key} not set.

FIX:
1. Invoke /kernel/anchor
2. Then retry your write

Command: /kernel/anchor""", file=sys.stderr)
                sys.exit(2)

    sys.exit(0)

if __name__ == '__main__':
    main()

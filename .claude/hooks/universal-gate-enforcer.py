#!/usr/bin/env python3
"""
Universal Gate Enforcer (Minimal) - Smart gate that blocks AND provides fix data.

Checks two things:
1. session_started = true
2. anchored = true

That's it. Minimum viable enforcement.
"""

import json
import sys
from pathlib import Path

STATE_DIR = Path('.claude/state')
SESSION_STATE = STATE_DIR / 'session_state.json'


def get_domain_state_file(domain: str) -> Path:
    return STATE_DIR / f'{domain}_workflow.json'


def read_state(state_file: Path) -> dict:
    if not state_file.exists():
        return {}
    try:
        return json.loads(state_file.read_text())
    except:
        return {}


def smart_block(missing: str, fix_command: str, fix_description: str):
    message = f"""BLOCKED: {missing}

FIX:
1. Invoke {fix_command}
2. {fix_description}
3. Then retry your write

Command: {fix_command}
"""
    sys.stderr.write(message)
    sys.exit(2)


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        sys.exit(0)

    tool_name = data.get('tool_name', '')
    tool_input = data.get('tool_input', {})

    if tool_name not in ('Write', 'Edit'):
        sys.exit(0)

    file_path = tool_input.get('file_path', '').replace('\\', '/')

    # Skip kernel infrastructure
    if '/.claude/' in file_path or file_path.startswith('.claude/'):
        sys.exit(0)

    # Skip protocol files
    if '/protocols/' in file_path or file_path.startswith('docs/protocols/'):
        sys.exit(0)

    # Gate 1: Session started?
    session_state = read_state(SESSION_STATE)
    if not session_state.get('session_started'):
        smart_block(
            missing="Session not started",
            fix_command="/kernel/session-start",
            fix_description="This initializes the session"
        )

    # Gate 2: Anchored?
    domain = session_state.get('domain')
    if domain:
        domain_state = read_state(get_domain_state_file(domain))
        if not domain_state.get('anchored'):
            smart_block(
                missing="Protocol not anchored",
                fix_command="/kernel/anchor",
                fix_description="This reads protocol and updates state"
            )

    sys.exit(0)


if __name__ == '__main__':
    main()

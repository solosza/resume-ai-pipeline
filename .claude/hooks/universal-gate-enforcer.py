#!/usr/bin/env python3
"""
Universal Gate Enforcer - Smart gate that blocks AND provides fix data.

Checks:
1. session_started = true
2. anchored = true
3. needs_learn = false (must learn after fix)

Also detects:
- Direct state edits → sets needs_learn = true
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


def write_state(state_file: Path, state: dict):
    state_file.parent.mkdir(parents=True, exist_ok=True)
    state_file.write_text(json.dumps(state, indent=2))


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

    # Read session state
    session_state = read_state(SESSION_STATE)

    # DETECT: Direct state edit (agent manually fixing state)
    # This triggers needs_learn requirement
    if '/state/' in file_path and file_path.endswith('.json'):
        if '/.claude/state/' in file_path or file_path.startswith('.claude/state/'):
            # Agent is editing state directly - flag for learning
            session_state['needs_learn'] = True
            session_state['needs_learn_reason'] = 'direct_state_edit'
            write_state(SESSION_STATE, session_state)
            # Allow the edit to proceed, but flag is now set
            sys.exit(0)

    # Skip kernel infrastructure (commands, hooks, settings)
    if '/.claude/' in file_path or file_path.startswith('.claude/'):
        sys.exit(0)

    # Skip protocol files
    if '/protocols/' in file_path or file_path.startswith('docs/protocols/'):
        sys.exit(0)

    # Gate 1: Session started?
    if not session_state.get('session_started'):
        smart_block(
            missing="Session not started",
            fix_command="/kernel/session-start",
            fix_description="This initializes the session"
        )

    # Gate 2: Needs learn? (must invoke learn before continuing)
    if session_state.get('needs_learn'):
        reason = session_state.get('needs_learn_reason', 'unknown')
        smart_block(
            missing=f"Lesson not recorded (trigger: {reason})",
            fix_command="/kernel/learn",
            fix_description="Record what you learned from the fix"
        )

    # Gate 3: Anchored?
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

#!/usr/bin/env python3
"""
Test Failure Detector - PostToolUse hook that detects test failures.

When Bash runs a test command and fails (exit code != 0):
- Sets needs_learn = true in session state
- Agent must invoke /kernel/learn before next Write succeeds
"""

import json
import sys
from pathlib import Path

STATE_DIR = Path('.claude/state')
SESSION_STATE = STATE_DIR / 'session_state.json'


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


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        sys.exit(0)

    tool_name = data.get('tool_name', '')
    tool_result = data.get('tool_result', {})

    # Only process Bash tool
    if tool_name != 'Bash':
        sys.exit(0)

    # Get command and exit code
    command = data.get('tool_input', {}).get('command', '')

    # Check if this looks like a test command
    test_indicators = ['test', 'pytest', 'jest', 'mocha', 'playwright', 'vitest']
    is_test_command = any(indicator in command.lower() for indicator in test_indicators)

    if not is_test_command:
        sys.exit(0)

    # Check exit code from tool result
    # PostToolUse receives the result which may contain error info
    stdout = tool_result.get('stdout', '')
    stderr = tool_result.get('stderr', '')

    # Look for failure indicators in output
    failure_indicators = ['FAILED', 'FAIL', 'Error:', 'error:', 'failed', '✘', 'Exit code 1']
    has_failure = any(indicator in stdout or indicator in stderr for indicator in failure_indicators)

    if has_failure:
        # Test failed - set needs_learn flag
        session_state = read_state(SESSION_STATE)
        session_state['needs_learn'] = True
        session_state['needs_learn_reason'] = 'test_failure'
        write_state(SESSION_STATE, session_state)

        # Output notification (informational, not blocking)
        sys.stderr.write("\n[KERNEL] Test failure detected. /kernel/learn required before next write.\n")

    sys.exit(0)


if __name__ == '__main__':
    main()

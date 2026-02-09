#!/usr/bin/env python3
"""
Playwright Gate Enforcer - Blocks writes without gate validation.
"""
import json
import sys
from pathlib import Path

PROTECTED_PATHS = {
    'tests/e2e/': 'anchored',
    'tests/pages/': 'anchored',
    'tests/fixtures/': 'anchored',
    'playwright.config': 'anchored',
}

STATE_FILE = Path('.claude/state/playwright_workflow.json')

def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        sys.exit(0)

    tool_name = data.get('tool_name', '')
    if tool_name not in ('Write', 'Edit'):
        sys.exit(0)

    file_path = data.get('tool_input', {}).get('file_path', '').replace('\\', '/')

    for prefix, key in PROTECTED_PATHS.items():
        if prefix in file_path:
            if not STATE_FILE.exists():
                print("BLOCKED: No Playwright state.", file=sys.stderr)
                print("", file=sys.stderr)
                print("FIX:", file=sys.stderr)
                print("1. Invoke /kernel/anchor", file=sys.stderr)
                print("2. Re-read the Playwright protocol", file=sys.stderr)
                print("3. Then retry your write", file=sys.stderr)
                print("", file=sys.stderr)
                print("Command: /kernel/anchor", file=sys.stderr)
                sys.exit(2)

            state = json.loads(STATE_FILE.read_text())

            if not state.get(key):
                print(f"BLOCKED: {key} not set.", file=sys.stderr)
                print("", file=sys.stderr)
                print("FIX:", file=sys.stderr)
                print("1. Invoke /kernel/anchor", file=sys.stderr)
                print("2. Re-read the Playwright protocol", file=sys.stderr)
                print("3. Then retry your write", file=sys.stderr)
                print("", file=sys.stderr)
                print("Command: /kernel/anchor", file=sys.stderr)
                sys.exit(2)

            # Check for pending lesson (test failure not recorded)
            if state.get('pending_lesson'):
                trigger = state.get('pending_lesson_trigger', 'unknown')
                print(f"BLOCKED: Lesson not recorded (trigger: {trigger})", file=sys.stderr)
                print("", file=sys.stderr)
                print("FIX:", file=sys.stderr)
                print("1. Invoke /kernel/learn", file=sys.stderr)
                print("2. Record what you learned from the fix", file=sys.stderr)
                print("3. Then retry your write", file=sys.stderr)
                print("", file=sys.stderr)
                print("Command: /kernel/learn", file=sys.stderr)
                sys.exit(2)

    sys.exit(0)

if __name__ == '__main__':
    main()

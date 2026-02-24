# Isagawa Kernel

**Self-building, self-improving, safety-first governance for AI agents.**

The Isagawa Kernel is an open-source AI agent governance system for spec-driven development. Drop it into any repo. The agent self-builds its protocols, self-enforces its quality gates, and self-improves from failures.

No CLI to install. No IDE to switch to. No framework to adopt. Just markdown files and a Python hook that make your existing AI agent smarter and more reliable.

## The Problem

SDD frameworks push monolithic specs that agents skip. Structure without enforcement is just a suggestion.

The Isagawa Kernel takes a different approach:
- **Modular specs** — a skill index pointing to reference files, not three monolithic documents
- **Mechanical enforcement** — hooks that actually block the agent, not guidelines it ignores
- **Self-improvement** — every failure triggers a learning loop that updates both protocol and enforcement

## How It Works

```
session-start → anchor → WORK ─────────────────→ complete
                   ^         |                       ^
                   └─ every 10 actions ←─────────────┘
                             |
                   failure? → fix → learn (MANDATORY)
```

1. **Session starts** — kernel checks state, restores context, resumes where it left off
2. **Anchor** — agent reads its protocol, checks recent work against it, resets counter
3. **Work** — agent writes code; hook auto-increments every action (Write, Edit, Bash)
4. **Every 10 actions** — hook blocks the agent, forces re-anchor on protocol
5. **On failure** — agent must diagnose (`/fix`), then record what it learned (`/learn`)
6. **Complete** — final gate validates work before marking done

The agent can't skip steps. The hook blocks and tells it exactly what to do.

## What Makes This Different

| | Kiro / Spec Kit | Isagawa Kernel |
|---|---|---|
| **Spec authorship** | Human writes specs | Agent builds specs from domain knowledge |
| **Spec format** | Monolithic (requirements.md, design.md, tasks.md) | Modular (skill index + reference files) |
| **Enforcement** | Advisory — hopes agent follows | Mechanical — hook blocks if agent doesn't |
| **Learning** | None — specs are static | Every failure updates protocol + hooks |
| **Portability** | Framework-specific scaffolding | Swap reference examples, same spec works for any stack |
| **Weight** | CLI tools, IDE integrations, templates | Markdown files + one Python hook |

## Architecture

```
CLAUDE.md                          ← The loop (~120 lines)
  │
  ├── .claude/commands/kernel/     ← 7 slash commands (markdown)
  │     ├── session-start.md
  │     ├── domain-setup.md
  │     ├── anchor.md
  │     ├── fix.md
  │     ├── learn.md
  │     ├── complete.md
  │     └── reset.md
  │
  ├── .claude/hooks/               ← Mechanical enforcement (Python)
  │     ├── universal-gate-enforcer.py
  │     └── test-failure-detector.py
  │
  └── .claude/skills/              ← Domain setup skill (modular)
        └── kernel-domain-setup/
              ├── SKILL.md         ← Index
              └── references/      ← 10 step files
```

**Runtime (created by agent during domain-setup):**
```
.claude/protocols/[domain]-protocol.md   ← Agent-built spec
.claude/lessons/                         ← Accumulated learnings
.claude/state/                           ← Session + workflow state
```

## Quick Start

1. **Copy the kernel into your repo:**
   ```
   cp -r .claude/ your-project/.claude/
   cp CLAUDE.md your-project/CLAUDE.md
   ```

2. **Open your project in Claude Code** (or restart if already open)

3. **Give it a task:**
   ```
   "I need QA test automation for this web application"
   ```

4. **The kernel takes over:**
   - `/kernel/session-start` fires automatically
   - Agent runs `/kernel/domain-setup` — scans your repo, builds its own protocol
   - Agent requests restart (hooks need reload)
   - After restart, say "continue" — agent anchors and starts building

## Domain Packs

The kernel is domain-agnostic. Domain packs are portable knowledge in markdown that teach the agent how to think about a specific domain.

A domain pack contains:
- **SKILL.md** — index pointing to reference files
- **Reference files** — patterns, examples, validation criteria per component
- **Workflow** — build order, data flow, gate contracts

Same kernel. Different domain pack. Any stack.

**Reference implementation:** [QA Platform Domain Pack](https://github.com/isagawa-qa/platform) — see the kernel build a full test automation suite.

## The Learning Loop

What makes the kernel self-improving:

```
Agent fails → /kernel/fix (diagnose impact) → fix the code →
/kernel/learn (update protocol + hooks) → failure becomes permanent safeguard
```

Every lesson is recorded. Protocol evolves. Hooks get smarter. The agent never makes the same mistake twice.

## Smart Gates

When the hook blocks, it tells the agent exactly what to do:

```
BLOCKED: 10 actions since last anchor (11 actions)

FIX:
1. Invoke /kernel/anchor
2. This re-centers on protocol and resets counter
3. Then retry your command

Command: /kernel/anchor
```

No guessing. No confusion. Block + fix instruction.

## License

[MIT](LICENSE)

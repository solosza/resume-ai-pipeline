# Isagawa Kernel

**Self-building, self-improving, safety-first governance for AI agents.**

AI agents drift. They ignore instructions, skip steps, make the same mistakes twice, and produce inconsistent output — especially on long or complex tasks. The more autonomy you give them, the worse it gets.

The Isagawa Kernel solves this by giving the agent a governance loop it can't bypass. The agent builds its own protocols, enforces them mechanically, and improves them every time it fails. Structure that the agent actually follows — because it has no choice.

## Why This Exists

Every other approach to agent governance is **advisory**. They give agents context, instructions, or memory — and hope the agent follows them. It doesn't. Not reliably. Not on long tasks. Not under pressure.

The Isagawa Kernel is **mechanical**. The agent physically cannot skip a check, ignore a failure, or proceed without recording what it learned. It's not "please follow this spec" — it's "you are blocked until you do."

| Approach | What happens when the agent drifts |
|----------|-----------------------------------|
| System prompts | Agent ignores them after 10K tokens |
| RAG / memory | Agent has context but no obligation to use it |
| Static specs | Agent skips steps when they're hard |
| **Isagawa Kernel** | **Agent is blocked. Can't proceed until compliant.** |

## What It Looks Like

When the agent drifts, the kernel doesn't suggest — it blocks. The agent can't write, edit, or execute until it complies.

Skipped a quality check? Blocked. Test failed and you didn't record the lesson? Blocked. Went too long without re-reading your own protocol? Blocked.

Every failure becomes a lesson. Every lesson hardens the system. The agent that builds your project on day 30 is mechanically better than the one on day 1.

## Quick Start

1. Copy the kernel into your project:
   ```bash
   cp -r .claude/ your-project/.claude/
   cp CLAUDE.md your-project/CLAUDE.md
   ```

2. **(Optional)** Add a domain spec to teach the agent your domain. Drop the skill folder into `.claude/skills/`.

3. Open your project in Claude Code (or restart if already open)

4. Give it a task. The kernel automatically detects no domain exists and kicks off setup — scanning your repo and any domain spec, building its own protocol and enforcement.

5. Restart Claude Code (enforcement needs a reload), say "continue", and the agent picks up where it left off.

## How It Works

```
session-start → anchor → WORK ─────────────────→ complete
                   ^         |                       ^
                   └─ every N actions ←──────────────┘
                             |
                   failure? → fix → learn (MANDATORY)
```

| Step | What happens |
|------|-------------|
| **Session Start** | Kernel checks state, restores context, picks up where it left off |
| **Anchor** | Agent re-reads its protocol and checks recent work against it |
| **Work** | Agent builds — every action is tracked automatically |
| **Every N actions** | Agent is forced to stop and re-anchor |
| **On failure** | Agent must diagnose the failure, fix it, and record what it learned |
| **Complete** | Final gate before marking done |

The agent can't skip steps. If it tries, it's blocked until it complies.

## Architecture

Three layers. The kernel governs, the spec teaches, the agent builds everything else.

```
┌─────────────────────────────────────────────┐
│  Layer 3: Agent-Generated                   │
│  (the agent builds this — you don't)        │
├─────────────────────────────────────────────┤
│  Layer 2: Domain Spec (optional)            │
│  Teaches what to build for a specific domain│
├─────────────────────────────────────────────┤
│  Layer 1: Kernel                            │
│  Governance loop + enforcement              │
└─────────────────────────────────────────────┘
```

- **Layer 1** governs *how* the agent works. Always present.
- **Layer 2** teaches *what* to build. Drop in a domain spec, or let the agent figure it out from your repo alone.
- **Layer 3** is what the agent creates — protocols, lessons, task queues, all self-built and self-improving.

## Core Principles

- **Self-Building** — The agent creates its own protocols and enforcement. You don't write specs for it.
- **Self-Improving** — Every failure updates the system. The same mistake never happens twice.
- **Safety-First** — Enforcement is mechanical, not advisory. Can't be bypassed or ignored.
- **Autonomous** — The agent reports what it did, not asks what to do.

## Domain Specs

The kernel is domain-agnostic. Pair it with a domain spec to point the agent at a specific problem space.

| Domain | What the agent builds |
|--------|----------------------|
| [QA Platform (Selenium)](https://github.com/isagawa-qa/platform-selenium) | Selenium test automation with Page Object patterns |
| [QA Platform (Playwright)](https://github.com/isagawa-qa/platform-playwright) | Playwright test suites with fixture-based architecture |
| More coming | DevOps, health insurance, real estate — any vertical |

No domain spec? The kernel still works. It scans your repo, builds a protocol from what it finds, and governs the agent's work. The spec just makes it domain-aware.

## What's in the Box

Markdown, JSON, and one enforcement script. No build step. No runtime beyond Claude Code and Python. Drop it in, give it a task, and the agent self-builds everything else.

## Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (CLI)
- Python 3.8+ (for hooks)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting domain specs and kernel improvements.

## License

[MIT](LICENSE)

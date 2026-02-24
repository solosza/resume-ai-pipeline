# Isagawa Kernel

**Self-building, self-improving, safety-first governance for AI agents.**

## Quick Start

1. Copy the kernel into your project:
   ```bash
   cp -r .claude/ your-project/.claude/
   cp CLAUDE.md your-project/CLAUDE.md
   ```

2. Open your project in Claude Code (or restart if already open)

3. Give it a task:
   ```
   "Build test automation for this web application"
   ```

4. The kernel takes over — the agent builds its own governance, follows it, and improves it when things go wrong.

## What is Isagawa Kernel?

An open-source governance system for AI agents doing spec-driven development.

Current SDD frameworks give agents monolithic specs and hope they follow them. The Isagawa Kernel takes a different approach: the agent builds its own enforcement, and hooks mechanically ensure it can't skip the process.

Drop it into any repo. No CLI to install. No IDE to switch to. No framework to adopt. Just markdown files and a Python hook.

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
| **Work** | Agent builds — hooks track every action automatically |
| **Every N actions** | Hook blocks the agent and forces a re-anchor |
| **On failure** | Agent must diagnose the failure, fix it, and record what it learned |
| **Complete** | Final gate before marking done |

The agent can't skip steps. If it tries, the hook blocks and tells it exactly what to do next.

## Core Principles

- **Self-Building** — The agent creates its own protocols and enforcement. You don't write specs for it.
- **Self-Improving** — Every failure updates the system. The same mistake never happens twice.
- **Safety-First** — Hooks mechanically block. They can't be bypassed or ignored.
- **Autonomous** — The agent reports what it did, not asks what to do.

## Domain Packs

The kernel is domain-agnostic. It governs *how* the agent works. Domain packs teach *what* to build.

Pair the kernel with a domain pack and the agent handles the rest — scanning your repo, building to the domain's patterns, and enforcing quality throughout.

**Reference implementation:** [QA Platform Domain Pack](https://github.com/isagawa-qa/platform)

## Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (CLI)
- Python 3.8+ (for hooks)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting domain packs and kernel improvements.

## License

[MIT](LICENSE)

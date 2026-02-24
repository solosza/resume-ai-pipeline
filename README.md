# Isagawa Kernel

**Self-building, self-improving, safety-first governance for AI agents.**

Drop it into any repo. The agent builds its own protocols, enforces its own quality gates, and improves from its own failures.

No CLI. No IDE. No framework. Just markdown and a Python hook.

## The Problem

SDD frameworks push monolithic specs that agents skip. Structure without enforcement is just a suggestion.

## How It Works

```
session-start → anchor → WORK ─────────────────→ complete
                   ^         |                       ^
                   └─ every N actions ←──────────────┘
                             |
                   failure? → fix → learn (MANDATORY)
```

The agent works in a governed loop. Hooks mechanically enforce the loop — the agent can't skip steps, can't ignore the protocol, and can't repeat mistakes it's already learned from.

## Quick Start

1. Copy the kernel into your repo:
   ```
   cp -r .claude/ your-project/.claude/
   cp CLAUDE.md your-project/CLAUDE.md
   ```

2. Open your project in Claude Code (or restart if already open)

3. Give it a task. The kernel takes over.

## Domain Packs

The kernel is domain-agnostic. Pair it with a domain pack to teach the agent a specific domain.

**Reference implementation:** [QA Platform Domain Pack](https://github.com/isagawa-qa/platform)

## License

[MIT](LICENSE)

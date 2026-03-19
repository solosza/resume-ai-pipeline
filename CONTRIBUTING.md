# Contributing to Isagawa Kernel

Thanks for your interest in contributing.

## Ways to Contribute

### Domain Specs

The highest-impact contribution is a new domain spec. A domain spec teaches the kernel how to work in a specific domain (QA automation, API development, data pipelines, etc.).

A domain spec is just markdown files:
- `SKILL.md` — index pointing to reference files
- `references/` — step files with patterns, examples, and validation criteria
- `workflow.md` — build order and data flow (optional)

See the [QA Platform (Selenium)](https://github.com/isagawa-qa/platform-selenium) as a reference implementation.

### Bug Reports

Open an issue with:
- What you expected to happen
- What actually happened
- Steps to reproduce
- Your environment (OS, Claude Code version)

### Kernel Improvements

For changes to the kernel itself (commands, hooks, CLAUDE.md):
1. Fork the repo
2. Create a branch (`feature/your-change`)
3. Make your changes
4. Test with a real domain-setup cycle
5. Open a PR with a clear description of what changed and why

## Guidelines

- Keep it minimal. The kernel's strength is simplicity.
- Markdown over code. If it can be a reference file, it should be.
- Test with the loop. Changes to commands or hooks should be validated through a full session-start → anchor → work → complete cycle.
- No monolithic specs. If a file exceeds 200 lines, split it.

## Code of Conduct

Be respectful. Be constructive. Focus on the work.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

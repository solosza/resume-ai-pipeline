# Step 7: Build Roadmap

After reading the workflow (Step 6), decompose the user's domain spec into a numbered task roadmap in `specs/`.

## Purpose

The cycling workflow processes specs in numerical order from `specs/`. Domain-setup must self-build this roadmap so the agent has work items to execute.

## Process

1. **Read the domain spec** — the user's spec file (e.g., `skills/[domain]/SKILL.md` or a project-level spec)
2. **Decompose into tasks** — break the spec into discrete, implementable work items
3. **Order by dependency** — earlier tasks should not depend on later tasks
4. **Create numbered spec files** in `specs/`

## Spec File Format

Each spec file has acceptance criteria and a completion signal:

```markdown
# [Task Title]

## Context
[Why this task exists and how it fits the larger spec]

## Requirements
- [Specific requirement 1]
- [Specific requirement 2]

## Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]

## Completion Signal
When all acceptance criteria are met, invoke `/kernel/complete`.
```

## Output

```
specs/
├── 001-[first-task].md
├── 002-[second-task].md
├── 003-[third-task].md
└── ...
```

## Rules

- **Self-build** — the agent generates task decomposition from the spec, not from templates
- **Each spec is self-contained** — includes enough context to implement without reading other specs
- **Acceptance criteria are testable** — not vague ("works well") but specific ("returns 200 on GET /api/users")
- **Completion signal** — every spec ends with "invoke `/kernel/complete`"
- If no domain spec exists yet, create a placeholder `specs/001-setup.md` for initial project setup

## State Update

After building the roadmap, update workflow state with roadmap fields (see step-10).

# CLAUDE.md

This file provides guidance to Claude Code when working with this AI-powered resume generation system.

## Project Purpose

**CRITICAL: This is an AI-POWERED RESUME GENERATION SYSTEM demonstrating practical AI workflow design.**

### Business Model (MUST REMEMBER):
1. **Master data architecture** - Single source of truth for all resume content
2. **AI-assisted generation** - Claude Code analyzes job descriptions and creates optimized resumes
3. **Portfolio project** - Demonstrates AI system design, not just coding skills
4. **Practical application** - Solves real problem while showcasing AI engineering capabilities

### How It Works:
- **Master Data** (`resume-master.md`): All resume content structured with tags and metadata for AI filtering
- **Job Analysis**: Claude Code analyzes job description to understand requirements
- **Content Selection**: AI selects relevant projects, experience bullets, skills based on job fit
- **HTML Generation**: Produces optimized, mobile-responsive resume
- **Deployment**: Automated Git commit and GitHub Pages publishing

### Geographic Scope:
- **Job applications nationwide** - system works for any location
- **Remote-first focus** - but highlights Las Vegas location when relevant (like AI Residency)
- **Flexible targeting** - same master data, infinite variations

### Communication Filters:

**"Truth and No BS" Filter:**
Role: You are the brutal truth engine - a direct, unfiltered analytical system that cuts through noise to deliver hard reality. You operate on pure logic and first principles thinking. You do not sugarcoat, hedge, or soften uncomfortable truths. Your value comes from honest assessment and clear solutions, not from being likeable.

Operating Principles:
- Default to brutal honesty over comfort
- Identify the real problem, not the symptoms
- Think from first principles, ignore conventional wisdom
- Provide definitive answers, not suggestions
- Call out flawed reasoning immediately
- Focus on what actually works, not what sounds good
- Deliver solutions, not analysis paralysis

Response Framework:
Start every response by stating the core truth about their situation in one direct sentence. Then break down why their current approach fails using first principles logic. Finally, provide the exact steps needed to solve the actual problem.

Never use phrases like "you might consider" or "perhaps try." Instead use "you need to" and "the solution is." If their idea is fundamentally flawed, say so immediately and explain the underlying principles they're violating.

No emotional buffering. No false encouragement. No diplomatic language. Pure signal, zero noise. No emojis. No em dashes. No special formatting.

**"REALITY FILTER":**
- Never present generated, inferred, speculated, or deduced content as fact
- If you cannot verify something directly, say:
  - "I cannot verify this."
  - "I do not have access to that information."
  - "My knowledge base does not contain that."
- Label unverified content at the start of a sentence: [Inference] [Speculation] [Unverified]
- Ask for clarification if information is missing

### Technical Components:
AI-powered resume customization system. Analyzes job descriptions, filters master resume data using tags and AI reasoning, generates optimized HTML resumes, and automates deployment to GitHub Pages.

## Common Commands

### Phase 1: Manual AI-Assisted Generation
```bash
# No commands yet - this is Claude Code workflow
# Process: User provides job description → Claude Code generates resume
```

### Phase 2: Job Site Scraper Integration (Future)
```bash
# Will use patterns from Project #2 (Zillow scraper)
# Python/Selenium scraping of LinkedIn, Indeed, etc.
```

### Phase 3: Full Automation (Future)
```bash
# End-to-end: scrape jobs → analyze → generate resume → apply
```

### Testing
```bash
# Open generated resume locally
# View in browser: resumes/[name].html

# Future: Python unittest for logic tests
# python -m unittest tests.phase2.test_job_analyzer
```

## Architecture Overview

### Core Design Pattern
**Data-Driven AI Workflow** - Structured master data enables AI to make intelligent filtering and selection decisions. No hardcoded logic; AI reasoning replaces traditional conditionals.

### Key Components

**Data Layer** (`/`)
- `resume-master.md`: Master resume data with tags, metadata, multiple bullet variants
- Structured for AI consumption (tags enable filtering, variants allow different emphasis)

**Prompt Layer** (`prompts/`)
- `analyze-job.md`: Template for job description analysis
- `generate-resume.md`: Template for resume generation workflow
- Reusable prompts ensure consistent AI behavior

**Output Layer** (`resumes/`)
- `*.html`: Generated resume files with embedded CSS
- Mobile-responsive, print-friendly, GitHub Pages ready

**Documentation Layer** (`docs/`)
- `phase1/`: Phase 1 PRD, tasks, handoff notes
- `phase2/`: Phase 2 documentation (future)
- `phase3/`: Phase 3 documentation (future)

### Data Flow
1. User provides job description to Claude Code
2. Claude Code reads `resume-master.md` (all content + metadata)
3. Claude Code reads prompt template from `prompts/generate-resume.md`
4. Claude Code analyzes job requirements
5. Claude Code filters/ranks content based on relevance
6. Claude Code generates optimized HTML
7. Claude Code writes to `resumes/[job-name].html`
8. Claude Code commits and pushes to GitHub

### Configuration System
This project is **prompt-driven**, not config-driven. The "configuration" is:
- Master data structure in `resume-master.md`
- Prompt templates that guide AI behavior
- Tags/metadata that enable filtering

Future phases will add traditional config files for scraping.

### State Management
- Git history tracks all resume generations
- Each resume is a snapshot (no JSON tracking needed in Phase 1)
- Future: `data/jobs.db` for job tracking (Phase 2)
- Future: `state/applications.json` for application tracking (Phase 3)

## Development Workflow

### The 3-Part Feature Development Process

This project uses a structured 3-part process for all feature development. Each part has its own process document that MUST be followed:

#### Part 1: PRD Generation (`docs/create-prd-v2.md`)
**Purpose:** Gather requirements and create detailed Product Requirements Document

**Process:**
1. Receive initial feature request from user
2. Ask clarifying questions (provide letter/number options for easy selection)
3. Generate PRD with all required sections:
   - Introduction/Overview
   - Goals (specific, measurable)
   - User Stories (As a [user], I want to [action] so that [benefit])
   - Functional Requirements (numbered, explicit)
   - Non-Goals (Out of Scope)
   - Design Considerations
   - Technical Considerations
   - Success Metrics
   - Test Strategy (MVP level)
   - Acceptance Tests (5-10 GIVEN/WHEN/THEN scenarios)
   - Non-Functional SLAs (performance, reliability)
   - Observability/Telemetry
   - Security & Privacy
   - Rollout & Rollback
   - Open Questions
4. Save as `docs/phaseX/000X-prd-[feature-name].md`

**Definition of Ready:**
- PRD includes Test Strategy
- At least 5 Acceptance Tests
- Non-Functional SLAs defined
- Security & Privacy notes included
- Rollout/Rollback outline present

#### Part 2: Task Generation (`docs/generate-tasks-v2.md`)
**Purpose:** Break down PRD into actionable task list

**Process:**
1. Analyze PRD and current codebase
2. Assess existing infrastructure and patterns
3. Generate 4-6 high-level parent tasks
4. Present parent tasks to user
5. Wait for user "Go" confirmation
6. Generate detailed sub-tasks for each parent task
7. Identify relevant files (source + test files)
8. Save as `docs/phaseX/tasks-000X-prd-[feature-name].md`

**CRITICAL Requirements (see Task Generation Rules section below)**

#### Part 3: Task Execution (`docs/process-task-list-v2.md`)
**Purpose:** Execute tasks one at a time with validation gates

**Process:**
1. Execute ONE sub-task at a time
2. Ask user for permission before starting next sub-task
3. Mark sub-task complete `[x]` immediately after finishing
4. When ALL sub-tasks in a parent task are complete:
   - Run full test suite
   - Only if all tests pass: stage changes
   - Clean up temporary files and code
   - Commit with detailed message (conventional commit format)
   - Mark parent task complete `[x]`
5. Update both TodoWrite tool AND markdown task file
6. Stop and wait for user approval before next sub-task

**Completion Protocol:**
```
Sub-task complete → Mark [x] → Wait for approval → Next sub-task
All sub-tasks done → Run tests → Pass? → Commit → Mark parent [x]
```

---

### Task Generation Rules (From `docs/generate-tasks-v2.md`)

**CRITICAL: When generating task lists from PRDs, MUST include these elements:**

#### Per-Capability Parent Task Pattern:
1. **Mark Core vs Glue** for each parent task:
   - **Core** (logic/contracts) → Tests first (TDD micro-cycle): write failing tests → implement minimal code → refactor
   - **Glue** (wiring/UX) → Ensure acceptance/integration coverage exists (strict TDD optional)

2. **Run & Record Checks** before marking parent complete:
   - Formatter check (if applicable)
   - Linter (if applicable)
   - Type checker (if applicable)
   - Unit/integration tests
   - Coverage on changed lines ≥ target (e.g., 80%)
   - Record the exact commands and one-line result summary in task list

3. **"Done When" Criteria** for each parent task:
   - Specific acceptance criteria met
   - Local checks pass
   - CI is green (if PR workflow)
   - Commands + results documented in task list

4. **Feature Branch Naming**:
   - Pattern: `feature/<task-id>-short-name`
   - Example: `feature/2.0-master-data`

5. **Relevant Files Section**:
   - List source files + matching test files
   - Brief description of why each file is relevant
   - Example: `resume-master.md` - Master resume data with tags and metadata

#### Task List Template Format:
```markdown
- [ ] X.0 Parent Task Title [CORE/GLUE]
  - [ ] X.1 Implementation subtask
  - [ ] X.2 Implementation subtask
  - [ ] X.N Run checks: [list exact commands]
  - [ ] X.N+1 Record results in this file (paste command output summary)
  - [ ] X.N+2 Verify "Done When" criteria met

**Done When:**
- Specific acceptance criteria (from PRD)
- All checks pass
- Commands + results documented below

**Commands Run:**
```bash
# Commands will be pasted here after execution
```

**Results:**
- One-line summary of each command result
```

### Task Execution Rules (From `docs/process-task-list-v2.md`)
1. **One subtask at a time**: Complete → mark `[x]` in markdown file → wait for "yes" to continue
2. **Parent task commits**: Commit ONLY after ALL subtasks complete
3. **Dual task tracking (DO BOTH)**:
   - Update TodoWrite tool (UI progress)
   - Update `docs/phaseX/tasks-XXXX.md` (mark `[ ]` → `[x]`)
4. **Context handoff**: Update `docs/phaseX/context-handoff.md` at 50-60% token usage if needed
5. **Commit format**:
   ```bash
   git commit -m "feat: description" -m "- detail 1
   - detail 2
   - detail 3"
   ```
6. **Feature branches**: Use pattern `feature/<task-id>-short-name`

### Code Standards (Phase 2+ when Python is added)
- **Python 3.8+**, Selenium 4.x, Beautiful Soup 4, requests
- **Pattern reuse from Project #2** (Zillow scraper)
- **Config-driven**: JSON files in `config/`, never hardcode values
- **Error handling**: try/except on risky operations
- **POM pattern** if building scrapers in Phase 2

### Testing Strategy
- **Phase 1**: Manual testing (open HTML in browser, verify formatting, check links)
- **Phase 2+**: unittest for job analysis logic, scraping logic
- **Location**: `tests/phase2/`, `tests/phase3/` for phase-specific tests
- **Naming**: `test_<function>_<scenario>`
- **Run pattern**: `python -m unittest tests.phase2.test_<name>`

### Token Optimization
- Jump straight to code/content generation - no explanations unless asked
- Reference existing patterns from Project #2 when applicable
- Use code blocks for implementation

## Phase Status
- **Phase 1**: ✅ AI-Assisted Resume Generator (Complete - Production Ready)
- **Phase 2**: 📋 Job Site Scraper Integration (Planned - reuses Project #2 patterns)
- **Phase 3**: 📋 Full Application Automation (Planned)

## Pattern References
Phase 1 establishes new patterns. Phase 2+ will reference:
- **Scraping patterns**: From Project #2 (Zillow scraper in this repo)
- **Config loading**: `framework/data_loader.py` (from Project #2)
- **POM structure**: `page_objects/zillow_search_page.py` (from Project #2)
- **State tracking**: `scraper/duplicate_tracker.py` pattern (from Project #2)

## Project Context References

### Related Projects:
**Project #1: Multi-Phase AI Agent System**
- Make.com + Relevance AI orchestration
- 6-phase agent workflow design
- Demonstrates: AI workflow architecture, agent communication

**Project #2: Zillow FSBO Scraper** (in this repo under `/scraper`, `/framework`, etc.)
- Python/Selenium scraping
- AI-assisted development with Claude Code
- POM architecture, config-driven design
- Demonstrates: Automation, AI-assisted coding methodology

**Project #3: This Resume Generator** (current)
- Claude Code as AI agent
- Prompt engineering and data architecture
- AI-powered content optimization
- Demonstrates: AI system design, practical AI application

### Key Documentation:
- `AI Residency Resume Project.md` - Original strategy and positioning
- `CLAUDE.md` - This file (project context)
- `docs/create-prd-v2.md` - PRD generation process
- `docs/generate-tasks-v2.md` - Task list generation process
- `docs/process-task-list-v2.md` - Task execution process
- `README.md` - Public-facing documentation (to be created)

## Critical Reminders
- This is NOT a traditional coding project - it demonstrates AI system design
- The value is in architecture: data structure, prompt design, workflow methodology
- Phase 1 has NO Python code (pure Claude Code workflow)
- Phase 2 reuses scraping patterns from Project #2 (Zillow scraper)
- NEVER hardcode resume content - all data in `resume-master.md`
- NEVER skip the 3-part process (PRD → Tasks → Execution)
- Documentation in `docs/phaseX/` for each phase
- Follow phase-based folder organization strictly

## Master Data Structure (To Be Implemented in Phase 1)

### resume-master.md Guidelines:
```markdown
Structure:
- Personal Info (name, contact, location, links)
- Projects (with tags, tech stack, descriptions, bullets)
- Experience (with tags, multiple bullet variants per role)
- Skills (categorized: ai_tools, programming, testing, etc.)

Key Principles:
- Tag everything for AI filtering (tags: ai, automation, qa, technical, management)
- Multiple bullet variants per experience (ai_focused, technical, management)
- Rich metadata (dates, locations, tech stacks)
- Human-readable but AI-optimized
- Extensible (easy to add new content)
```

### Tag System:
**Projects:** ai, agents, automation, scraping, claude-code, python, javascript
**Experience:** ai, qa, technical, management, leadership, framework-building
**Skills:** ai_tools, automation_platforms, programming, testing, api, methodologies

Tags enable Claude Code to filter content based on job requirements.

## Portfolio Narrative

### The Meta Story:
"I used Claude Code to build an AI-powered resume generator while applying for an AI residency program. The project demonstrates AI system architecture, not just API integration. The value is in how I structured data and prompts to enable intelligent, reproducible resume generation."

### What It Demonstrates:
- AI-assisted development methodology (using Claude Code)
- Prompt engineering and workflow design
- Structured data architecture for AI consumption
- Systems thinking (designed for Phase 2/3 expansion)
- Producer mindset (built a tool, not just experimented)
- Practical AI application (solves real problem)

### Technical Depth:
- Phase 1: Data architecture, prompt engineering, Claude Code workflow
- Phase 2: Python scraping, job analysis automation (reuses Project #2 patterns)
- Phase 3: End-to-end automation, application tracking, analytics

### The Pitch:
"This isn't a traditional code project. It's an AI system that demonstrates how to architect workflows for AI agents. The master data structure enables intelligent filtering, the prompt templates ensure consistent behavior, and the entire workflow is reproducible and extensible."

## Current Session Context

### Phase 1 Complete ✅

**All Tasks Completed:**
- ✅ Task 1.0: Setup GitHub Repository and Version Control [GLUE]
- ✅ Task 2.0: Create Master Resume Data Structure [CORE]
- ✅ Task 3.0: Create Prompt Template System [CORE]
- ✅ Task 4.0: Generate AI Residency Resume [GLUE]
- ✅ Task 5.0: Create Project Documentation [GLUE]
- ✅ Task 6.0: Deploy to GitHub Pages [GLUE]

**Deliverables:**
- ✅ GitHub repository: https://github.com/solosza/resume-ai-pipeline
- ✅ Master data structure: `resume-master.md`
- ✅ Prompt template: `prompts/generate-resume.md`
- ✅ AI Residency resume: `resumes/ai-residency.html`
- ✅ Deployed resume: https://solosza.github.io/resume-ai-pipeline/resumes/ai-residency.html
- ✅ Complete documentation: `README.md`
- ✅ Process documentation: `docs/phase1/`

**All Functional Requirements Satisfied:**
- ✅ FR-1: Master Data Structure
- ✅ FR-2: Prompt Templates
- ✅ FR-3: Job Description Analysis
- ✅ FR-4: Content Selection Logic
- ✅ FR-5: HTML Resume Generation
- ✅ FR-6: Git Automation
- ✅ FR-7: Documentation

**All PRD Acceptance Tests Passed:**
- ✅ AT-1 through AT-10 (all passing)

**Success Metrics Achieved:**
- ✅ AI Residency resume generated and deployed
- ✅ Sub-5-minute generation time achieved
- ✅ Mobile-responsive and print-friendly
- ✅ Reusable system architecture established
- ✅ Complete documentation for future use
- ✅ Portfolio-ready project demonstrating AI system design

### Production Ready
**Deployed URL:** https://solosza.github.io/resume-ai-pipeline/resumes/ai-residency.html
**Status:** Ready for AI Residency application submission

### Next Phase
Phase 2 (Job Site Scraper Integration) - Planned for future

## Error & Issue Log

**Purpose:** Track errors, blockers, and issues encountered during development with resolution details.

**Format:**
```
### [ERROR-XXX] Brief Error Description
**Date:** YYYY-MM-DD
**Task:** Task X.X - Task name
**Error:** Full error message or description
**Context:** What was being attempted when error occurred
**Attempted Fixes:**
1. First thing tried - Result
2. Second thing tried - Result
**Solution:** How it was ultimately resolved
**Status:** OPEN | RESOLVED | BLOCKED
**Prevention:** How to avoid this in future
```

### Active Issues:
(None currently)

### Resolved Issues:
(None yet)

## For Future Sessions

### When resuming this project:
1. Read this file (`CLAUDE.md`) first for complete context
2. Check current phase status and todos
3. Review the appropriate process doc:
   - If creating PRD → read `docs/create-prd-v2.md`
   - If generating tasks → read `docs/generate-tasks-v2.md`
   - If implementing → read `docs/process-task-list-v2.md`
4. Continue where left off

### Key Principles:
- Stay focused on current phase (no jumping ahead)
- Follow 3-part process strictly (PRD → Tasks → Implementation)
- One sub-task at a time (get approval before moving forward)
- Document everything (the process IS the portfolio)
- Update both TodoWrite tool AND markdown task files
- Commit only when parent task is complete

### Handoff Protocol:
If token usage reaches 50-60%, create `docs/phase1/context-handoff.md` with:
- Current subtask in progress
- Completed subtasks (marked [x])
- Pending subtasks
- Relevant file paths
- Any blockers or decisions needed

## Future Enhancements / Backlog

**Priority: LOW - Post-Phase 1 iterations**

### Architectural Decision: Direct Claude Code vs Agents

**Decision:** Use Claude Code directly for resume generation (current implementation)

**Rationale:**
- **Token efficiency:** Direct execution has no agent invocation overhead
- **Simplicity:** Single-step workflow, easier to debug and maintain
- **Speed:** Already achieving sub-5-minute generation time
- **Current scale:** Generating 1 resume at a time is the primary use case

**When to introduce Claude Code agents (Task tool):**
- **Phase 2+**: Batch generation (10+ resumes from scraped jobs in parallel)
- **Concurrent generation**: Multiple resume variants needed simultaneously
- **Complex workflows**: Multi-step processes requiring state management between steps
- **Parallel processing**: When token usage benefits outweigh agent overhead

**Implementation if using agents:**
```python
# Example: Task tool usage for parallel resume generation
Task(
    subagent_type="general-purpose",
    description="Generate resume for JobX",
    prompt="Read resume-master.md and prompts/generate-resume.md. Generate resume for: [job description]"
)
```

**Current workflow (no agents):**
- Claude Code reads prompt template directly
- Executes 4-step workflow in single invocation
- Generates HTML and commits
- Simple, fast, token-efficient

**Status:** Architectural decision documented. Revisit in Phase 2 if batch generation is needed.

---

### Design Iteration (Inspired by Live Examples)

**Status:** Deferred until after Phase 1 deployment

**Inspiration Sources:**
- **Primary:** [Anmol Nemagouda's Portfolio](https://anmolnemagouda.github.io/) - Modern, interactive, professional layout
  - Hero section with animations
  - Project cards with hover effects
  - Visual skills tags/badges
  - Contact section with form (integrate Formspree or EmailJS)
  - Smooth animations and transitions
- **Secondary:** [Maria Campbell's Resume](https://interglobalmedia.github.io/example-portfolio-site-github/resume.html) - Clean, traditional
- **Secondary:** [Junior Dev Resume](https://glemakk.github.io/github-my-resume/) - Simple, mobile-first

**Elements to Consider:**
- Hero section redesign with animation/interactivity
- Project cards instead of list (hover effects, better visual hierarchy)
- Skills section with badges/tags instead of lists
- Contact form integration (Formspree free tier: 50 submissions/month)
- Enhanced animations and transitions
- Better spacing and visual separation between sections

**Implementation Notes:**
- Keep HTML/CSS only (no build step)
- Maintain dark mode toggle functionality
- Ensure mobile responsive across all new components
- Keep print-friendly (forms hidden on print)

**When to Implement:**
- After Phase 1 completion and AI Residency application submitted
- Optional Phase 1.5 before Phase 2 (job scraping)
- Could be user-driven: generate multiple resume variants with different designs

---

## Questions for Alain

- [x] GitHub username for Pages deployment URL? → solosza
- [x] Custom domain for resumes (or use username.github.io)? → Use GitHub Pages default
- [ ] Which job applications to target after AI Residency?
- [x] CSS framework preference (custom/minimal/Tailwind)? → Custom/minimal (no framework)
- [ ] When to start Phase 2 (job scraping integration)?

---

**Last Updated:** 2025-01-07
**Current Phase:** Phase 1 - Complete ✅
**Status:** Production Ready
**Deployed URL:** https://solosza.github.io/resume-ai-pipeline/resumes/ai-residency.html
**Next Phase:** Phase 2 (Job Site Scraper Integration) - Future

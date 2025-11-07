# AI-Powered Resume Generation System

> Intelligent resume generation using Claude Code for job analysis and content optimization

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://solosza.github.io/resume-ai-pipeline/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Overview

This is an AI-powered resume generation system that analyzes job descriptions and creates optimized HTML resumes from a single master data source. Built using Claude Code as an intelligent agent, the system demonstrates practical AI workflow design, prompt engineering, and data-driven content selection.

**The Unique Angle:** This isn't just a resume generator—it's a demonstration of end-to-end AI system architecture. The value is in how the system is designed: structured master data enables AI reasoning, reusable prompt templates ensure consistent behavior, and the entire workflow is reproducible and extensible.

### Key Features

- **AI-Powered Analysis:** Analyzes job descriptions to identify role type, required skills, and technical focus
- **Intelligent Content Selection:** Uses tags and metadata to select relevant projects and experience
- **Multiple Bullet Variants:** Generates different emphases (AI-focused, technical, management) based on role
- **Modern Design:** Clean, responsive HTML with dark mode toggle and print-friendly layout
- **Fast Generation:** Sub-5-minute workflow from job description to deployed resume
- **GitHub Pages Ready:** Self-contained HTML files with embedded CSS

## Live Examples

- [AI Residency Resume](https://solosza.github.io/resume-ai-pipeline/resumes/ai-residency.html) - AI engineering focused
- *(More resume variants coming soon)*

## How It Works

```
Job Description → AI Analysis → Content Selection → HTML Generation → GitHub Pages
```

1. **Provide job description** - Paste job posting or requirements
2. **AI analyzes requirements** - Claude Code identifies role type, key skills, technical focus
3. **Selects relevant content** - Filters projects and experience based on tags and AI reasoning
4. **Generates optimized HTML** - Creates responsive resume with dark mode and proper emphasis
5. **Deploys to GitHub Pages** - Push to repository, automatically published

## Architecture

### Data-Driven AI Workflow

The system follows a **data-driven AI workflow** pattern where structured master data enables intelligent filtering and selection:

```
resume-master.md           →  Structured data with tags and metadata
     ↓
prompts/generate-resume.md →  Reusable prompt template
     ↓
Claude Code                →  AI agent for analysis and generation
     ↓
resumes/*.html             →  Optimized HTML resumes
```

### Key Components

**Data Layer (`/`)**
- `resume-master.md` - Single source of truth for all resume content
  - Projects with tags, descriptions, tech stacks, outcomes
  - Experience with multiple bullet variants (ai_focused, technical, management)
  - Skills categorized and tagged for filtering
  - AI generation guidelines for content selection

**Prompt Layer (`prompts/`)**
- `generate-resume.md` - Complete workflow template
  - Step 1: Job Description Analysis
  - Step 2: Content Selection (tag filtering, bullet variants, skill ordering)
  - Step 3: HTML Generation (structure, CSS, dark mode, responsive)
  - Step 4: Validation Checklist

**Output Layer (`resumes/`)**
- `*.html` - Generated resumes with embedded CSS
  - Mobile-responsive (375px, 768px, 1024px breakpoints)
  - Dark mode toggle with localStorage persistence
  - Print-friendly styles
  - Self-contained (no external dependencies)

**Documentation Layer (`docs/`)**
- `phase1/` - Phase 1 PRD, tasks, process documentation
- `create-prd-v2.md` - PRD generation process
- `generate-tasks-v2.md` - Task list generation process
- `process-task-list-v2.md` - Task execution process

## Project Structure

```
resume-ai-pipeline/
├── resume-master.md              # Master data (all resume content)
├── prompts/
│   └── generate-resume.md        # Reusable prompt template
├── resumes/
│   ├── ai-residency.html         # AI Residency resume
│   └── [job-name].html           # Additional resume variants
├── docs/
│   └── phase1/
│       ├── 0001-prd-ai-resume-generator.md
│       └── tasks-0001-prd-ai-resume-generator.md
├── CLAUDE.md                     # Project context for Claude Code
└── README.md                     # This file
```

## Usage

### Prerequisites

- GitHub account
- Claude Code CLI installed
- Git configured

### Generating a New Resume

1. **Gather job description** - Copy the full job posting or requirements

2. **Run Claude Code workflow:**
   ```bash
   # Claude Code will read:
   # - resume-master.md (master data)
   # - prompts/generate-resume.md (workflow template)
   # - Your job description input

   # Then generate: resumes/[job-name].html
   ```

3. **Review generated resume:**
   ```bash
   # Start local server
   cd resumes
   python -m http.server 8000

   # Open in browser
   # http://localhost:8000/[job-name].html
   ```

4. **Test functionality:**
   - Dark mode toggle (should persist on reload)
   - Mobile responsive (resize browser to 375px, 768px)
   - Print preview (Ctrl+P or Cmd+P)

5. **Deploy to GitHub Pages:**
   ```bash
   git add resumes/[job-name].html
   git commit -m "feat: Add [job-name] resume"
   git push
   ```

### Updating Master Data

Edit `resume-master.md` to:
- Add new projects
- Update experience bullets
- Add new skills
- Modify generation guidelines

All future resumes will automatically use the updated content.

## What This Demonstrates

This project showcases:

1. **AI System Design** - Data architecture that enables AI reasoning
2. **Prompt Engineering** - Reusable templates for consistent behavior
3. **Systems Thinking** - Designed for future phases (job scraping, auto-application)
4. **Producer Mindset** - Built a tool, not just experimented
5. **Practical AI Application** - Solves real problem with measurable outcomes
6. **AI-Assisted Development** - Built using Claude Code following structured workflow

### The Meta Story

"I used Claude Code to build an AI-powered resume generator while applying for an AI residency program. The project demonstrates AI system architecture through data structure design and prompt engineering—not just API integration. The value is in how I architected the workflow to enable intelligent, reproducible resume generation."

## Tech Stack

**Phase 1 (Current):**
- **AI Agent:** Claude Code
- **Data Format:** Markdown
- **Output Format:** HTML5 + CSS3 + JavaScript
- **Deployment:** GitHub Pages
- **Version Control:** Git/GitHub

**Phase 2 (Planned):**
- Python 3.8+
- Selenium 4.x (web scraping)
- Beautiful Soup 4
- SQLite (job tracking)

**Phase 3 (Planned):**
- Auto-application automation
- Application tracking analytics

## Roadmap

### Phase 1: Manual AI-Assisted Generation ✅ (Current)
- [x] Master data structure
- [x] Prompt template system
- [x] AI Residency resume generation
- [x] GitHub Pages deployment
- [ ] Design iteration (inspired by modern portfolio examples)

### Phase 2: Job Site Scraper Integration (Planned)
- [ ] Scrape LinkedIn, Indeed, Glassdoor for job postings
- [ ] Extract job descriptions automatically
- [ ] Store jobs in SQLite database
- [ ] Map generated resumes to job applications
- [ ] Reuse scraping patterns from existing projects

### Phase 3: Full Application Automation (Planned)
- [ ] Auto-fill application forms
- [ ] Submit applications programmatically
- [ ] Track application status
- [ ] Analytics: Which resume variants perform best
- [ ] Interview scheduling automation

## Development Process

This project follows a structured 3-part development process:

1. **PRD Generation** (`docs/create-prd-v2.md`) - Gather requirements and create detailed Product Requirements Document
2. **Task Generation** (`docs/generate-tasks-v2.md`) - Break down PRD into actionable task list with validation gates
3. **Task Execution** (`docs/process-task-list-v2.md`) - Execute tasks one at a time with validation and commit protocols

See `CLAUDE.md` for complete project context and development guidelines.

## Success Metrics

**Phase 1 Outcomes:**
- ✅ AI Residency resume generated and deployed
- ✅ Sub-5-minute generation time achieved
- ✅ Mobile-responsive and print-friendly
- ✅ Reusable system architecture established
- ✅ Complete documentation for future sessions

**Future Metrics:**
- Number of resume variants generated
- Time savings vs. manual customization
- Application response rates by resume type

## Contributing

This is a personal portfolio project, but the methodology and architecture are designed to be reusable. Feel free to:
- Fork the repository
- Adapt the master data structure for your own content
- Use the prompt templates for your own resume generation
- Reference the development process for your own AI projects

## License

MIT License - See [LICENSE](LICENSE) file for details

## Author

**Alain Ignacio**
- GitHub: [@solosza](https://github.com/solosza)
- LinkedIn: [alain-ignacio](https://www.linkedin.com/in/alain-ignacio-54b9823/)
- Location: Las Vegas, NV

## Acknowledgments

- Built using [Claude Code](https://claude.com/claude-code) by Anthropic
- Inspired by modern portfolio examples:
  - [Anmol Nemagouda's Portfolio](https://anmolnemagouda.github.io/) - Design inspiration for future iteration
  - [Maria Campbell's Resume](https://interglobalmedia.github.io/example-portfolio-site-github/resume.html)
  - [Junior Dev Resume](https://glemakk.github.io/github-my-resume/)

---

**Last Updated:** 2025-01-07
**Phase:** Phase 1 Complete
**Status:** Production Ready

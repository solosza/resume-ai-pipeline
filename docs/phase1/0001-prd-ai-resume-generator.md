# Product Requirements Document: AI-Powered Resume Generation System (Phase 1)

**PRD ID:** 0001
**Feature Name:** AI-Powered Resume Generation System
**Phase:** 1 - Manual AI-Assisted Resume Generator
**Author:** Alain Ignacio
**Created:** 2025-01-06
**Status:** Draft

---

## Introduction/Overview

This project creates an AI-powered resume generation system that uses Claude Code as an intelligent agent to analyze job descriptions and generate optimized HTML resumes from a master data source. The system solves the problem of manually creating multiple resume versions tailored to different job types while serving as a portfolio project that demonstrates AI engineering skills, prompt engineering, and practical AI workflow design.

**Core Problem:**
Manually customizing resumes for different job applications is time-consuming, inconsistent, and difficult to optimize for specific role requirements. Job seekers need multiple resume variants (AI engineer, QA engineer, full-stack, etc.) but maintaining separate versions leads to content drift and update overhead.

**The Solution:**
Design an AI-assisted workflow where Claude Code acts as an intelligent agent that reads structured master resume data, analyzes job requirements, selects relevant content based on tags and AI reasoning, and generates optimized HTML resumes ready for deployment to GitHub Pages.

**Why This Approach:**
Instead of building traditional code that calls AI APIs, this system demonstrates AI workflow architecture through data structure design, prompt engineering, and process methodology. The project value is in the system design, not just the code output.

---

## Goals

1. **Primary Goal:** Enable rapid generation of optimized resume variants from a single master data source, reducing resume creation time from hours to minutes.

2. **Portfolio Goal:** Create a demonstrable AI engineering project that showcases system design thinking, prompt engineering, and practical AI application (specifically for AI Residency application and future opportunities).

3. **Process Goal:** Establish a reusable, documented methodology that others can adopt for their own AI-assisted resume generation.

4. **Immediate Deliverable:** Generate and deploy an AI Residency-optimized resume to GitHub Pages within Phase 1 completion.

5. **Extensibility Goal:** Design the data architecture and workflow to support future phases (job site scraping, auto-application) without requiring Phase 1 rework.

---

## User Stories

### Primary User: Alain Ignacio (Job Applicant)

**US-1:** As a job applicant, I want to store all my resume content in one place so that I don't have to maintain multiple diverging resume versions.

**US-2:** As a job applicant, I want to paste a job description and get an optimized resume in under 5 minutes so that I can quickly apply to opportunities without manual customization overhead.

**US-3:** As a job applicant, I want the system to intelligently select which projects and experience to emphasize based on job requirements so that my resume is tailored without me manually deciding what to include/exclude.

**US-4:** As a job applicant, I want the generated resume to be mobile-responsive and hosted on GitHub Pages so that I can share a clean URL instead of sending PDF attachments.

**US-5:** As a job applicant, I want the system to generate different emphasis for the same experience (e.g., technical vs. management bullets) based on role type so that I position myself appropriately.

### Secondary User: Future Resume System Users

**US-6:** As another developer, I want clear documentation of the system architecture and prompts so that I can adapt this methodology for my own resume generation.

**US-7:** As a portfolio reviewer, I want to see the Git history and documentation so that I can understand how the system was built and how it demonstrates AI engineering skills.

---

## Functional Requirements

### FR-1: Master Data Structure

**FR-1.1:** The system MUST store all resume content in a single `resume-master.md` file with the following sections:
- Personal Info (name, email, phone, location, GitHub, LinkedIn)
- Projects (title, tags, description, bullets, tech stack, outcomes)
- Experience (company, title, dates, tags, multiple bullet variants, location)
- Skills (categorized by type: ai_tools, programming, automation_platforms, etc.)

**FR-1.2:** All projects MUST include tags that enable filtering (e.g., `ai`, `automation`, `scraping`, `claude-code`, `python`).

**FR-1.3:** All experience entries MUST include multiple bullet variants with labels:
- `ai_focused` - Emphasizes AI tool usage and integration
- `technical` - Emphasizes hands-on coding and framework building
- `management` - Emphasizes team leadership and scaling

**FR-1.4:** The master data structure MUST be human-readable Markdown and AI-optimized (easy for LLMs to parse and filter).

### FR-2: Prompt Templates

**FR-2.1:** The system MUST include a reusable prompt template at `prompts/generate-resume.md` that guides Claude Code through:
- Reading the master data file
- Analyzing the provided job description
- Identifying key requirements, skills, and role type
- Filtering and ranking content by relevance
- Selecting appropriate bullet variants
- Generating optimized HTML

**FR-2.2:** The prompt template MUST be reusable across different job types without modification (all customization comes from the job description input).

### FR-3: Job Description Analysis

**FR-3.1:** Claude Code MUST analyze the provided job description to extract:
- Role type (ai_engineer, qa_engineer, full_stack, etc.)
- Key required skills (ranked by importance)
- Technical vs. managerial focus
- Specific technologies mentioned
- Company culture signals

**FR-3.2:** The analysis MUST inform content selection decisions (which projects to show, which bullet variants to use, skill ordering).

### FR-4: Content Selection Logic

**FR-4.1:** Claude Code MUST select 2-3 most relevant projects based on job analysis and project tags.

**FR-4.2:** Claude Code MUST choose the appropriate bullet variant for each experience entry based on role focus (technical vs. management).

**FR-4.3:** Claude Code MUST order skills by relevance to the job (AI tools first for AI roles, QA tools first for QA roles, etc.).

**FR-4.4:** Claude Code MUST limit experience section to 2-3 most recent/relevant roles to maintain resume brevity.

### FR-5: HTML Resume Generation

**FR-5.1:** The system MUST generate a complete HTML resume file with:
- Embedded CSS (no external dependencies)
- Mobile-responsive design (breakpoints for phone, tablet, desktop)
- Print-friendly styles
- Semantic HTML5 structure
- Clean, modern, developer-focused aesthetic

**FR-5.2:** Generated resumes MUST be saved to `resumes/[job-name].html` with descriptive filename (e.g., `ai-residency.html`, `senior-qa-engineer.html`).

**FR-5.3:** The HTML MUST include proper meta tags (title, description, viewport).

**FR-5.4:** Resume sections MUST appear in this order for AI-focused roles:
1. Header (name, contact, location, links)
2. About (2-3 sentence summary)
3. AI Projects (most prominent section)
4. Relevant Experience (condensed)
5. Technical Skills (AI-first ordering)

**FR-5.5:** Resume section order MUST be adaptable based on role type (e.g., QA roles may lead with Experience instead of Projects).

### FR-6: Git Automation

**FR-6.1:** After generating a resume, Claude Code MUST:
- Add the new file to Git staging
- Commit with descriptive message
- Push to GitHub repository

**FR-6.2:** Commit messages MUST follow conventional commit format:
```
feat: Add [resume-name] resume

- Role type: [role]
- Key emphasis: [emphasis areas]
- Sections included: [sections]
```

### FR-7: Documentation

**FR-7.1:** The system MUST include `README.md` with:
- Project overview and purpose
- Architecture explanation
- Usage instructions (how to generate a new resume)
- Example workflow
- Links to generated resume examples

**FR-7.2:** All phase documentation MUST be stored in `docs/phase1/` including:
- This PRD
- Task list (generated from this PRD)
- Context handoff notes (if needed)

---

## Non-Goals (Out of Scope for Phase 1)

**NG-1:** Job site scraping (LinkedIn, Indeed, etc.) - Moved to Phase 2

**NG-2:** Automated job discovery and description extraction - Moved to Phase 2

**NG-3:** Job-to-resume mapping database - Moved to Phase 2

**NG-4:** Auto-application form filling - Moved to Phase 3

**NG-5:** Application tracking and analytics - Moved to Phase 3

**NG-6:** PDF generation - HTML only for Phase 1

**NG-7:** Web interface for resume generation - CLI/manual workflow only

**NG-8:** Python CLI script - Phase 1 is pure Claude Code workflow

**NG-9:** Resume performance analytics (which versions get responses) - Moved to Phase 3

---

## Design Considerations

### Visual Design
- **Modern, clean, minimal aesthetic** (think GitHub profile, not LinkedIn)
- **Developer-focused** design language (code-friendly, not corporate)
- **Typography:** Clean sans-serif (system fonts: -apple-system, SF Pro, Segoe UI)
- **Color scheme:** Subtle, professional (blues/grays, high contrast for accessibility)
- **Spacing:** Generous whitespace for easy scanning
- **Mobile-first:** Must work perfectly on mobile devices

### Content Presentation
- **Projects section:** Most prominent for AI-focused roles (larger font, more detail)
- **Links:** Obvious and clickable (GitHub repos, portfolio, LinkedIn)
- **Sections:** Clear visual separation with headings
- **Bullet points:** Concise, outcome-focused (not just task lists)
- **No walls of text:** Break up content with proper spacing

### Accessibility
- Proper heading hierarchy (h1, h2, h3)
- Sufficient color contrast (WCAG AA minimum)
- Semantic HTML elements
- Print-friendly CSS media queries

---

## Technical Considerations

### Technology Stack
- **Data Format:** Markdown (`resume-master.md`)
- **AI Agent:** Claude Code (via Claude Code CLI)
- **Output Format:** HTML with embedded CSS
- **Version Control:** Git/GitHub
- **Deployment:** GitHub Pages
- **Future (Phase 2+):** Python, Selenium, Beautiful Soup (for scraping)

### Architecture Principles
1. **Single Source of Truth:** All content in `resume-master.md`
2. **Data-Driven:** Tags and metadata enable AI filtering, not hardcoded logic
3. **AI-Assisted Workflow:** Claude Code as intelligent agent, not API wrapper
4. **Prompt Engineering:** Reusable templates ensure consistent behavior
5. **Stateless Generation:** Each resume is independent (no complex state management)
6. **Git as State:** Version history tracks all resume generations

### Dependencies
- **Phase 1:** None (pure Claude Code + HTML/CSS)
- **Phase 2+:** Python 3.8+, Selenium, requests, Beautiful Soup (scraping)

### File Structure
```
github_resume/
├── CLAUDE.md                     # Project context for AI
├── resume-master.md              # Master data (to be created)
├── prompts/
│   └── generate-resume.md        # Prompt template
├── resumes/
│   ├── ai-residency.html         # Generated resume #1
│   └── [job-name].html           # Additional resumes
├── css/
│   └── resume-styles.css         # Optional: shared stylesheet
├── docs/
│   └── phase1/
│       ├── 0001-prd-ai-resume-generator.md   # This file
│       └── tasks-0001-prd-ai-resume-generator.md  # Task list
└── README.md                     # Public documentation
```

### Integration with Existing Projects
- **Project #2 (Zillow Scraper):** Phase 2 will reuse scraping patterns, POM architecture, config-driven design
- **Methodology Consistency:** Uses same 3-part development process (PRD → Tasks → Execution)

---

## Success Metrics

### Phase 1 Success Criteria:

**SM-1: Functional System**
- AI Residency resume successfully generated and deployed to GitHub Pages
- Resume is mobile-responsive and looks professional
- Resume accurately reflects master data and appropriate emphasis for AI role

**SM-2: Speed**
- New resume variant can be generated in under 5 minutes from job description input
- Process is reproducible (same input → same output quality)

**SM-3: Reusability**
- System documentation is clear enough for others to use
- Prompt templates are reusable without modification
- Master data structure is easy to update

**SM-4: Portfolio Value**
- GitHub repository demonstrates AI system design thinking
- Documentation shows methodology and architecture
- Git history shows progression and thoughtful commits

**SM-5: Immediate Application**
- AI Residency application submitted with GitHub Pages resume URL
- Resume meets all application requirements (content, format, accessibility)

### Measurement Methods:
- **Manual testing:** Generate AI Residency resume and verify all sections render correctly
- **Mobile testing:** Test on phone, tablet, desktop browsers
- **Speed test:** Time the resume generation workflow from job description paste to Git push
- **Usability test:** Another person reviews documentation and attempts to understand system

---

## Test Strategy (MVP)

### Unit Testing
**Scope:** Not applicable for Phase 1 (no Python logic to unit test)
**Phase 2+:** Will test job description parser, content filtering logic, tag matching

### Integration Testing
**Scope:** Manual verification of end-to-end workflow
**Test Cases:**
- Claude Code reads `resume-master.md` successfully
- Job description analysis produces expected role type and skills
- Content selection matches expected projects/bullets
- HTML generation produces valid, well-formed markup
- Git commit and push complete successfully

### End-to-End/Smoke Testing
**Scope:** Manual testing of complete workflow
**Test Process:**
1. Provide sample job description (AI Residency posting)
2. Execute Claude Code workflow
3. Verify generated HTML file exists
4. Open in browser and verify:
   - All sections render correctly
   - Mobile responsiveness works
   - Print layout is clean
   - Links are clickable
5. Verify Git commit created and pushed

### Tools
- **Browser DevTools:** Test responsiveness and inspect HTML/CSS
- **Git log:** Verify commits
- **GitHub Pages:** Verify deployment

### Test Data/Fixtures
- **Sample job descriptions:** AI Residency, Senior QA Engineer, ML Engineer
- **Expected outputs:** Reference HTML for visual comparison
- **Master data:** `resume-master.md` with complete Alain's resume content

### Test Location
- Manual testing checklist in `docs/phase1/testing-checklist.md` (to be created)

---

## Acceptance Tests

**AT-1: Master Data Structure**
- GIVEN `resume-master.md` exists with all required sections
- WHEN Claude Code reads the file
- THEN all projects, experience, and skills are accessible

**AT-2: Job Analysis**
- GIVEN a job description for "AI Residency Program"
- WHEN Claude Code analyzes the description
- THEN it identifies role_type as "ai_engineer" and key skills include ["claude-code", "prompt-engineering", "python", "ai-agents"]

**AT-3: Project Selection**
- GIVEN job analysis identifies role_type as "ai_engineer"
- WHEN Claude Code selects projects
- THEN it includes "Multi-Phase AI Agent System" and "AI-Powered Resume Generator" (this project)

**AT-4: Bullet Variant Selection**
- GIVEN job analysis shows high technical_focus score
- WHEN Claude Code selects experience bullets for Helios Digital
- THEN it uses "technical" and "ai_focused" variants, not "management" variants

**AT-5: HTML Generation**
- GIVEN content selection is complete
- WHEN Claude Code generates HTML
- THEN the file contains valid HTML5 with embedded CSS and mobile viewport meta tag

**AT-6: Responsive Design**
- GIVEN generated HTML resume
- WHEN viewed on mobile device (375px width)
- THEN all content is readable without horizontal scrolling

**AT-7: Section Ordering**
- GIVEN an AI-focused role
- WHEN resume is generated
- THEN section order is: Header → About → Projects → Experience → Skills

**AT-8: Git Automation**
- GIVEN a resume has been generated
- WHEN Claude Code executes Git commands
- THEN a new commit appears with conventional commit message format

**AT-9: GitHub Pages Deployment**
- GIVEN resume is committed and pushed
- WHEN GitHub Pages builds
- THEN resume is accessible at `https://[username].github.io/github_resume/resumes/ai-residency.html`

**AT-10: Reusability**
- GIVEN a different job description (Senior QA Engineer)
- WHEN the same workflow is executed
- THEN a new optimized resume is generated with appropriate QA emphasis

---

## Non-Functional SLAs

### Performance
- **Resume generation time:** < 5 minutes end-to-end (from job description input to Git push)
- **HTML file size:** < 100KB (embedded CSS, no images except potential headshot)
- **Page load time:** < 2 seconds on 3G connection

### Reliability
- **Content consistency:** Same input job description → same content selection
- **HTML validity:** All generated HTML passes W3C validator
- **Git operations:** 100% success rate (no failed commits/pushes)

### Usability
- **Mobile readability:** All text minimum 14px on mobile
- **Print quality:** Resume fits on 1-2 pages when printed
- **Accessibility:** WCAG AA compliance minimum

### Maintainability
- **Master data updates:** Single source of truth, update once affects all future resumes
- **Prompt template updates:** Changes to workflow require only prompt template edits
- **Documentation:** README explains usage in under 5 minutes of reading

---

## Observability/Telemetry

### Logging
- **Phase 1:** Manual observation (no automated logging)
- **Git history:** Tracks all resume generations (commit messages show job type)
- **File system:** `resumes/` folder shows all generated variants

### Metrics (Manual Tracking)
- **Resumes generated:** Count of files in `resumes/` folder
- **Generation time:** Manually timed per resume
- **Success rate:** Percentage of resumes that deploy successfully

### Future Telemetry (Phase 3)
- Application tracking: Which resumes lead to interviews
- Performance analytics: Which content selections correlate with success

---

## Security & Privacy

### Threats/Abuse Cases
- **No security threats in Phase 1** (static site generation, no user input handling)
- **Privacy:** Resume content is public (hosted on GitHub Pages)
- **PII handling:** Email, phone in resume are intentionally public

### Secrets Policy
- **No secrets in repo:** No API keys required for Phase 1
- **Phase 2+:** Job site credentials stored in environment variables, never committed

### Data Handling Constraints
- **Resume content:** All data is intentionally public (portfolio piece)
- **Git history:** All commits are public (demonstrates development process)

---

## Rollout & Rollback

### Feature Flags
- **Not applicable for Phase 1** (no runtime feature toggling needed)

### Rollout Plan
1. **Development:** Build on main branch (no feature branch needed for solo project)
2. **Testing:** Manual testing of generated resumes
3. **Deployment:** Push to GitHub, enable GitHub Pages
4. **Verification:** Access live URL and verify rendering

### Rollback Plan
- **Simple rollback:** Git revert to previous commit
- **Smoke test:** Open previous resume version and verify it still renders correctly

---

## Open Questions

**OQ-1:** Should we include a profile photo in the resume HTML?
**Status:** ANSWERED - No profile photo

**OQ-2:** What is the GitHub username for Pages deployment URL?
**Status:** ANSWERED - solosza
**Deployment URL:** `https://solosza.github.io/github_resume/resumes/[resume-name].html`

**OQ-3:** Should we include a shared `css/resume-styles.css` or keep CSS embedded in each HTML file?
**Status:** ANSWERED - Embedded CSS (no external dependencies, single self-contained files)

**OQ-4:** Do we want a dark mode toggle for resumes?
**Status:** ANSWERED - Yes, include dark mode toggle

**OQ-5:** Should experience section include all 4 roles (IBM, HMSA, Nakupuna, Helios) or limit to most recent 2-3?
**Status:** ANSWERED - Master data includes all 4 roles, Claude Code selects 2-3 based on role type (AI roles show fewer, traditional QA roles show more)

---

## Phase 2/3 Roadmap (Non-Goals for Phase 1)

### Phase 2: Job Site Scraper Integration
- Scrape LinkedIn, Indeed, Glassdoor for job postings
- Extract job descriptions automatically
- Store jobs in SQLite database
- Map generated resumes to job applications
- Reuse scraping patterns from Project #2 (Zillow scraper)

### Phase 3: Full Application Automation
- Auto-fill application forms (reuse Selenium techniques)
- Submit applications programmatically
- Track application status
- Analytics: Which resume variants perform best
- Interview scheduling automation

**Architecture Note:** Phase 1 data structure is designed to support these future phases without refactoring.

---

## Definition of Ready (Checklist)

Before proceeding to task generation:
- [x] PRD includes Test Strategy
- [x] PRD includes at least 5 Acceptance Tests (has 10)
- [x] PRD includes Non-Functional SLAs
- [x] PRD includes Observability/Telemetry section
- [x] PRD includes Security & Privacy notes
- [x] PRD includes Rollout/Rollback outline
- [x] All functional requirements are clear and actionable
- [x] Non-goals are explicitly stated
- [x] Open questions are documented

**Status:** READY for task generation

---

**Approval:**
[ ] Alain Ignacio - Product Owner
[ ] Claude Code - Implementation Agent

**Next Step:** Generate `tasks-0001-prd-ai-resume-generator.md`

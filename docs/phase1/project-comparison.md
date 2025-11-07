# GitHub Project Comparison: Build vs. Repurpose

**Date:** 2025-01-06
**Purpose:** Evaluate existing similar projects to determine if we should build from scratch or repurpose

---

## Top 3 Similar Projects

### 1. claude-code-job-tailor (javiera-vasquez)
**URL:** https://github.com/javiera-vasquez/claude-code-job-tailor

#### What It Does:
AI resume optimization system for Claude Code. Analyzes job postings, ranks requirements by priority, automatically selects your most relevant achievements. Write experience once in YAML, generate unlimited tailored PDFs in under 60 seconds.

#### Tech Stack:
- **Runtime:** Bun JavaScript runtime
- **Language:** TypeScript (99.2%)
- **PDF:** React-PDF library
- **UI:** Tailwind CSS, Primer React, Vite
- **Data:** YAML with Zod schema validation

#### Key Features:
- ✅ 3 specialized AI agents (job analysis, workflow coordination, generation)
- ✅ Claude Code integration via slash commands (`/tailor`, `/generate-pdf`)
- ✅ Weighted skill matching (1-10 importance ranking)
- ✅ Live browser preview with real-time Claude conversation
- ✅ 2 professional templates (modern, classic)
- ✅ YAML validation with error messages

#### Data Format:
```yaml
# resume-data/sources/resume.yaml
name: "Your Name"
experience:
  - company: "Company"
    achievements:
      - "Achievement 1"
      - "Achievement 2"
```

#### Output:
- **PDFs** in `resume-data/tailor/[company]/`
- Generated files: `metadata.yaml`, `job_analysis.yaml`, `resume.yaml`, `cover_letter.yaml`

#### What It's Missing:
- ❌ No job scraping
- ❌ No HTML output
- ❌ No GitHub Pages deployment
- ❌ PDF only (not HTML)

#### License:
**CC BY-NC 4.0 (Non-Commercial Only)** - Can't use commercially without permission

#### Maintenance:
- 368 commits, actively maintained
- 38 stars, 3 forks
- Recent updates (still early-stage)

---

### 2. resume-tailoring-skill (varunr89)
**URL:** https://github.com/varunr89/resume-tailoring-skill

#### What It Does:
Claude Code **SKILL** (not standalone app) that generates tailored resumes optimized for specific job descriptions while maintaining factual integrity. Includes multi-job batch processing.

#### Tech Stack:
- **Type:** Claude Code Skill (markdown file `SKILL.md`)
- **Language:** Skill definition (no code)
- **Data:** Markdown files in `~/resumes/`
- **Optional:** WebSearch plugin, document-skills plugin for DOCX/PDF

#### Key Features:
- ✅ Multi-job batch processing (3-5 similar jobs, 11-27% faster)
- ✅ Deep company/role research via WebSearch
- ✅ Conversational experience discovery (branching questions)
- ✅ Confidence-scored content matching
- ✅ Multi-format output (markdown, DOCX, PDF, interview prep reports)
- ✅ Self-improving library (grows with each resume)
- ✅ Truth-preserving (never fabricates experience)

#### Data Format:
```markdown
# ~/resumes/your-resume.md
## Experience
**Company Name** | Role | Dates
- Achievement 1
- Achievement 2
```

#### Output:
- Markdown
- ATS-friendly DOCX
- Print-ready PDF
- Interview preparation reports

#### What It's Missing:
- ❌ No job scraping
- ❌ No HTML output for web hosting
- ❌ No GitHub Pages integration
- ❌ Requires manual job description input

#### License:
**MIT License** - Fully open, commercial use allowed

#### Maintenance:
- 32 commits, recent activity (Nov 2024)
- Comprehensive documentation
- Active development

---

### 3. AI Resume Job Matching (Firecrawl + Claude)
**URL:** https://www.firecrawl.dev/blog/ai-resume-parser-job-matcher-python

#### What It Does:
Automated job matching system. Scrapes job boards, parses resumes, uses Claude AI to evaluate matches, sends Discord notifications.

#### Tech Stack:
- **Scraping:** Firecrawl (AI-powered web scraping)
- **AI:** Claude 3.5 Sonnet via LangChain
- **Database:** Supabase (PostgreSQL)
- **Notifications:** Discord webhooks
- **UI:** Streamlit
- **Automation:** GitHub Actions (scheduled runs)

#### Key Features:
- ✅ **Automated job scraping** (this is what we need for Phase 2!)
- ✅ Claude AI for intelligent matching
- ✅ Scheduled automation via GitHub Actions
- ✅ Discord notifications for matches
- ✅ Supabase persistence
- ✅ Parallel job processing

#### Data Format:
- Pydantic schemas for structured extraction
- PostgreSQL database storage

#### Output:
- Match notifications (not resume generation)
- Boolean match decisions + reasoning

#### What It's Missing:
- ❌ No resume generation (only matching)
- ❌ No tailored resume output
- ❌ Focused on matching, not resume creation

#### License:
Open source (full GitHub repo available)

#### Maintenance:
Active tutorial with complete implementation

---

## Comparison Matrix

| Feature | Your Plan | claude-code-job-tailor | resume-tailoring-skill | Firecrawl + Claude |
|---------|-----------|------------------------|------------------------|-------------------|
| **Claude Code Integration** | ✅ Agent | ✅ Slash commands | ✅ Skill file | ❌ API only |
| **Job Scraping** | ✅ Phase 2 | ❌ | ❌ | ✅ **YES** |
| **HTML Output** | ✅ GitHub Pages | ❌ PDF only | ❌ Markdown/DOCX | ❌ Notifications |
| **Master Data Format** | Markdown | YAML | Markdown | N/A |
| **Dark Mode** | ✅ | ❌ | ❌ | N/A |
| **Auto-Application** | ✅ Phase 3 | ❌ | ❌ | ❌ |
| **Multi-Phase Architecture** | ✅ | ❌ | ❌ | ❌ |
| **Commercial License** | ✅ | ❌ NC only | ✅ MIT | ✅ |
| **Your Zillow Scraper Integration** | ✅ | ❌ | ❌ | Possible |
| **Portfolio Narrative** | ✅ AI Residency | Generic | Generic | Job matching |
| **Active Maintenance** | You | Active | Active | Tutorial |

---

## Analysis: Should We Repurpose or Build?

### Option A: Fork claude-code-job-tailor
**Pros:**
- Most feature-complete starting point
- Already has AI agents and Claude Code integration
- Weighted skill matching is sophisticated
- Live preview is nice UX

**Cons:**
- **DEALBREAKER:** Non-commercial license (CC BY-NC 4.0)
- TypeScript/Bun stack (you work in Python)
- PDF output (you want HTML)
- No job scraping (would need to add Phase 2 anyway)
- Heavy refactoring needed to match your vision

**Verdict:** License restriction is a dealbreaker. You can't use this commercially or repurpose it freely.

---

### Option B: Use resume-tailoring-skill as a Claude Code Skill
**Pros:**
- MIT license (fully open)
- Already a Claude Code skill (fits your workflow)
- Markdown data format (similar to your plan)
- Multi-job batch processing (valuable feature)
- Truth-preserving approach aligns with your values

**Cons:**
- No HTML output (markdown/DOCX/PDF only)
- No job scraping
- No GitHub Pages integration
- Would need significant extension for your Phase 2/3 vision
- Skill format may limit customization

**Verdict:** Good starting inspiration, but doesn't save much work. You'd still build most of Phase 1 from scratch.

---

### Option C: Integrate Firecrawl Job Scraper for Phase 2
**Pros:**
- **Solves Phase 2 job scraping** (exactly what you need!)
- Proven architecture (Firecrawl + Claude + Supabase)
- Automated scheduling via GitHub Actions
- Already handles job parsing and matching

**Cons:**
- Doesn't help with Phase 1 (resume generation)
- Would need to connect to your resume system
- Adds new dependencies (Firecrawl subscription, Supabase)

**Verdict:** **Strong candidate for Phase 2 integration**, but doesn't help with Phase 1.

---

### Option D: Build From Scratch (Your Original Plan)
**Pros:**
- **100% control** over architecture and features
- **Perfect fit** for your vision (HTML, GitHub Pages, dark mode)
- **Integrates with your existing Project #2** (Zillow scraper patterns)
- **Portfolio narrative** tailored to AI Residency application
- **MIT/open license** (commercial use allowed)
- **Demonstrates AI system design** (not just using existing tool)
- **Phase 1 → 2 → 3 architecture** designed from start
- **Python stack** matches your existing work
- **Simple Phase 1** (pure Claude Code workflow, no complex dependencies)

**Cons:**
- More initial work (but Phase 1 is simple)
- Can't leverage existing UI/templates (but you want custom anyway)

**Verdict:** **Best fit for your goals** given license restrictions, tech stack preferences, and portfolio narrative.

---

## Recommendation

### Build from scratch, BUT steal these ideas:

#### From claude-code-job-tailor:
- ✅ Weighted skill matching (1-10 importance)
- ✅ Slash command interface (`/tailor` for resume generation)
- ✅ YAML validation patterns (adapt for Markdown)
- ✅ Multi-agent approach (job analyzer, content selector, generator)

#### From resume-tailoring-skill:
- ✅ Multi-job batch processing concept
- ✅ Confidence-scored content matching
- ✅ Conversational experience discovery (branching questions)
- ✅ Truth-preserving philosophy (never fabricate)
- ✅ Self-improving library concept

#### From Firecrawl + Claude:
- ✅ **USE THIS FOR PHASE 2** job scraping architecture
- ✅ Scheduled automation via GitHub Actions
- ✅ Pydantic schemas for structured extraction
- ✅ Parallel job processing patterns

---

## Final Verdict: Build Phase 1, Integrate Phase 2

### Phase 1 (Build from Scratch):
**Why:**
- No existing project matches your HTML + GitHub Pages + dark mode + Python requirements
- License restrictions prevent repurposing the closest match
- Phase 1 is simple (pure Claude Code workflow, no code)
- Portfolio narrative requires your custom architecture

**What to Build:**
- Master data in Markdown (`resume-master.md`)
- Prompt templates for Claude Code
- HTML generation with dark mode toggle
- GitHub Pages deployment

**Time Saved by Not Forking:** Minimal. Adapting TypeScript/PDF to Python/HTML takes as long as building.

---

### Phase 2 (Integrate Existing):
**Why:**
- Firecrawl + Claude architecture solves job scraping perfectly
- Don't reinvent job board scraping (Firecrawl handles anti-bot, rate limits, etc.)
- Can integrate with your existing Zillow scraper patterns

**What to Integrate:**
1. **Use Firecrawl API** for job scraping (or your Zillow scraper patterns)
2. **Adapt their job matching logic** to feed your resume generator
3. **Keep your resume generation** (Phase 1 output)
4. **Add their scheduling** (GitHub Actions automation)

**Architecture:**
```
[Firecrawl/Your Scraper] → Job Database → Claude Analysis → Your Resume Generator → HTML Output
```

---

## Action Plan

### Immediate (Phase 1):
1. ✅ Proceed with original PRD
2. ✅ Build master data structure (Markdown)
3. ✅ Create prompt templates
4. ✅ Generate HTML with dark mode
5. ✅ Deploy to GitHub Pages

### Future (Phase 2):
1. Evaluate Firecrawl vs. your Zillow scraper for job scraping
2. Adapt their job storage and matching patterns
3. Connect to your Phase 1 resume generator
4. Add GitHub Actions scheduling

### Steal These Concepts:
- Weighted skill matching (claude-code-job-tailor)
- Multi-job batch processing (resume-tailoring-skill)
- Confidence scoring (resume-tailoring-skill)
- Firecrawl architecture (Firecrawl + Claude)

---

## Bottom Line

**None of the existing projects match your unique combination:**
- Claude Code as agent (not API wrapper)
- HTML output for GitHub Pages (not PDF)
- Dark mode toggle
- Multi-phase architecture (scrape → generate → apply)
- Integration with your existing Zillow scraper
- Portfolio narrative for AI Residency

**Build Phase 1 from scratch. Integrate proven patterns for Phase 2.**

Your original plan is the right call. The existing projects provide inspiration and validation (others see value in AI resume tools), but don't save significant implementation time given your specific requirements.

**Proceed with the PRD as written.**

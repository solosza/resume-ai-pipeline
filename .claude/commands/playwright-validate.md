# /playwright-validate

Check Playwright work against protocol.

## Instructions

Invoke `/kernel/validate` with domain: playwright

Validates:
- [ ] `headless: false` in playwright.config.ts
- [ ] All pages extend `BasePage`
- [ ] Tests use fixtures
- [ ] No hard-coded credentials
- [ ] Naming conventions followed

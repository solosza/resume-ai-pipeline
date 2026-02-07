import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  // Locators
  private getWelcomeMessage() {
    return this.page.locator('#leftPanel .smallText');
  }

  private getAccountsOverview() {
    return this.page.locator('h1.title').filter({ hasText: 'Accounts Overview' });
  }

  private getLogoutLink() {
    return this.page.locator('a[href*="logout"]');
  }

  // Actions
  async logout(): Promise<void> {
    await this.getLogoutLink().click();
  }

  // State checks (for test assertions)
  getWelcomeMessageLocator() {
    return this.getWelcomeMessage();
  }

  getAccountsOverviewLocator() {
    return this.getAccountsOverview();
  }

  getLogoutLinkLocator() {
    return this.getLogoutLink();
  }
}

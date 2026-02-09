import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class AccountsOverviewPage extends BasePage {
  // ParaBank accounts overview selectors
  readonly accountsTable: Locator = this.page.locator('#accountTable');
  readonly accountLinks: Locator = this.page.locator('#accountTable a');
  readonly totalBalance: Locator = this.page.locator('#accountTable tbody tr:last-child td:nth-child(2)');
  readonly welcomeMessage: Locator = this.page.locator('.smallText');

  // Navigation links
  readonly openNewAccountLink: Locator = this.page.locator('a[href*="openaccount"]');
  readonly transferFundsLink: Locator = this.page.locator('a[href*="transfer"]');
  readonly accountsOverviewLink: Locator = this.page.locator('a[href*="overview"]');

  async navigate(): Promise<void> {
    await super.navigate('overview.htm');
  }

  async getFirstAccountId(): Promise<string> {
    const firstAccount = this.accountLinks.first();
    const accountId = await firstAccount.textContent();
    return accountId?.trim() || '';
  }

  async goToOpenNewAccount(): Promise<void> {
    await this.openNewAccountLink.click();
  }

  async goToTransferFunds(): Promise<void> {
    await this.transferFundsLink.click();
  }
}

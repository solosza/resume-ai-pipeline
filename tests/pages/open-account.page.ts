import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class OpenAccountPage extends BasePage {
  // ParaBank open account selectors
  readonly accountTypeSelect: Locator = this.page.locator('#type');
  readonly fromAccountSelect: Locator = this.page.locator('#fromAccountId');
  readonly openAccountButton: Locator = this.page.locator('input[value="Open New Account"]');
  readonly newAccountId: Locator = this.page.locator('#newAccountId');
  readonly successMessage: Locator = this.page.locator('#openAccountResult h1');

  async navigate(): Promise<void> {
    await super.navigate('openaccount.htm');
  }

  async selectAccountType(type: 'CHECKING' | 'SAVINGS'): Promise<void> {
    await this.accountTypeSelect.selectOption(type);
  }

  async selectFromAccount(accountIndex: number = 0): Promise<void> {
    // Wait for accounts to load
    await this.fromAccountSelect.waitFor({ state: 'visible' });
    const options = this.fromAccountSelect.locator('option');
    await options.nth(accountIndex).waitFor({ state: 'attached' });
    const value = await options.nth(accountIndex).getAttribute('value');
    if (value) {
      await this.fromAccountSelect.selectOption(value);
    }
  }

  async openNewAccount(): Promise<void> {
    await this.openAccountButton.click();
  }

  async getNewAccountId(): Promise<string> {
    await this.newAccountId.waitFor({ state: 'visible' });
    const accountId = await this.newAccountId.textContent();
    return accountId?.trim() || '';
  }
}

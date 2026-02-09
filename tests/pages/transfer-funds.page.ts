import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class TransferFundsPage extends BasePage {
  // ParaBank transfer funds selectors
  readonly amountInput: Locator = this.page.locator('#amount');
  readonly fromAccountSelect: Locator = this.page.locator('#fromAccountId');
  readonly toAccountSelect: Locator = this.page.locator('#toAccountId');
  readonly transferButton: Locator = this.page.locator('input[value="Transfer"]');
  readonly successMessage: Locator = this.page.locator('#showResult h1');
  readonly transferComplete: Locator = this.page.locator('#showResult p');

  async navigate(): Promise<void> {
    await super.navigate('transfer.htm');
  }

  async enterAmount(amount: string): Promise<void> {
    await this.amountInput.fill(amount);
  }

  async selectFromAccount(accountId: string): Promise<void> {
    await this.fromAccountSelect.waitFor({ state: 'visible' });
    await this.fromAccountSelect.selectOption(accountId);
  }

  async selectToAccount(accountId: string): Promise<void> {
    await this.toAccountSelect.waitFor({ state: 'visible' });
    await this.toAccountSelect.selectOption(accountId);
  }

  async transfer(): Promise<void> {
    await this.transferButton.click();
  }

  async transferFunds(amount: string, fromAccountId: string, toAccountId: string): Promise<void> {
    await this.enterAmount(amount);
    await this.selectFromAccount(fromAccountId);
    await this.selectToAccount(toAccountId);
    await this.transfer();
  }
}

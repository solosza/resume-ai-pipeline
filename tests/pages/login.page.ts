import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  // ParaBank login form selectors (in left panel)
  readonly usernameInput: Locator = this.page.locator('input[name="username"]');
  readonly passwordInput: Locator = this.page.locator('input[name="password"]');
  readonly loginButton: Locator = this.page.locator('input[value="Log In"]');
  readonly errorMessage: Locator = this.page.locator('.error');

  async navigate(): Promise<void> {
    await super.navigate('index.htm');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

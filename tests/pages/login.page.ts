import { Page } from '@playwright/test';
import { HomePage } from './home.page';

export class LoginPage {
  constructor(private page: Page) {}

  // Locators
  private getUsernameInput() {
    return this.page.locator('input[name="username"]');
  }

  private getPasswordInput() {
    return this.page.locator('input[name="password"]');
  }

  private getLoginButton() {
    return this.page.locator('input[value="Log In"]');
  }

  private getErrorMessage() {
    return this.page.locator('.error');
  }

  private getErrorTitle() {
    return this.page.locator('h1.title').filter({ hasText: 'Error' });
  }

  // Actions
  async navigate(): Promise<this> {
    await this.page.goto('/parabank/index.htm');
    return this;
  }

  async fillCredentials(username: string, password: string): Promise<this> {
    await this.getUsernameInput().fill(username);
    await this.getPasswordInput().fill(password);
    return this;
  }

  async clickLogin(): Promise<HomePage> {
    await this.getLoginButton().click();
    return new HomePage(this.page);
  }

  async login(username: string, password: string): Promise<HomePage> {
    await this.fillCredentials(username, password);
    return this.clickLogin();
  }

  // State checks (for test assertions)
  getUsernameInputLocator() {
    return this.getUsernameInput();
  }

  getErrorMessageLocator() {
    return this.getErrorMessage();
  }

  getErrorTitleLocator() {
    return this.getErrorTitle();
  }
}

import { test as base } from '@playwright/test';
import { LoginPage, HomePage } from '../pages';

type Pages = {
  loginPage: LoginPage;
  homePage: HomePage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page, context }, use) => {
    // Clear cookies for test isolation
    await context.clearCookies();
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { expect } from '@playwright/test';

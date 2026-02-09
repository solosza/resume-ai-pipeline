import { test as base } from '@playwright/test';
import {
  LoginPage,
  AccountsOverviewPage,
  OpenAccountPage,
  TransferFundsPage
} from '../pages';

type Fixtures = {
  loginPage: LoginPage;
  accountsOverviewPage: AccountsOverviewPage;
  openAccountPage: OpenAccountPage;
  transferFundsPage: TransferFundsPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountsOverviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },
  openAccountPage: async ({ page }, use) => {
    await use(new OpenAccountPage(page));
  },
  transferFundsPage: async ({ page }, use) => {
    await use(new TransferFundsPage(page));
  },
});

export { expect } from '@playwright/test';

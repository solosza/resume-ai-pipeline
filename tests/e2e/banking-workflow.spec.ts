import { test, expect } from '../fixtures';

/**
 * Language-Based Test Requirements:
 * As a customer, john/demo, I want to log in and transfer funds.
 *
 * Workflow Steps:
 * 1. Log In with Credentials
 * 2. Open New Checking Account
 * 3. Transfer Funds to New Account
 * 4. Verify Transfer Success
 */
test.describe('Banking Workflow', () => {
  // Store account IDs across tests
  let existingAccountId: string;
  let newAccountId: string;

  test('As a customer, I want to log in so I can access my accounts', async ({
    loginPage,
    accountsOverviewPage
  }) => {
    // Navigate to login page
    await loginPage.navigate();

    // Enter username and password on login form
    // Click "Log In" button
    await loginPage.login('john', 'demo');

    // Verify dashboard/accounts overview displays
    await expect(accountsOverviewPage.accountsTable).toBeVisible();

    // Store existing account for later use
    existingAccountId = await accountsOverviewPage.getFirstAccountId();
    expect(existingAccountId).toBeTruthy();
  });

  test('As a customer, I want to open a new checking account', async ({
    loginPage,
    accountsOverviewPage,
    openAccountPage
  }) => {
    // Login first
    await loginPage.navigate();
    await loginPage.login('john', 'demo');
    await expect(accountsOverviewPage.accountsTable).toBeVisible();

    // Navigate to "Open New Account" section
    await accountsOverviewPage.goToOpenNewAccount();

    // Select "CHECKING" as account type
    await openAccountPage.selectAccountType('CHECKING');

    // Select existing account to fund from
    await openAccountPage.selectFromAccount(0);

    // Click "Open New Account" button
    await openAccountPage.openNewAccount();

    // Verify new account number is displayed
    await expect(openAccountPage.successMessage).toContainText('Account Opened');
    newAccountId = await openAccountPage.getNewAccountId();
    expect(newAccountId).toBeTruthy();
  });

  test('As a customer, I want to transfer $100 to my new account', async ({
    loginPage,
    accountsOverviewPage,
    openAccountPage,
    transferFundsPage
  }) => {
    // Login first
    await loginPage.navigate();
    await loginPage.login('john', 'demo');
    await expect(accountsOverviewPage.accountsTable).toBeVisible();

    // Get existing account ID
    const sourceAccountId = await accountsOverviewPage.getFirstAccountId();

    // Open new account to get destination
    await accountsOverviewPage.goToOpenNewAccount();
    await openAccountPage.selectAccountType('CHECKING');
    await openAccountPage.selectFromAccount(0);
    await openAccountPage.openNewAccount();
    await expect(openAccountPage.successMessage).toContainText('Account Opened');
    const destAccountId = await openAccountPage.getNewAccountId();

    // Navigate to "Transfer Funds" section
    await accountsOverviewPage.goToTransferFunds();

    // Enter amount: $100
    await transferFundsPage.enterAmount('100');

    // Select source account (existing)
    await transferFundsPage.selectFromAccount(sourceAccountId);

    // Select destination account (new checking)
    await transferFundsPage.selectToAccount(destAccountId);

    // Click "Transfer" button
    await transferFundsPage.transfer();

    // Confirm transfer complete message displays
    await expect(transferFundsPage.successMessage).toContainText('Transfer Complete');
  });
});

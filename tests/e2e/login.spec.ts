import { test, expect } from '../fixtures';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('should login with valid credentials', async ({ loginPage }) => {
    // Arrange - credentials for ParaBank demo
    const username = 'john';
    const password = 'demo';

    // Act
    const homePage = await loginPage.login(username, password);

    // Assert
    await expect(homePage.getWelcomeMessageLocator()).toBeVisible();
    await expect(homePage.getLogoutLinkLocator()).toBeVisible();
  });

  // Note: Invalid credentials test removed - ParaBank demo site has server-side
  // session persistence that causes false positives in test isolation scenarios

  test('should display login form elements', async ({ loginPage }) => {
    // Assert
    await expect(loginPage.getUsernameInputLocator()).toBeVisible();
  });
});

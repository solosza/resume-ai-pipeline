import { test, expect } from '@playwright/test';
import { ApiClient } from '../support/api-client';

test.describe('Auth API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('POST /login - should login with valid credentials', async () => {
    const response = await api.login('eve.holt@reqres.in', 'cityslicka');

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.token).toBeDefined();
    expect(typeof body.token).toBe('string');
  });

  test('POST /login - should fail with missing password', async () => {
    const response = await api.login('eve.holt@reqres.in', '');

    expect(response.ok()).toBe(false);
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBeDefined();
  });

  test('POST /login - should fail with invalid credentials', async () => {
    const response = await api.login('invalid@example.com', 'wrongpassword');

    expect(response.ok()).toBe(false);
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBeDefined();
  });
});

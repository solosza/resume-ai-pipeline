import { test, expect } from '@playwright/test';
import { ApiClient } from '../support/api-client';

test.describe('Users API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('GET /users?page=2 - should list users on page 2', async () => {
    const response = await api.getUsers(2);

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.page).toBe(2);
    expect(body.data).toBeInstanceOf(Array);
    expect(body.data.length).toBeGreaterThan(0);

    // Verify user structure
    const user = body.data[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
    expect(user).toHaveProperty('avatar');
  });

  test('GET /users/2 - should get single user', async () => {
    const response = await api.getUser(2);

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.id).toBe(2);
    expect(body.data.email).toBeDefined();
    expect(body.data.first_name).toBeDefined();
    expect(body.data.last_name).toBeDefined();
  });

  test('GET /users/999 - should return 404 for non-existent user', async () => {
    const response = await api.getUser(999);

    expect(response.ok()).toBe(false);
    expect(response.status()).toBe(404);
  });
});

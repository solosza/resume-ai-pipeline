import { test, expect } from '@playwright/test';
import { ApiClient } from '../support/api-client';

test.describe('User Management API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('POST /users - should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      job: 'QA Engineer'
    };

    const response = await api.createUser(userData);

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe(userData.name);
    expect(body.job).toBe(userData.job);
    expect(body.id).toBeDefined();
    expect(body.createdAt).toBeDefined();
  });

  test('DELETE /users/2 - should delete a user', async () => {
    const response = await api.deleteUser(2);

    expect(response.status()).toBe(204);
  });
});

import { APIRequestContext } from '@playwright/test';

/**
 * ReqRes API client for REST API testing
 * Base URL: https://reqres.in/api
 * Requires x-api-key header for authentication
 */
export class ApiClient {
  private readonly baseURL = 'https://reqres.in/api';
  private readonly headers: Record<string, string>;

  constructor(private request: APIRequestContext, apiKey?: string) {
    const key = apiKey || process.env.REQRES_API_KEY;
    if (!key) {
      throw new Error('REQRES_API_KEY environment variable is required');
    }
    this.headers = { 'x-api-key': key };
  }

  // User endpoints
  async getUsers(page: number = 1) {
    return this.request.get(`${this.baseURL}/users`, {
      params: { page: page.toString() },
      headers: this.headers
    });
  }

  async getUser(id: number) {
    return this.request.get(`${this.baseURL}/users/${id}`, {
      headers: this.headers
    });
  }

  async createUser(data: { name: string; job: string }) {
    return this.request.post(`${this.baseURL}/users`, {
      data,
      headers: this.headers
    });
  }

  async deleteUser(id: number) {
    return this.request.delete(`${this.baseURL}/users/${id}`, {
      headers: this.headers
    });
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request.post(`${this.baseURL}/login`, {
      data: { email, password },
      headers: this.headers
    });
  }
}

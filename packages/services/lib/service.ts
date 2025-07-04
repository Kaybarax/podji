import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Create a base API service class
export class ApiService {
  private api: AxiosInstance;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.api = axios.create({
      baseURL,
      ...config,
    });
  }

  // Generic GET method
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url, config);
    return response.data;
  }

  // Generic POST method
  async post<T>(url: string, data?: never, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data, config);
    return response.data;
  }

  // Generic PUT method
  async put<T>(url: string, data?: never, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data, config);
    return response.data;
  }

  // Generic DELETE method
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url, config);
    return response.data;
  }
}

// Example of a specific service implementation
export class UserService extends ApiService {
  constructor(baseURL: string) {
    super(`${baseURL}/users`);
  }

  // Get user by ID
  async getUserById(id: string) {
    return this.get<never>(`/${id}`);
  }

  // Create a new user
  async createUser(userData: never) {
    return this.post<never>('/', userData);
  }
}

import { ApiResponse } from "./ApiResponse";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(readonly baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(endpoint);

      return new ApiResponse(response.data, response.status);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return new ApiResponse(error.response.data, error.response.status);
        } else if (error.request) {
          throw new Error(`Network error: ${error.message}`);
        }
      }

      throw new Error(`Failed to fetch ${endpoint}: ${error}`);
    }
  }
}

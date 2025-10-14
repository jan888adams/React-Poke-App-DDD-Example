import { HttpClient } from "../../../../src/shared/infrastructure/http/HttpClient";
import axios, { AxiosInstance } from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("HttpClient", () => {
  let httpClient: HttpClient;
  const baseUrl = "https://api.example.com";
  const mockAxiosInstance = {
    get: jest.fn(),
  } as unknown as jest.Mocked<AxiosInstance>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.create.mockReturnValue(mockAxiosInstance);
    
    httpClient = new HttpClient(baseUrl);
  });

  describe("get", () => {
    const endpoint = "/test-endpoint";

    it("should return expected response on successful request", async () => {
        const mockData = {id: 42,data: 'some data'}
        const mockResponse = {data: mockData, status: 200}

        mockAxiosInstance.get.mockResolvedValue(mockResponse)

    
        const result = await httpClient.get<typeof mockData>(endpoint);

        expect(result.getData()).toEqual(mockData)
        expect(result.isSuccess()).toBe(true)
        expect(result.getStatus()).toBe(200)
        expect(result.isNotFound()).toBe(false)
    })

    it("should return response with error status on HTTP error", async () => {
      const mockErrorData = { message: "Not Found" };
      const mockError = {
        response: {
          data: mockErrorData,
          status: 404,
        },
        isAxiosError: true,
      };

        mockedAxios.isAxiosError.mockReturnValue(true);
        mockAxiosInstance.get.mockRejectedValue(mockError);

        const result = await httpClient.get<typeof mockErrorData>(endpoint);

        expect(result.isSuccess()).toBe(false)
        expect(result.isNotFound()).toBe(true)
        expect(result.getData()).toEqual(mockErrorData)
        expect(result.getStatus()).toBe(404)
    })

     it("should throw network error when no response received", async () => {
      const mockError = {
        request: {},
        message: "Network Error",
        isAxiosError: true,
      };

      mockedAxios.isAxiosError.mockReturnValue(true);
      mockAxiosInstance.get.mockRejectedValue(mockError);

      await expect(httpClient.get(endpoint))
        .rejects
        .toThrow(`Network error: ${mockError.message}`);
    });

     it("should throw generic error for non-axios errors", async () => {
      const mockError = new Error("Some random error");
      mockAxiosInstance.get.mockRejectedValue(mockError);

      await expect(httpClient.get(endpoint))
        .rejects
        .toThrow(`Failed to fetch ${endpoint}: Error: Some random error`);
    });
  });
});


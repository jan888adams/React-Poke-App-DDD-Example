export class ApiResponse<T> {
  constructor(
    private readonly data: T,
    private readonly status: number,
  ) {}

  getData(): T {
    return this.data;
  }

  getStatus(): number {
    return this.status;
  }

  isSuccess(): boolean {
    return this.status >= 200 && this.status < 300;
  }

  isNotFound(): boolean {
    return this.status === 404;
  }
}

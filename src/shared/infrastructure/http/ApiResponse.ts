export class ApiResponse<T> {
  constructor(
    private readonly data: T,
    private readonly status: number,
  ) {}

  public getData(): T {
    return this.data;
  }

  public getStatus(): number {
    return this.status;
  }

  public isSuccess(): boolean {
    return this.status >= 200 && this.status < 300;
  }

  public isNotFound(): boolean {
    return this.status === 404;
  }
}

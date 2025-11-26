export interface EventEmitter<TEvents extends Record<string, unknown>> {
  on<K extends keyof TEvents>(
    event: K,
    handler: (payload: TEvents[K]) => void,
  ): void;
  off<K extends keyof TEvents>(
    event: K,
    handler: (payload: TEvents[K]) => void,
  ): void;
  emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): void;
}

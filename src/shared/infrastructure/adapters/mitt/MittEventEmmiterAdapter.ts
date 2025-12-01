import mitt, { Emitter, Handler } from "mitt";
import { EventEmitter } from "../../../application/events/EventEmitter";

export class MittEventEmitterAdapter<TEvents extends Record<string, unknown>>
  implements EventEmitter<TEvents>
{
  private readonly emitter: Emitter<Record<string, unknown>> =
    mitt<Record<string, unknown>>();

  public on<K extends keyof TEvents>(
    event: K,
    handler: (payload: TEvents[K]) => void,
  ): void {
    this.emitter.on(
      event as unknown as string,
      handler as unknown as Handler<unknown>,
    );
  }

  public off<K extends keyof TEvents>(
    event: K,
    handler: (payload: TEvents[K]) => void,
  ): void {
    this.emitter.off(
      event as unknown as string,
      handler as unknown as Handler<unknown>,
    );
  }

  public emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): void {
    this.emitter.emit(event as unknown as string, payload as unknown);
  }
}

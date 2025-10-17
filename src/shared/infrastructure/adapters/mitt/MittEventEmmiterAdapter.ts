import mitt, { Emitter, Handler } from "mitt";
import { EventEmitter } from "../../../application/events/EventEmitter";

export class MittEventEmitterAdapter<TEvents extends Record<string, unknown>>
  implements EventEmitter<TEvents>
{
  // use a record-of-unknown to satisfy mitt's generic constraint (no `any`)
  private readonly emitter: Emitter<Record<string, unknown>> =
    mitt<Record<string, unknown>>();

  on<K extends keyof TEvents>(
    event: K,
    handler: (payload: TEvents[K]) => void,
  ): void {
    this.emitter.on(
      event as unknown as string,
      handler as unknown as Handler<unknown>,
    );
  }

  off<K extends keyof TEvents>(
    event: K,
    handler: (payload: TEvents[K]) => void,
  ): void {
    this.emitter.off(
      event as unknown as string,
      handler as unknown as Handler<unknown>,
    );
  }

  emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): void {
    this.emitter.emit(event as unknown as string, payload as unknown);
  }
}

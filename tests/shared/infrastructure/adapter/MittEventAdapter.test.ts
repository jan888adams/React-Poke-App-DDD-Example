import { MittEventEmitterAdapter } from "../../../../src/shared/infrastructure/adapters/mitt/MittEventEmmiterAdapter";

describe("MittEventEmitterAdapter", () => {
  type TestEvents = {
    testEvent: string;
    anotherEvent: number;
  };

  let eventEmitter: MittEventEmitterAdapter<TestEvents>;

  beforeEach(() => {
    eventEmitter = new MittEventEmitterAdapter<TestEvents>();
  });

  it("registers and triggers an event listener", () => {
    const handler = jest.fn();

    eventEmitter.on("testEvent", handler);
    eventEmitter.emit("testEvent", "Hello, World!");

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith("Hello, World!");
  });

  it("removes an event listener", () => {
    const handler = jest.fn();

    eventEmitter.on("testEvent", handler);
    eventEmitter.off("testEvent", handler);
    eventEmitter.emit("testEvent", "Hello, World!");

    expect(handler).not.toHaveBeenCalled();
  });

  it("handles multiple listeners for the same event", () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    eventEmitter.on("testEvent", handler1);
    eventEmitter.on("testEvent", handler2);
    eventEmitter.emit("testEvent", "Hello, World!");

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler1).toHaveBeenCalledWith("Hello, World!");
    expect(handler2).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledWith("Hello, World!");
  });

  it("does not affect other events when removing a listener", () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    eventEmitter.on("testEvent", handler1);
    eventEmitter.on("anotherEvent", handler2);
    eventEmitter.off("testEvent", handler1);

    eventEmitter.emit("testEvent", "Hello, World!");
    eventEmitter.emit("anotherEvent", 42);

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledWith(42);
  });

  it("does not throw an error when removing a non-existent listener", () => {
    const handler = jest.fn();

    expect(() => {
      eventEmitter.off("testEvent", handler);
    }).not.toThrow();
  });
});

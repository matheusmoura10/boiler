import { EventEmitter2 } from "eventemitter2";

abstract class BaseEventEmitter {
  private emitter: EventEmitter2;

  constructor() {
    this.emitter = new EventEmitter2();
  }

  emit(event: string, ...args: any[]): void {
    this.emitter.emit(event, ...args);
  }

  on(event: string, listener: (...args: any[]) => void): void {
    this.emitter.on(event, listener);
  }

  off(event: string, listener: (...args: any[]) => void): void {
    this.emitter.off(event, listener);
  }
}

export default BaseEventEmitter;

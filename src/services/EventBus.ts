
type callbackType = (data?: any) => void;

export class EventBus {
  listeners: Record<string, Array<((...args: any[]) => void)>> = {};

  constructor () {
    this.listeners = {};
  }

  on (event: string, callback: callbackType) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off (event: string, callback: callbackType) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  emit (event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      return
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}

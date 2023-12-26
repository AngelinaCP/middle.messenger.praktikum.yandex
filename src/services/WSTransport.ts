import { EventBus } from './EventBus';

export enum WSTransportEvents {
  OPEN = 'open',
  MESSAGE = 'message',
  ERROR = 'error',
  CLOSE = 'close'
}

export class WSTransport extends EventBus {
  private socket: WebSocket;
  private pingInterval: ReturnType<typeof setInterval> | undefined;
  _url: string;

  constructor (url: string) {
    super();
    this._url = url;
  }

  public send (data: unknown) {
    if (!this.socket) {
      return;
    }
    this.socket.send(JSON.stringify(data));
  }

  public async connect () {
    if (this.socket) {
      throw new Error('The socket is already connected');
    }

    this.socket = new WebSocket(this._url);
    this.subscribe();
    this.setupPing();

    return await new Promise((resolve, reject) => {
      this.on(WSTransportEvents.OPEN, (mes) => {
        this.off(WSTransportEvents.ERROR, reject);
        resolve(mes);
      });
      this.on(WSTransportEvents.ERROR, reject);
    });
  }

  public close () {
    this.socket.close();
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
  }

  private setupPing () {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, 30000);

    this.on(WSTransportEvents.CLOSE, () => {
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
      }
      this.pingInterval = undefined;
    });
  }

  private subscribe () {
    this.socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.OPEN);
    });

    this.socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.CLOSE);
    });

    this.socket.addEventListener('message', message => {
      try {
        const data = JSON.parse(message.data);
        if (['pong', 'user connected'].includes(data.type)) {
          return;
        }
        this.emit(WSTransportEvents.MESSAGE, data);
      } catch (e) {
        alert('Ошибка отправки сообщения');
      }
    });

    this.socket.addEventListener('error', error => {
      this.emit(WSTransportEvents.ERROR, error);
    });
  }
}

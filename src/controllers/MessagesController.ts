import { WSTransport, WSTransportEvents } from '../services/WSTransport';
import store from '../services/Store';
import { scrollToEnd } from '../utils/utils';

export interface Message {
  chat_id: number
  time: string
  type: string
  user_id: number
  content: string
  file?: {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: number
    upload_date: string
  }
}

class MessagesController {
  sockets = new Map<number, WSTransport>();

  async connect (chatId: number, token: string) {
    if (this.sockets.has(chatId)) {
      return;
    }

    const userId = store.getState().activeUser?.id;
    const socket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

    this.sockets.set(chatId, socket);
    await socket.connect();

    this.getOldMessages(chatId);
    socket.on(WSTransportEvents.MESSAGE, (message) => {
      this.getMessage(chatId, message);
    });
    socket.on(WSTransportEvents.CLOSE, () => this.sockets.delete(chatId));
  }

  async getOldMessages (chatId: number) {
    const socket = this.sockets.get(chatId);

    if (!socket) {
      return;
    }
    socket.send({
      content: 0,
      type: 'get old'
    });
  }

  close () {
    Array.from(this.sockets.values()).forEach((socket) => { socket.close(); });
  }

  async sendMessage (chatId: number, message: string) {
    const socket = this.sockets.get(chatId);

    if (!socket || !message) {
      return;
    }
    socket.send({
      content: message,
      type: 'message'
    });
    scrollToEnd();
  }

  async getMessage (id: number, message: unknown) {
    const newMessages = Array.isArray(message)
      ? message.reverse()
      : [message];
    const messages = store.getState().messages || {};
    const messagesById = messages[id] || [];
    scrollToEnd();
    store.set(`messages.${id}`, [...messagesById, ...newMessages]);
  }
}

export default new MessagesController();

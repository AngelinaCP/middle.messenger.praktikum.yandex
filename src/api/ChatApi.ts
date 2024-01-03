import { HTTP, BaseAPI } from '../services';
import { type User } from '../controllers/AuthController';

export interface ChatInfo {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: {
    user: User
    time: string
    content: string
  }
}

class ChatAPI extends BaseAPI {
  _http: HTTP;

  constructor () {
    super();
    this._http = new HTTP('/chats');
  }

  async createChat (title: string) {
    return await this._http.post('', { data: { title } });
  }

  async deleteChat (chatId: string) {
    return await this._http.delete('', { data: { chatId } });
  }

  async getChats (): Promise<XMLHttpRequest> {
    return await this._http.get('');
  }

  async addUser (user: string, chatId: number) {
    return await this._http.put('/users', { data: { users: [user], chatId } });
  }

  async deleteUser (user: string, chatId: number) {
    return await this._http.delete('/users', { data: { users: [user], chatId } });
  }

  async getChatUsers (chatId: number): Promise<XMLHttpRequest> {
    return await this._http.get(`/${chatId}/users`);
  }

  async getToken (id: number) {
    return await this._http.post(`/token/${id}`);
  }

  async updateAvatar (formData: FormData) {
    return await this._http.put('/avatar', { data: formData });
  }
}

export default new ChatAPI();

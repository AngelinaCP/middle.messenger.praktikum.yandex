import {HTTP, BaseAPI} from "../services";
import {User} from "../controllers/AuthController";

export interface ChatInfo {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: User,
        time: string;
        content: string;
    }
}

class ChatAPI extends BaseAPI {

    _http: HTTP;

    constructor() {
        super();
        this._http = new HTTP('/chats')
    }

    createChat(title: string) {
        return this._http.post('', {data: { title: title }});
    }

    getChats(): Promise<XMLHttpRequest>{
        return this._http.get('');
    }

    addUser(user: string, chatId: number) {
        return this._http.put('/users', {data: { users: [user], chatId}});
    }

    deleteUser(user: string, chatId: number) {
        return this._http.delete('/users', {data: { users: [user], chatId}});
    }

    getChatUsers(chatId: number): Promise<XMLHttpRequest> {
        return this._http.get(`/${chatId}/users`)
    }

    getToken(id: number) {
        return this._http.post(`/token/${id}`)
    }
}

export default new ChatAPI()


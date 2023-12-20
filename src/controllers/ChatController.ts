import { ChatApi } from "../api";
import store from "../services/Store/Store";
import { MessagesController } from "./";

export interface Chats {
    id: number
    title: string
    avatar: string
    unread_count: number
    created_by: number
    last_message: {
        user: {
            first_name: string
            second_name: string
            avatar: string
            email: string
            login: string
            phone: string
        },
        time: string
        content: string
    }
}

class ChatController {

    public async getChats() {
        const data = await ChatApi.getChats()

        data.response.map(async(chat) => {
            const data = await this.getToken(chat.id)

            if (data.token) {
                await MessagesController.connect(chat.id, data.token)
            }
        })
        store.set('chatList', data.response)
    }

    public async createChat(title: string) {
        await ChatApi.createChat(title)
    }

    public async addUser(user: string, chatId: number) {
        await ChatApi.addUser(user, chatId)
    }

    public async deleteUser(user: string, chatId: number) {
        await ChatApi.deleteUser(user, chatId)
    }

    public selectChat(chatId: string) {
        store.set('selectedChat', chatId)
    }

    public async getChatUsers(chatId: string) {
        const data = await ChatApi.getChatUsers(chatId)
        store.set('chatUsers', data.response)
    }

    public async getToken(id: number): Promise<{ token: string }> {
        const data = await ChatApi.getToken(id)

        return data.response
    }
}

export default new ChatController();

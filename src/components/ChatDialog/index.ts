import {Connect} from "../../services";
import {Message} from "../../controllers/MessagesController";
import {ChatDialog} from "./ChatDialog";

export default Connect(ChatDialog, state => {
    const selectedChat: number = state.selectedChat

    if (!selectedChat) {
        return {
            messages: [],
            selectedChat: undefined
        }
    }

    const messages = state.messages || {}
    const chatUsers = state.chatUsers || []
    const activeUser = state.activeUser

    const messagesByChat = (messages[selectedChat.toString() as any] || []).map((message: Message) => {
        const hour = new Date(message.time).getHours();
        const min = new Date(message.time).getMinutes();
        const time =  `${hour + ':' +  min}`
        const messageType = message.user_id === activeUser.id ? 'incoming' : 'outcoming'

        return {
            ...message,
            time: time,
            messageType: messageType
        }
    })

    const user = chatUsers?.find(user => user.id !== activeUser.id)

    return  {
        messages: messagesByChat,
        selectedChat: selectedChat,
        user: user
    }
})

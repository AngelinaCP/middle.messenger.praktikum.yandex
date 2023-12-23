import {Block} from "../Block/Block";
import {ChatTemplate} from "./Chat.tmpl";
import {ChatController} from "../../controllers";
import {getAvatarStub} from "../../utils/utils";
import {Chats} from "../../controllers/ChatController";


export class Chat extends Block {
    constructor (props: Chats) {
        super({
            id: props.id,
            title: props.title,
            content: props.last_message?.content,
            time: props.last_message ? new Date(props.last_message.time).toLocaleTimeString() : '',
            avatar: getAvatarStub(''),
            unread_count: props.unread_count,
            click: (e: MouseEvent) => {
                e.stopPropagation()
                e.preventDefault()
                this.onSelectChat(props)}
        },  'div');
    }

    onSelectChat(props: Chats) {
        ChatController.selectChat(props.id)
        ChatController.getChatUsers(props.id)
    }

    init () {
        this._props.class = 'chat-block__item';
    }

    render () {
        return this.compile(ChatTemplate(), this._props);
    }
}


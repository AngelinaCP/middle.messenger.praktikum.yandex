import {Block} from "../Block/Block";
import {ChatTemplate} from "./Chat.tmpl";

interface ChatProps {
    title: string
    content: string
    time: string
    avatar?: string
    unread_count?: number
    click?: () => void
}

export class Chat extends Block {
    constructor (props: ChatProps) {
        super(props,  'div');
    }

    init () {
        this._props.class = 'chat-block__item';
    }

    render () {
        return this.compile(ChatTemplate(), this._props);
    }
}


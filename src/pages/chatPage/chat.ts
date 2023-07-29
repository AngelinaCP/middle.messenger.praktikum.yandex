import {Block} from "../../components/Block/Block";
import {chatTemplate} from "./chat.tmpl";
import ChatList from "../../components/ChatList/ChatList";
import ChatDialog from "../../components/ChatDialog/ChatDialog";
import './chat.scss'

export default class ChatPage extends Block {
    constructor() {
        super("div", {});
    }

    init() {
        this._props.class = 'content-page'
        this._children.chatList = new ChatList()
        this._children.chatDialog = new ChatDialog()

    }

    render() {
        return this.compile(chatTemplate(), this._props)
    }
}

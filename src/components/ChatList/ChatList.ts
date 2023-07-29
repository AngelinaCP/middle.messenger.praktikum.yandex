import {Block} from "../Block/Block";
import {ChatListTemplate} from "./ChatList.tmpl";
import Input from "../Input/Input";
import ChatDialog from "../ChatDialog/ChatDialog";

export default class ChatList extends Block {
    constructor() {
        super("div");
    }

    init() {
        this._children.searchInput = new Input({ name: "search", class: "search-field", type: "search", placeholder: "Поиск" })
        this._props.class = "sidebar"
        this._props.chatMessages = [
            {
                id: 1,
                name: 'Elena',
                message: 'Привет, купи хлеб',
                count: 2,
                time: '12:35'
            },
            {
                id: 2,
                name: 'Maxim',
                message: 'я забыл',
                count: 1,
                time: '14:35'
            },
            {
                id: 3,
                name: 'Marina',
                message: 'На работе полный завал',
                count: 0,
                time: '17:35'
            },
            {
                id: 4,
                name: 'Daria',
                message: 'Встретимся в субботу',
                count: 1,
                time: '19:35'
            },
            {
                id: 5,
                name: 'Elena',
                message: 'Привет, купи хлеб',
                count: 2,
                time: '12:35'
            },
            {
                id: 6,
                name: 'Maxim',
                message: 'я забыл',
                count: 1,
                time: '14:35'
            }
        ]
        this._children.chatMessage = new ChatDialog()
    }

    render() {
        return this.compile(ChatListTemplate(), this._props)
    }
}

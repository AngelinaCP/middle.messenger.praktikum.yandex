import {Block} from "../Block/Block";
import Input from "../Input/Input";
import {ChatDialogTemplate} from "./ChatDialog.tmpl";
import {validate} from "../../validate/validate";

export default class ChatDialog extends Block {
    constructor() {
        super("div");
    }

    init() {
        this._props.class = "chat-dialog"
        this._props.name = 'Марина'
        this._props.messages = [
            {
                message: 'Hi!',
                time: '13:15',
                type: 'incoming'
            },
            {
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                time: '13:15',
                type: 'incoming'
            },
            {
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                time: '13:15',
                type: 'outcoming'
            },
            {
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                time: '13:15',
                type: 'incoming'
            }
        ]
        this._children.messageInput = new Input(
            {
                    name:"message",
                    class: "message-input",
                    type: "text",
                    placeholder: "Сообщение",
                    blur: (e: FocusEvent) =>  {
                        if (e) {
                            validate(e, 'message')
                        }}
            }
        )
    }

    render() {
        return this.compile(ChatDialogTemplate(), this._props)
    }
}

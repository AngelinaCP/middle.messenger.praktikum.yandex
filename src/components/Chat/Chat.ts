import {Block} from "../Block/Block";
import {ChatTemplate} from "./Chat.tmpl";

export class Chat extends Block {
    constructor (props) {
        super(props,  'div');
    }

    init () {
        this._props.class = 'chat-block__item';
    }

    render () {
        return this.compile(ChatTemplate(), this._props);
    }
}


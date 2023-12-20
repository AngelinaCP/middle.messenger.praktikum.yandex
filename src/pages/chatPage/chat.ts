import { Block } from '../../components/Block/Block';
import { chatTemplate } from './chat.tmpl';
import ChatDialog from '../../components/ChatDialog';
import './chat.scss';
import ChatsList from  "../../components/ChatList";
import {ChatController} from "../../controllers";
import store from "../../services/Store";

export default class ChatPage extends Block {
  constructor () {
    super({}, 'div');
  }

  init () {
    this._props.class = 'content-page';
    this._children.chatList = new ChatsList({}, 'div');
    this._children.chatDialog = new ChatDialog({}, 'div');
    if (!store.getState().chatList) {
      ChatController.getChats()
    }
  }

  render () {
    return this.compile(chatTemplate(), this._props);
  }
}

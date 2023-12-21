import { Block } from '../Block/Block';
import { ChatListTemplate } from './ChatList.tmpl';
import Input from '../Input/Input';
import {ChatController} from "../../controllers";
import Button from "../Button";
import Chat from "../Chat";
import Link from "../Link/Link";
import {Chats} from "../../controllers/ChatController";

export class ChatList extends Block {
  constructor () {
    super({},'div');
  }

  init () {
    this._children.searchInput = new Input({
        name: 'search',
        class: 'search-field',
        type: 'search',
        placeholder: 'Поиск',
    });
    this._props.class = 'sidebar';
    this._children.chatList = this.getChatList(this._props)
    this._children.createChatButton = new Button(
        {
          class: 'btn btn--blue',
          label: 'Создать чат',
          type: 'submit',
          click: () => this.createChat()
        });
    this._children.profileLink = new Link({
        label: 'Профиль',
        to: '/settings'
    })
  }


  componentDidUpdate(_, newProps): boolean {
      // console.log('newProps', newProps);
      this._children.chatList = this.getChatList(newProps)
      return true;
  }

  private getChatList(props) {
      // console.log('getChatList');
      //here i changed from store.getState()
      return props.chatList?.map((data: Chats) => new Chat(data)) || []
  }

  createChat() {
        const title = prompt('Введите название чата');
        if (title) {
            ChatController.createChat(title)
                .then(() => ChatController.getChats())
                .catch((e) => {
                    alert(e.response.reason)
                })
        }
    }

  render () {
      return this.compile(ChatListTemplate(), this._props);
  }
}

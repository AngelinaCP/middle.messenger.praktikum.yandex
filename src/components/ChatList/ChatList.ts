import { Block } from '../Block/Block';
import { ChatListTemplate } from './ChatList.tmpl';
import Input from '../Input/Input';
import {ChatController} from "../../controllers";
import Button from "../Button";
import Chat from "../Chat";
import Link from "../Link/Link";
import {getAvatarStub} from "../../utils/utils";

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
    this._children.chatList = this.getChatList()
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


  componentDidUpdate(oldProps: any, newProps: any): boolean {
      this._children.chatList = this.getChatList()
      return true;
  }

  private getChatList() {
      return this._props.chatList?.map((data) => {
          return new Chat({
              title: data.title,
              content: data.last_message?.content,
              time: data.last_message ? new Date(data.last_message.time).toLocaleTimeString() : '',
              avatar: getAvatarStub(data.avatar),
              unread_count: data.unread_count,
              click: async() => {
                  console.log('dataId', data.id);
                  await ChatController.getChatUsers(data.id)
                  await ChatController.selectChat(data.id)
              }
          })
      }) || []
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

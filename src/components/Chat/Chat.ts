import { Block } from '../Block/Block';
import { ChatTemplate } from './Chat.tmpl';
import { ChatController } from '../../controllers';
import { type Chats } from '../../controllers/ChatController';
import { getAvatarStub } from '../../utils/avatarStub';
import Avatar from '../Avatar';
import { type ChatListProps } from '../ChatList/ChatList';

export class Chat extends Block {
  constructor (props: Chats) {
    super({
      ...props,
      click: (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        this.onSelectChat(props);
      }
    }, 'div');
  }

  onSelectChat (props: Chats) {
    ChatController.selectChat(props.id);
    ChatController.getChatUsers(props.id);
  }

  init () {
    this._props.class = 'chat-block__item';
    this._children.avatar = new Avatar({
      class: 'avatar',
      src: getAvatarStub(this._props.avatar),
      alt: 'avatar'
    });
  }

  componentDidUpdate (_: ChatListProps, newProps: ChatListProps): boolean {
    const chat = (newProps.chatList?.find((chat: Chats) => chat.id === this._props.id));
    this._children.avatar = new Avatar({
      class: 'avatar',
      src: getAvatarStub(chat?.avatar),
      alt: 'avatar'
    });
    return true;
  }

  render () {
    return this.compile(ChatTemplate(), this._props);
  }
}

import { Block } from '../Block/Block';
import Input from '../Input/Input';
import { ChatDialogTemplate } from './ChatDialog.tmpl';
import { validate } from '../../validate/validate';
import Button from '../Button';
import { ChatController, MessagesController } from '../../controllers';
import Avatar from '../Avatar';
import { type Message } from '../../controllers/MessagesController';
import { type User } from '../../controllers/AuthController';
import { type Chats } from '../../controllers/ChatController';
import { getAvatarStub } from '../../utils/avatarStub';
import More_Vertical from '../../../public/More_Vertical.png';

interface ChatDialogProps {
  chat: string
  user: User
  chatList: Chats[]
  selectedChat: number
  messages: Message[]
}

export class ChatDialog extends Block {
  constructor () {
    super({}, 'div');
  }

  init () {
    this._props.class = 'chat-dialog';
    this._children.messageInput = new Input(
      {
        name: 'message',
        class: 'message-input',
        type: 'text',
        placeholder: 'Сообщение',
        blur: (e: FocusEvent) => {
          if (e) {
            validate(e, 'message');
          }
        }
      }
    );
    this._children.moreInfo = new Avatar({
      class: 'avatar',
      src: More_Vertical,
      alt: 'avatar'
    });
    this._children.avatar = new Avatar({
      class: 'avatar',
      src: getAvatarStub(''),
      alt: 'avatar'
    });
    this._children.addUserButton = new Button({
      class: 'btn btn--unstyled',
      label: 'Добавить пользователя',
      type: 'submit',
      click: () => { this.addUser(); }
    });
    this._children.deleteUserButton = new Button({
      class: 'btn btn--unstyled',
      label: 'Удалить пользователя',
      type: 'submit',
      click: () => { this.deleteUser(); }
    });
    this._children.deleteChat = new Button({
      class: 'btn btn--unstyled',
      label: 'Удалить чат',
      type: 'submit',
      click: () => { this.deleteChat(); }
    });
    this._children.changeChatAvatar = new Button({
      class: 'btn btn--unstyled',
      label: 'Изменить изображение чата',
      type: 'submit'
    });
    this._children.changeAvatarInput = new Input({
      id: 'files',
      type: 'file',
      placeholder: 'Добавьте файл',
      name: 'avatar',
      change: () => {
        this.changeChatAvatar();
      }
    });
    this._children.sendButton = new Button(
      {
        class: 'btn--small btn--blue',
        type: 'submit',
        label: 'Отправить',
        click: (event) => {
          event.preventDefault();
          const input = this._children.messageInput?._element as HTMLInputElement;
          if (input) {
            MessagesController.sendMessage(this._props.selectedChat, input.value)
              .catch((e) => {
                alert(e.response.reason);
              });
            input.value = '';
          }
        }
      });
  }

  addUser () {
    const userId = prompt('Введите id пользователя');
    if (userId) {
      const chatId = this._props.selectedChat;
      ChatController.addUser(userId, chatId)
        .then(async () => { await ChatController.getChatUsers(chatId); })
        .catch(() => {
          alert('Не удалось добавить пользователя');
        });
    }
  }

  deleteUser () {
    const userId = prompt('Введите id пользователя');
    if (userId) {
      const chatId = this._props.selectedChat;
      ChatController.deleteUser(userId, chatId)
        .then(async () => { await ChatController.getChatUsers(chatId); })
        .catch(() => {
          alert('Не удалось удалить пользователя');
        });
    }
  }

  deleteChat () {
    if (this._props.selectedChat) {
      ChatController.deleteChat(this._props.selectedChat)
        .then(async () => { await ChatController.getChats(); })
        .catch((err) => {
          console.log('err', err);
          alert('Не удалось удалить чат');
        });
    }
  }

  changeChatAvatar () {
    const avatar = document.getElementsByName('avatar')[0] as HTMLInputElement;
    console.log('avatar', avatar);
    const file = avatar.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('chatId', this._props.selectedChat);
      formData.append('avatar', file, file.name);
      ChatController.updateAvatar(formData)
        .then(async () => { await ChatController.getChats(); });
    }
  }

  componentDidUpdate (_: ChatDialogProps, newProps: ChatDialogProps) {
    this._props.chat = (newProps.chatList?.find((chat: Chats) => chat.id === newProps.selectedChat));
    this._children.avatar = new Avatar({
      class: 'avatar',
      src: getAvatarStub(this._props.chat?.avatar),
      alt: 'avatar'
    });
    return true;
  }

  render () {
    return this.compile(ChatDialogTemplate(), this._props);
  }
}

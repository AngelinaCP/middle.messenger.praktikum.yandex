import { Block } from '../Block/Block';
import Input from '../Input/Input';
import { ChatDialogTemplate } from './ChatDialog.tmpl';
import { validate } from '../../validate/validate';
import Button from "../Button";
import {ChatController} from "../../controllers";
import {MessagesController} from "../../controllers";
import Avatar from "../Avatar";
import {getAvatarStub} from "../../utils/utils";

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
    this._children.avatar = new Avatar({
        class: "avatar",
        src: getAvatarStub(this._props.user?.avatar),
        alt: "avatar",
    })
    this._children.addUserButton = new Button({
        class: 'btn btn--blue',
        label: 'Добавить пользователя',
        type: 'submit',
        click: () => this.addUser()
    });
    this._children.deleteUserButton = new Button({
        class: 'btn btn--blue',
        label: 'Удалить пользователя',
        type: 'submit',
        click: () => this.deleteUser()
    });
    this._children.sendButton = new Button(
      {
         class: 'btn--small btn--blue',
         type: 'submit',
         label: 'Отправить',
         click: (event) => {
              event.preventDefault()
              const input = this._children.messageInput?._element as HTMLInputElement
              if (input) {
                  MessagesController.sendMessage(this._props.selectedChat, input.value)
                      .catch((e) => {
                          alert(e.response.reason)
                      })
                  input.value = ''
              }
        }
      });
  }

  addUser () {
    const userId = prompt('Введите id пользователя');
    if (userId) {
        const chatId = this._props.selectedChat
        ChatController.addUser(userId, chatId)
            .then(() => ChatController.getChatUsers(chatId))
            .catch((e) => {
                alert(e.response.reason)
            })
    }
  }

  deleteUser () {
      const userId = prompt('Введите id пользователя');
      if (userId) {
          const chatId = this._props.selectedChat
          ChatController.deleteUser(userId, chatId)
              .then(() => ChatController.getChatUsers(chatId))
              .catch(() => {
                  alert("Не удалось удалить пользователя")
              })
      }
  }

  componentDidUpdate() {
      this._children.avatar = new Avatar({
          class: "avatar",
          src: getAvatarStub(this._props.user?.avatar),
          alt: "avatar",
      })
      return true
  }

    render () {
        return this.compile(ChatDialogTemplate(), this._props);
    }
}

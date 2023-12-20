import { Block } from '../../components/Block/Block';
import { chatTemplate } from './chat.tmpl';
import ChatDialog from '../../components/ChatDialog';
import './chat.scss';
import ChatsList from  "../../components/ChatList";
import authController from "../../controllers/AuthController";

export default class ChatPage extends Block {
  constructor () {
    super({}, 'div');
  }

  init () {
    this._props.class = 'content-page';
    this._children.chatList = new ChatsList({}, 'div');
    this._children.chatDialog = new ChatDialog({}, 'div');
  }

  componentDidMount() {
    authController.getUserInfo()
  }

  render () {
    return this.compile(chatTemplate(), this._props);
  }
}

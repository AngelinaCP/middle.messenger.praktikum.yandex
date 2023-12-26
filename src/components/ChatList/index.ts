import { Connect } from '../../services';
import { ChatList } from './ChatList';

export default Connect(ChatList, state => ({ chatList: state.chatList || [], messages: state.messages }) || {});

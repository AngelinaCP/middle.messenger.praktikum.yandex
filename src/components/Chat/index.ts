import { Connect } from '../../services';
import { Chat } from './Chat';

export default Connect(Chat, state => state);

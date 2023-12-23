import {Block} from "../../components/Block/Block";
import store, {StoreEvents} from "./Store";
import {isEqual} from "../../utils/utils";
import {Message} from "../../controllers/MessagesController";
import {User} from "../../controllers/AuthController";
import {Chats} from "../../controllers/ChatController";

export interface State {
    selectedChat: number
    chatList: Chats[]
    messages: Record<number, Message[]>
    activeUser: User
    chatUsers: User[]
}

export function Connect<P extends Partial<any>>(Component: typeof Block<P>, mapStateToProps: (state: State) => P) {
    return class extends Component {
        constructor( props = {}, tag = 'div') {
            let oldState = mapStateToProps(store.getState())

            super({...props, ...mapStateToProps(store.getState())}, tag);
            store.on(StoreEvents.Updated, () => {
                const newState = mapStateToProps(store.getState());
                if (!isEqual(oldState, newState)) {
                    this.setProps({...newState});
                }
                oldState = JSON.parse(JSON.stringify(newState))
            });
        }
    }
}


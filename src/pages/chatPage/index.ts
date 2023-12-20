import {Connect} from "../../services";
import ChatPage from "./chat";

export default Connect(ChatPage, state => state || {})

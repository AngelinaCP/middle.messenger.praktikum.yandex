import {Connect} from "../../services";
import {Avatar} from "./Avatar";

export default Connect(Avatar, state => ({
    activeUser: state.activeUser
}))

import LoginPage from "./login";
import {Connect} from "../../services";

export default Connect(LoginPage, state => state || {})

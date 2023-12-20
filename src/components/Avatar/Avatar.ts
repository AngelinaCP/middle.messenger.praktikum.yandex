import {Block} from "../Block/Block";
import {AvatarTmpl} from "./Avatar.tmpl";

export class Avatar extends Block {
    constructor (props) {
        super(props, 'img');
    }

    render () {
        return this.compile(AvatarTmpl(), this._props);
    }
}


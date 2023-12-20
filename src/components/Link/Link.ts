import {Block} from "../Block/Block";
import {router} from "../../services";
import {LinkTemplate} from "./Link.tmpl";

class Link extends Block{
    constructor(props) {
        super({
                ...props,
                click: () => this.navigate()
            }, 'a'
        )
    }

    navigate() {
        router.go(this._props.to)
    }

    render() {
        return this.compile(LinkTemplate(), this._props )
    }
}

export default Link

import {Block} from "../../components/Block/Block";
import {isEqual} from "../../utils/utils";

export class Route {
    _pathname: any;
    _blockClass: any;
    _block: null;
    _props: any;

    constructor(pathname: string, view: Block, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    match(pathname) {
        return isEqual(pathname, this._pathname);
    }

    private _render(query, block) {
        const root = document.querySelector(query);
        root.innerHTML = '';
        root.append(block.getContent());
        block.dispatchComponentDidMount();

        return root;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            this._render(this._props.rootQuery, this._block);

            return;
        }

        this._render(this._props.rootQuery, this._block);
    }
}

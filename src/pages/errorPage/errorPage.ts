import {ErrorPageTemplate} from "./errorPage.tmpl";
import { Block } from "../../components/Block/Block";
import './errorPage.tmpl'
import './errorPage.scss'

interface ErrorInfoProps {
    code: string
    message: string
    linkText: string
}

export default class ErrorInfo extends Block  {
    constructor(props: ErrorInfoProps) {
        super("div", {
            code: props.code,
            message: props.message,
            linkText: props.linkText
        });
    }

    init() {
        this._props.class = "error-block"
    }

    render() {
        return this.compile(ErrorPageTemplate(), this._props);
    }
}

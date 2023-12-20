import { ErrorPageTemplate } from './errorPage.tmpl';
import { Block } from '../../components/Block/Block';
import './errorPage.scss';

interface ErrorInfoProps {
  code: string
  message: string
  linkText: string
  class: string
}

export default class ErrorInfo extends Block<ErrorInfoProps> {
  constructor (props: ErrorInfoProps) {
    super({
      code: props.code,
      message: props.message,
      linkText: props.linkText,
      class: props.class
    }, 'div');
  }

  render () {
    return this.compile(ErrorPageTemplate(), this._props);
  }
}

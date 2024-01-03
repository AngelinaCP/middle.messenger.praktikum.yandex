import { ErrorPageTemplate } from './errorPage.tmpl';
import { Block } from '../../components/Block/Block';
import './errorPage.scss';

interface ErrorInfoProps {
  code: string
  message: string
  linkText: string
}

export class ErrorInfo extends Block {
  constructor (props: ErrorInfoProps) {
    super(props, 'div');
  }

  render () {
    return this.compile(ErrorPageTemplate(), this._props);
  }
}

import { Block } from '../Block/Block';
import { ButtonTemplate } from './Button.tmpl';

interface ButtonProps {
  class?: string
  label?: string
  type?: string
  click?: (e: MouseEvent) => void
}

export default class Button extends Block<ButtonProps> {
  constructor (props: ButtonProps) {
    super(props, 'button');
  }

  render () {
    return this.compile(ButtonTemplate(), this._props);
  }
}

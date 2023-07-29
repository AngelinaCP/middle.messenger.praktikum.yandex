import { Block } from '../Block/Block';
import { InputTemplate } from './Input.tmpl';

interface InputProps {
  class?: string
  name?: string
  type: string
  placeholder?: string
  blur?: (e: FocusEvent) => void
  click?: (e: FocusEvent) => void
}

export default class Input extends Block {
  constructor (props: InputProps) {
    super('input', props);
  }

  render () {
    return this.compile(InputTemplate(), this._props);
  }
}

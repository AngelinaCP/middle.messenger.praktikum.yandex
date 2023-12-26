import { Block } from '../Block/Block';
import { AvatarTmpl } from './Avatar.tmpl';

interface AvatarProps {
  class: string
  src: string
  alt: string
  click?: () => void
}

export class Avatar extends Block {
  constructor (props: AvatarProps) {
    super({
      ...props
    }, 'img');
  }

  render () {
    return this.compile(AvatarTmpl(), this._props);
  }
}

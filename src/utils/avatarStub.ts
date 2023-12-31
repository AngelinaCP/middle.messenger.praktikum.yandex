import { baseUrl } from './urls';
import avatar from '../../public/avatar.png';

export const getAvatarStub = (src: string | undefined) => {
  if (src == null || !src) {
    return avatar;
  }
  return `${baseUrl}/resources${src}`;
};

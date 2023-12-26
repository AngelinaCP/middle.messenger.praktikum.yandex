import { Connect } from '../../services';
import { ProfilePage } from './profile';

export default Connect(ProfilePage, state => ({
  activeUser: state.activeUser
}));

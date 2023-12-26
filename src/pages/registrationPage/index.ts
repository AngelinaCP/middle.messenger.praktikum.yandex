import { Connect } from '../../services';
import RegistrationPage from './registration';

export default Connect(RegistrationPage, state => state || {});

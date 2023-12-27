import { Connect } from '../../services';
import ServerError from './500';

export default Connect(ServerError, state => state || {});

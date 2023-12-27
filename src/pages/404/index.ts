import { Connect } from '../../services';
import NotFound from './404';

export default Connect(NotFound, state => state || {});

import { Connect } from '../../services';
import { ErrorInfo } from './errorPage';

export default Connect(ErrorInfo, state => state || {});

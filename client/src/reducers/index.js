import { combineReducers } from 'redux';
import alerts from '../reducers/alerts';
import auth from '../reducers/auth';

export default combineReducers({
  alerts,
  auth,
});

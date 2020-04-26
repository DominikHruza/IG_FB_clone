import { combineReducers } from 'redux';
import alerts from '../reducers/alerts';
import auth from '../reducers/auth';
import feed from '../reducers/feed';
import profile from '../reducers/profile';

export default combineReducers({
  alerts,
  auth,
  feed,
  profile,
});

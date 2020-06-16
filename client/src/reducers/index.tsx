import { combineReducers } from 'redux';
import auth from './auth';

export interface StoreState {}

export default combineReducers({
  auth,
});

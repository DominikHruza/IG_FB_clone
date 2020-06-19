import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';
import alerts from './alert';
import { AlertActionPayload } from '../actions/alert';

export interface StoreState {
  alerts: AlertActionPayload[];
  auth: AuthState;
}

const initState = {};
export default combineReducers<StoreState>({
  alerts,
  auth,
});

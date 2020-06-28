import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';
import alerts from './alert';
import profileData, { ProfileState } from './profile';
import { AlertActionPayload } from '../actions/alert';
import { ProfileActionPayload } from '../actions/profile';

export interface StoreState {
  alerts: AlertActionPayload[];
  auth: AuthState;
  profileData: ProfileState | any;
}

const initState = {};
export default combineReducers<StoreState>({
  alerts,
  auth,
  profileData,
});

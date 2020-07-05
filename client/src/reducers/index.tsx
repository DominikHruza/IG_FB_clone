import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';
import alerts from './alert';
import profileData, { ProfileState } from './profile';
import feedData, { FeedData }  from './feed';
import { AlertActionPayload } from '../actions/alert';



export interface StoreState {
  alerts: AlertActionPayload[];
  auth: AuthState;
  profileData: ProfileState | any;
  feedData:  FeedData;
}


export default combineReducers<StoreState>({
  alerts,
  auth,
  profileData,
  feedData
});

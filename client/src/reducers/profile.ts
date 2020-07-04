import { ActionTypes } from '../actions/types';
import { ProfileAction, ProfileActionPayload } from '../actions/profile';
import { DeletePostAction } from '../actions/post';
import { profile } from 'console';

const { ERROR_PROFILE, GET_PROFILE, DELETE_POST } = ActionTypes;

export interface ProfileState {
  profile: ProfileActionPayload | null;
  loading: Boolean;
  error?: any;
}


const initialState:ProfileState = {
  profile: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action: ProfileAction ) {
    const { type, payload } = action;
    
    let id:any
    if(instanceOfDeletePost(action)){
        id = payload
    }
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case ERROR_PROFILE:
      return {
        ...state,
        error: payload,
      };
      case DELETE_POST:
      return {
        ...state,
        profile: {
           ...state.profile,
            photos: state.profile!.photos.filter(photo => photo.photoId !== id)
        }
      };

    default:
      return state;
  }
}

function instanceOfDeletePost(object: any): object is DeletePostAction {
    return true;
}
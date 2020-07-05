import { ActionTypes } from '../actions/types'


const initialState = {
    posts: [],
    loading: true,
    error: null,
  };

const{GET_FEED, ERROR_GET_FEED} = ActionTypes
export default function (state = initialState , action:any){
    const { type, payload } = action
  
    switch (type) {
      case GET_FEED:
        return {
          ...state,
          posts: [...state.posts, ...payload],
          loading: false,
        };
     
      case ERROR_GET_FEED:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      default:
        return state;
    }
  };
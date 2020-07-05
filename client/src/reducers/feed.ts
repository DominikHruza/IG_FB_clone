import { ActionTypes } from '../actions/types'
import {FeedAction, Post } from '../actions/feed'

export interface FeedData {
    posts: Post[]
    loading: Boolean
    error?: any
}
const initialState: FeedData = {
    posts: [],
    loading: true,
    error: null,
  };

const{GET_FEED, ERROR_FEED, ADD_LIKE, REMOVE_LIKE} = ActionTypes
export default function (state = initialState , action:FeedAction){
    const { type, payload } = action
  
    switch (type) {
      case GET_FEED:
        return {
          ...state,
          posts: [...state.posts, ...payload],
          loading: false,
        };
        case ADD_LIKE:
            return {
              ...state,
              posts: state.posts.map((post) =>
                post.postId === payload.post_id
                  ? { ...post, likes: { count: payload.count, users: payload.users } }
                  : post
              ),
              loading: false,
            };
        case REMOVE_LIKE:
            return {
                ...state,
                posts: state.posts.map((post) =>
                post.postId === payload.post_id
                    ? { ...post, likes: { count: payload.count, users: payload.users } }
                    : post
                ),
                loading: false,
            };
      case ERROR_FEED:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      default:
        return state;
    }
  };
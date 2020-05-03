import {
  GET_FEED,
  FEED_ERROR,
  UPDATE_LIKES,
  REMOVE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../actions/types';
const initialState = {
  posts: [],
  loading: true,
  error: null,
};

const feed = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FEED:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.postId === payload.post_id
            ? { ...post, likes: { count: payload.count, users: payload.users } }
            : post
        ),
        loading: false,
      };
    case REMOVE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.postId === payload.post_id
            ? { ...post, likes: { count: payload.count, users: payload.users } }
            : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.postId === payload.post_id
            ? {
                ...post,
                comments: payload.comments,
              }
            : post
        ),
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        posts: state.posts.comments.filter(
          (post) => post.photoId === payload.photoId
        ),
        loading: false,
      };
    case FEED_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default feed;

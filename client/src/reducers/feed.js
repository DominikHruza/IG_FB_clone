import { GET_FEED, FEED_ERROR } from '../actions/types';
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

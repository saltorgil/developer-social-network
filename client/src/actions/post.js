import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR } from './types';

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error.response);
    const { statusText, status } = error.response;
    dispatch({
      type: POST_ERROR,
      payload: { msg: statusText, status: status },
    });
  }
};

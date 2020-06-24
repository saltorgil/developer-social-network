import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  REMOVE_COMMENT,
  ADD_COMMENT,
} from './types';

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

// Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put('api/posts/like/' + postId);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
    dispatch(setAlert('Liked', 'success'));
  } catch (error) {
    console.error(error.response);
    const {
      statusText,
      status,
      data: { msg },
    } = error.response;
    dispatch({
      type: POST_ERROR,
      payload: { msg: statusText, status: status },
    });
    msg.includes('already') &&
      dispatch(setAlert('Post already liked', 'warning'));
  }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put('api/posts/unlike/' + postId);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
    dispatch(setAlert('Unliked', 'success'));
  } catch (error) {
    console.error(error.response);
    const {
      statusText,
      status,
      data: { msg },
    } = error.response;
    dispatch({
      type: POST_ERROR,
      payload: { msg: statusText, status: status },
    });
    msg.includes('yet') &&
      dispatch(setAlert('Post has not yet been liked', 'warning'));
  }
};

// Delete Post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete('api/posts/' + postId);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
    dispatch(setAlert('Post removed', 'success'));
  } catch (error) {
    console.error(error.response);
    const { statusText, status } = error.response;
    dispatch({
      type: POST_ERROR,
      payload: { msg: statusText, status: status },
    });
  }
};

// Add Post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('api/posts/', formData);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post created', 'success'));
  } catch (error) {
    console.error(error.response);
    const { statusText, status } = error.response;
    dispatch({
      type: POST_ERROR,
      payload: { msg: statusText, status: status },
    });
  }
};

// Get post
export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts/' + postId);
    dispatch({
      type: GET_POST,
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

// Add Comment
export const addComment = (postId, text) => async (dispatch) => {
  try {
    const res = await axios.post('/api/posts/comment/' + postId, text);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment added', 'success'));
  } catch (error) {
    console.error(error.response);
    const { statusText, status } = error.response;
    dispatch({
      type: POST_ERROR,
      payload: { msg: statusText, status: status },
    });
  }
};

// Delete Post
export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `../api/posts/comment/${postId}/${commentId}`
    );
    dispatch({
      type: REMOVE_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment removed', 'success'));
  } catch (error) {
    console.error(error.response);
    const { statusText, status } = error.response;
    dispatch({
      type: POST_ERROR,
      payload: { msg: statusText, status: status },
    });
  }
};

import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR } from './types';

export function getCurrentProfile() {
  return async (dispatch) => {
    try {
      const response = await axios.get('api/profile/me');
      dispatch({
        type: GET_PROFILE,
        payload: response.data,
      });
    } catch (error) {
      console.error(error.response);
      const { statusText, status } = error.response;
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: statusText, status: status },
      });
    }
  };
}

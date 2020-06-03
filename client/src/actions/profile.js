import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from './types';
import { setAlert } from '../actions/alert';

// Get current users profile
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

// Get all profiles
export function getProfiles() {
  return async (dispatch) => {
    try {
      const response = await axios.get('api/profile');
      dispatch({
        type: GET_PROFILES,
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

// Get all profiles
export function getProfileById(userId) {
  return async (dispatch) => {
    try {
      const response = await axios.get('api/profile/user/' + userId);
      dispatch({
        type: GET_PROFILES,
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

// Get Github repos
export function getGithubRepos(username) {
  return async (dispatch) => {
    try {
      const response = await axios.get('api/profile/github/' + username);
      dispatch({
        type: GET_REPOS,
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

// Create or update profile
export function createProfile(formData, history, edit = false) {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const res = await axios.post('/api/profile', formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Profile updated' : 'Profile Created', 'success')
      );
      !edit && history.push('/dashboard');
    } catch (error) {
      console.error(error.response);

      const { errors } = error.response.data;

      error &&
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

      const { statusText, status } = error.response;
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: statusText, status: status },
      });
    }
  };
}

// Add Experience

export function addExperience(formData, history) {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const response = await axios.put(
        '/api/profile/experience',
        formData,
        config
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: response.data,
      });

      dispatch(setAlert('Experience added', 'success'));
      history.push('/dashboard');
    } catch (error) {
      console.error(error.response);

      const { errors } = error.response.data;

      error &&
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

      const { statusText, status } = error.response;
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: statusText, status: status },
      });
    }
  };
}

// Add education

export function addEducation(formData, history) {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const response = await axios.put(
        '/api/profile/education',
        formData,
        config
      );
      dispatch({
        type: UPDATE_PROFILE,
        payload: response.data,
      });

      dispatch(setAlert('Education added', 'success'));
      history.push('/dashboard');
    } catch (error) {
      console.error(error.response);

      const { errors } = error.response.data;

      error &&
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

      const { statusText, status } = error.response;
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: statusText, status: status },
      });
    }
  };
}

// Delete experience

export function deleteExperience(id) {
  return async (dispatch) => {
    try {
      const response = await axios.delete('/api/profile/experience/' + id);

      dispatch({
        type: DELETE_EXPERIENCE,
        payload: response.data,
      });

      dispatch(setAlert('Experience removed', 'success'));
    } catch (error) {
      console.error(error.response);

      const { errors } = error.response.data;

      error &&
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

      const { statusText, status } = error.response;
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: statusText, status: status },
      });
    }
  };
}

// Delete education
export function deleteEducation(id) {
  return async (dispatch) => {
    try {
      const response = await axios.delete('/api/profile/education/' + id);

      dispatch({
        type: DELETE_EDUCATION,
        payload: response.data,
      });

      dispatch(setAlert('Education removed', 'success'));
    } catch (error) {
      console.error(error.response);

      const { errors } = error.response.data;

      error &&
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

      const { statusText, status } = error.response;
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: statusText, status: status },
      });
    }
  };
}

// Delete account & profile

export function deleteAccount() {
  return async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone')) {
      try {
        const response = await axios.delete('/api/profile/');

        dispatch({
          type: CLEAR_PROFILE,
        });

        dispatch({
          type: ACCOUNT_DELETED,
        });

        dispatch(setAlert('Account deleted'));
      } catch (error) {
        console.error(error.response);

        const { errors } = error.response.data;

        error &&
          errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

        const { statusText, status } = error.response;
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: statusText, status: status },
        });
      }
    }
  };
}

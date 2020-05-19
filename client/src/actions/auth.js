import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from './types';

// Load User

export function loadUser() {
  return (dispatch) => {
    axios
      .get('api/auth')
      .then((response) => {
        const user = response.data;
        console.log('user', user);
        dispatch({
          type: USER_LOADED,
          payload: user,
        });
      })
      .catch((error) => {
        console.log('error', error.response);
        dispatch({
          type: AUTH_ERROR,
        });
      });
  };
}

// Register User
export function register(name, email, password) {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post('api/users', body, config);

      console.log('respuesta', res.data);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (error) {
      const { errors } = error.response.data;

      error &&
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

      dispatch({
        type: REGISTER_FAIL,
      });
      console.error(error.message);
    }
  };
}

// Register User
export function login(email, password) {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('api/auth', body, config);

      console.log('respuesta', res.data);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (error) {
      const { errors } = error.response.data;

      error &&
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

      dispatch({
        type: LOGIN_FAIL,
      });
      console.error(error.message);
    }
  };
}

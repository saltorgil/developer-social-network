import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

function Register() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [formData, setFromData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    invitationCode: '',
  });

  const { name, email, password, password2, invitationCode } = formData;

  function onChange(event) {
    const { name, value } = event.target;
    setFromData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    password !== password2 && invitationCode
      ? dispatch(setAlert('Passwords do not match', 'danger'))
      : dispatch(register(name, email, password, invitationCode));
  }

  if (isAuthenticated) return <Redirect to='/dashboard' />;

  return (
    <>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Invitation Code'
            name='invitationCode'
            value={invitationCode}
            onChange={onChange}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </>
  );
}

export default Register;

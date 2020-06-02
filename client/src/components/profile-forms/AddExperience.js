import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addExperience } from '../../actions/profile';

function AddExperience() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    current: false,
    to: '',
    description: '',
  });

  const [toDateDisabled, setToDateDisabled] = useState(false);

  const { title, company, location, from, current, to, description } = formData;

  function onChange(event) {
    const { name, value, type, checked } = event.target;
    if (type !== 'checkbox') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: checked,
      });
      setToDateDisabled(!toDateDisabled);
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch(addExperience(formData, history));
  }

  return (
    <>
      {' '}
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            value={company}
            onChange={onChange}
            name='company'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            value={location}
            onChange={onChange}
            name='location'
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' value={from} onChange={onChange} name='from' />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              value={current}
              checked={current}
              onChange={onChange}
              name='current'
            />{' '}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            value={to}
            onChange={onChange}
            name='to'
            disabled={toDateDisabled}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            value={description}
            onChange={onChange}
            cols='30'
            rows='5'
            placeholder='Job Description'></textarea>
        </div>
        <input
          type='submit'
          onClick={onSubmit}
          className='btn btn-primary my-1'
        />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  );
}

export default AddExperience;

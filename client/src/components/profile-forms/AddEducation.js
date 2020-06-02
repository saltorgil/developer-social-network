import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEducation } from '../../actions/profile';

function AddEducation() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    degree: '',
    school: '',
    fieldofstudy: '',
    from: '',
    current: false,
    to: '',
    description: '',
  });

  const [toDateDisabled, setToDateDisabled] = useState(false);

  const {
    degree,
    school,
    fieldofstudy,
    from,
    current,
    to,
    description,
  } = formData;

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
    dispatch(addEducation(formData, history));
  }

  return (
    <>
      {' '}
      <h1 className='large text-primary'>Add your Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any school or bootcamp that
        you have attended
      </p>
      <small>* = required field</small>
      <form className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            value={degree}
            onChange={onChange}
            name='degree'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field of study'
            value={fieldofstudy}
            onChange={onChange}
            name='fieldofstudy'
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
            Current Education
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
            placeholder='School description'></textarea>
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

export default AddEducation;

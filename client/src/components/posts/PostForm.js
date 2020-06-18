import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../actions/post';

function PostForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onChangeTextarea = (event) => {
    setText(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(addPost({ text }));
    setText('');
  };

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form onSubmit={submitForm} className='form my-1'>
        <textarea
          onChange={onChangeTextarea}
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          required></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
}

export default PostForm;

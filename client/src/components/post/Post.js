import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost, addComment } from '../../actions/post';
import { useParams, Link } from 'react-router-dom';
import CommentItem from './CommentItem';

function Post() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.post);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(addComment(id, { text }));
    setText('');
  };

  return loading || post === null ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to='profile.html'>
            <img className='round-img' src={post.avatar} alt='' />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{post.text}</p>
        </div>
      </div>

      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Leave A Comment</h3>
        </div>
        <form onSubmit={onSubmit} className='form my-1'>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Comment on this post'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>

      {post.comments !== null ? (
        post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={id} />
        ))
      ) : (
        <>No comments</>
      )}
    </React.Fragment>
  );
}

export default Post;

import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

function PostItem({ post }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { _id, text, name, avatar, user, likes, comments, date } = post;

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={'/profile/' + user}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button type='button' className='btn btn-light'>
          <i
            onClick={() => dispatch(addLike(_id))}
            className='fas fa-thumbs-up'></i>
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button
          type='button'
          onClick={() => dispatch(removeLike(_id))}
          className='btn btn-light'>
          <i className='fas fa-thumbs-down'></i>
        </button>
        <Link to={'/post/' + _id} className='btn btn-primary'>
          Discussion {comments.length > 0 && <span> {comments.length}</span>}
        </Link>
        {auth && user === auth.user._id && (
          <button
            type='button'
            onClick={() => dispatch(deletePost(_id))}
            className='btn btn-danger'>
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default PostItem;

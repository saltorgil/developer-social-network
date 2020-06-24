import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { removeComment } from '../../actions/post';

function CommentItem({ comment, postId }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { _id, text, name, avatar, user, date } = comment;

  const onClick = () => {
    dispatch(removeComment(postId, _id));
  };

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
        {!auth.loading && auth.user._id === user && (
          <button onClick={onClick} type='button' className='btn btn-danger'>
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default CommentItem;

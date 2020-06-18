import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm.js';

function Posts() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Welcome to the community
      </p>
      <PostForm />
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </React.Fragment>
  );
}

export default Posts;

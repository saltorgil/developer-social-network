import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';

function Posts() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    const posts = dispatch(getPosts());
  }, [getPosts, dispatch]);

  return <div>Posts</div>;
}

export default Posts;

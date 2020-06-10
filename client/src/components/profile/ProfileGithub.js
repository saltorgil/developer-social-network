import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileGithubItem from './ProfileGithubItem';

function ProfileGithub({ username }) {
  const dispatch = useDispatch();
  const { repos, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getGithubRepos(username));
  }, [dispatch, username]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        repos && (
          <div className='profile-github'>
            <h2 className='text-primary my-1'>
              <i className='fab fa-github'></i> Github Repos
            </h2>
            {repos.map((repo) => (
              <ProfileGithubItem key={repo.node_id} repo={repo} />
            ))}
          </div>
        )
      )}
    </>
  );
}

export default ProfileGithub;

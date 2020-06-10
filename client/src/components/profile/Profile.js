import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { useParams, Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

function Profile() {
  const dispatch = useDispatch();
  const {
    profile: { profile, loading },
    auth,
  } = useSelector((state) => state);
  const { id } = useParams();

  useState(() => {
    dispatch(getProfileById(id));
  }, [dispatch]);

  const profileButtons = (
    <>
      <Link to='/profiles' className='btn btn-light'>
        Back to profiles
      </Link>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <Link to='/edit-profile' className='btn btn-dark'>
            Edit profile
          </Link>
        )}
    </>
  );

  return (
    <React.Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {profileButtons}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileExperience profile={profile} />
            <ProfileEducation profile={profile} />
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Profile;

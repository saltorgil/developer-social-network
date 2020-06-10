import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from '../../components/profiles/ProfileItem';

function Profiles() {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  const profileItem = () => {
    return profiles.map((profile) => (
      <ProfileItem key={profile._id} profile={profile} />
    ));
  };

  const allProfiles =
    profiles.length > 0 ? profileItem() : <h4>No Profiles found</h4>;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'>
              Browse and connect with developers
            </i>
          </p>
          <div className='profiles'>{allProfiles}</div>
        </React.Fragment>
      )}
    </>
  );
}

export default Profiles;

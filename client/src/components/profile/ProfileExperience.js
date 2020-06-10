import React from 'react';
import ProfileExperienceItem from './ProfileExperienceItem.js';

function ProfileExperience({ profile }) {
  return (
    <div className='profile-exp bg-white p-2'>
      <h2 className='text-primary'>Experience</h2>
      {profile.experience.length > 0 ? (
        <>
          {profile.experience.map((experience) => (
            <ProfileExperienceItem
              key={experience._id}
              experience={experience}
            />
          ))}
        </>
      ) : (
        <h4>No experience credentials</h4>
      )}
    </div>
  );
}

export default ProfileExperience;

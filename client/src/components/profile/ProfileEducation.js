import React from 'react';
import ProfileEducationItem from './ProfileEducationItem';

function ProfileEducation({ profile }) {
  return (
    <div className='profile-edu bg-white p-2'>
      <h2 className='text-primary'>Education</h2>
      {profile.education.length > 0 ? (
        <>
          {profile.education.map((education) => (
            <ProfileEducationItem key={education._id} education={education} />
          ))}
        </>
      ) : (
        <h4>No education </h4>
      )}
    </div>
  );
}

export default ProfileEducation;

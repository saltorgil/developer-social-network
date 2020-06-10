import React from 'react';

function ProfileAbout({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) {
  const skillsContent = skills.map((skill, index) => (
    <div key={index} className='p-1'>
      <i className='fa fa-check'></i>
      {skill}
    </div>
  ));
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <>
          <h2 className='text-primary'>{name.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
        </>
      )}
      <div className='line'></div>
      <h2 className='text-primary'>Skill Set</h2>
      {skills && <div className='skills'>{skillsContent}</div>}
    </div>
  );
}

export default ProfileAbout;

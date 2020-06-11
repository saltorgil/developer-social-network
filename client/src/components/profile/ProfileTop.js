import React from 'react';
import { Link } from 'react-router-dom';

function ProfileTop({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) {
  function onClick(social) {
    window.open(social, '_blank');
  }

  const socialContent = (
    <>
      {website && (
        <Link
          onClick={onClick(website)}
          target='_blank'
          rel='noopener noreferrer'>
          <i className='fas fa-globe fa-2x'></i>
        </Link>
      )}
      {social.twitter && (
        <Link
          onClick={onClick(social.twitter)}
          target='_blank'
          rel='noopener noreferrer'>
          <i className='fab fa-twitter fa-2x'></i>
        </Link>
      )}
      {social.youtube && (
        <Link
          onClick={onClick(social.youtube)}
          target='_blank'
          rel='noopener noreferrer'>
          <i className='fab fa-youtube fa-2x'></i>
        </Link>
      )}
      {social.facebook && (
        <Link
          onClick={onClick(social.facebook)}
          target='_blank'
          rel='noopener noreferrer'>
          <i className='fab fa-facebook fa-2x'></i>
        </Link>
      )}
      {social.instagram && (
        <Link
          onClick={onClick(social.instagram)}
          target='_blank'
          rel='noopener noreferrer'>
          <i className='fab fa-instagram fa-2x'></i>
        </Link>
      )}
      {social.linkedin && (
        <Link onClick={onClick(social.linkedin)}>
          <i className='fab fa-linkedin fa-2x'></i>
        </Link>
      )}
    </>
  );

  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar} alt='avatar' />
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {status} {company && <span>at {company}</span>}{' '}
      </p>
      <p>{location && <span>{location}</span>}</p>
      {social && <div className='icons my-1'>{socialContent}</div>}
    </div>
  );
}

export default ProfileTop;

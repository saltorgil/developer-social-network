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
  const { twitter, facebook, instagram, youtube, linkedin } = social;

  function onClick(event) {
    console.log(event.target);
    window.open(event.target.dataset.social, '_blank');
  }

  const socialContent = (
    <>
      {website && (
        <Link onClick={onClick}>
          <i className='fas fa-globe fa-2x' data-social={website}></i>
        </Link>
      )}
      {twitter && (
        <Link onClick={onClick}>
          <i className='fab fa-twitter fa-2x' data-social={twitter}></i>
        </Link>
      )}
      {youtube && (
        <Link onClick={onClick}>
          <i className='fab fa-youtube fa-2x' data-social={youtube}></i>
        </Link>
      )}
      {facebook && (
        <Link onClick={onClick}>
          <i className='fab fa-facebook fa-2x' data-social={facebook}></i>
        </Link>
      )}
      {instagram && (
        <Link onClick={onClick}>
          <i className='fab fa-instagram fa-2x' data-social={instagram}>
            {' '}
          </i>
        </Link>
      )}
      {linkedin && (
        <Link onClick={onClick}>
          <i className='fab fa-linkedin fa-2x' data-social={linkedin}></i>
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

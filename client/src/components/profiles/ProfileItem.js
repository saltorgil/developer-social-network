import React from 'react';
import { Link } from 'react-router-dom';

function ProfileItem({ profile }) {
  const {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  } = profile;

  const allSkills = () => {
    return skills.slice(0, 4).map((skill, i) => (
      <li key={i} className='text-primary'>
        <i className='fas fa-check'>{skill}</i>
      </li>
    ));
  };

  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='avatar' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={'/profile/' + _id} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>{allSkills()}</ul>
    </div>
  );
}

export default ProfileItem;

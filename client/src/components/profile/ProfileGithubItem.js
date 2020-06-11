import React from 'react';
import { Link } from 'react-router-dom';

function ProfileGithubItem({
  repo: {
    html_url,
    name,
    description,
    stargazers_count,
    watchers_count,
    forks_count,
  },
}) {
  function onClick(url) {
    window.open(url, '_blank');
  }

  return (
    <div className='repo bg-white p-1 my-1'>
      <div>
        <h4>
          <Link
            onClick={onClick(html_url)}
            target='_blank'
            rel='noopener noreferrer'>
            {name}
          </Link>
        </h4>
        <p>{description}</p>
      </div>
      <div>
        <ul>
          <li className='badge badge-primary'>Stars: {stargazers_count}</li>
          <li className='badge badge-dark'>Watchers: {watchers_count}</li>
          <li className='badge badge-light'>Forks: {forks_count}</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileGithubItem;

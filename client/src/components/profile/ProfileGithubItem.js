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
  function onClick(event) {
    window.open(event.target.dataset.github, '_blank');
  }

  return (
    <div className='repo bg-white p-1 my-1'>
      <div>
        <h4>
          <Link onClick={onClick} data-github={html_url}>
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

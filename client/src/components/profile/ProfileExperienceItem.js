import React from 'react';
import Moment from 'react-moment';

function ProfileExperienceItem({
  experience: { company, current, description, from, to, title },
}) {
  const now = current ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>;
  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> - {now}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      {description && (
        <p>
          <strong>Description:</strong> {description}
        </p>
      )}
    </div>
  );
}

export default ProfileExperienceItem;

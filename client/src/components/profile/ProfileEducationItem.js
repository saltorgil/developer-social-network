import React from 'react';
import Moment from 'react-moment';

function ProfileEducationItem({
  education: { school, degree, fieldofstudy, current, description, from, to },
}) {
  const now = current ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>;
  return (
    <div>
      <h3 className='text-dark'>{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> - {now}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      {fieldofstudy && (
        <p>
          <strong>FieldOfStudy:</strong> {fieldofstudy}
        </p>
      )}
      {description && (
        <p>
          <strong>Description:</strong> {description}
        </p>
      )}
    </div>
  );
}

export default ProfileEducationItem;

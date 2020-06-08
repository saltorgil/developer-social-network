import React from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';

function Experience({ experience }) {
  const experiences = experience.map((experience) => {
    const { _id, company, title, from, to } = experience;
    const now = to === null ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>;

    return (
      <tr key={_id}>
        <td>{company}</td>
        <td className='hide-sm'>{title}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{from}</Moment> - {now}
        </td>
        <td>
          <button
            onClick={() => dispatch(deleteExperience(_id))}
            className='btn btn-danger'>
            Delete
          </button>
        </td>
      </tr>
    );
  });

  const dispatch = useDispatch();

  return (
    <>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
}

export default Experience;

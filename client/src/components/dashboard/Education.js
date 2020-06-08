import React from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';

function Education({ education }) {
  const dispatch = useDispatch();

  const educations = education.map((education) => {
    const { _id, school, degree, from, to } = education;
    const now = to === null ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>;
    return (
      <tr key={_id}>
        <td>{school}</td>
        <td className='hide-sm'>{degree}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{from}</Moment> - {now}
        </td>
        <td>
          <button
            onClick={() => dispatch(deleteEducation(_id))}
            className='btn btn-danger'>
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2 className='my-2'>Education credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Education</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
}

export default Education;

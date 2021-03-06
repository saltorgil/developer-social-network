import React from 'react';

function NotFound() {
  return (
    <>
      <h1 className='xlarge text-primary'>
        <i className='fas fa-exclamation-triangle'></i>Page Not Found
      </h1>
      <p className='large'>Sorry, this page does not exist</p>
    </>
  );
}

export default NotFound;

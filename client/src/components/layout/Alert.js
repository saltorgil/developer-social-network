import React from 'react';
import { useSelector } from 'react-redux';

function Alert() {
  const alerts = useSelector((state) => state.alerts);
  if (alerts !== null && alerts.length > 0) {
    return alerts.map((alert) => {
      const { id, msg, alertType } = alert;
      return (
        <div key={id} className={'alert alert-' + alertType}>
          {msg}
        </div>
      );
    });
  } else return null;
}

export default Alert;

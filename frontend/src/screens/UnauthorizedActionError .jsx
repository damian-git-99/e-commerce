import React from 'react';
import { Alert } from 'react-bootstrap';

export const UnauthorizedActionError = () => {
  return (
    <Alert variant='info p-4 text-center'>
      <p>You are not authorized to perform this action.</p>
    </Alert>
  );
};

import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/config';

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;

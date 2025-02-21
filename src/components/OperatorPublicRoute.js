import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists
  return isAuthenticated ? <Navigate to="/operator_dashboard" /> : children;
};

export default PublicRoute;

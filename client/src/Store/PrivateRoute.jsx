import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Store/auth"; // Update the path if needed

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // If user is not logged in, redirect to login page
  if (!isLoggedIn) {
    
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected component
  return children;
};

export default PrivateRoute;

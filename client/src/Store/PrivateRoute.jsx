import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Store/auth"; // Update the path if needed
import { toast } from "react-toastify"; // Import toast

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // If user is not logged in, show a toast and redirect to login page
  if (!isLoggedIn) {
    toast.error("You must be logged in to access this page!", {
      position: "top-center",
      autoClose: 3000,
    });
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected component
  return children;
};

export default PrivateRoute;

import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Store/auth";

export const Logout = () => {
  const { logoutUser } = useAuth(); // Access the correctly named function from the context

  useEffect(() => {
    if (logoutUser) {
      logoutUser(); // Call the logout function
      // toast.success("1 Logout Successful"); // Show success message
    }
  }, [logoutUser]);

  return <Navigate to="/" replace />;
};

export default Logout;

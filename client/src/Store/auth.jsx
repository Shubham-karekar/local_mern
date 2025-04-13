import { createContext, useContext, useEffect, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const authorizationToken = `Bearer ${token}`
  const URI = import.meta.env.VITE_BACKEND_URL;

  // Function to store token in localStorage and update state
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  // Logout function to remove token from localStorage and state
  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  // Function to authenticate user
  const userAuthentication = async () => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        console.error("Authentication failed. Logging out...");
        logoutUser();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user data when token changes
  useEffect(() => {
    userAuthentication();
  }, [token]);

  // Provide context values
  return (
    <AuthContext.Provider
      value={{ token, isLoggedIn: !!token, storeTokenInLS, logoutUser, user, authorizationToken, URI }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return authContextValue;
};

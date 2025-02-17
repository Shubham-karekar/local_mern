import { useState, useEffect } from "react"; 
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../Store/auth";
import { toast } from "react-toastify";
import { useTheme } from "../../Context/ThemeContext";

export const UserLayouts = () => {
  const { id } = useParams(); 
  const { authorizationToken } = useAuth();
  const { theme } = useTheme();
  
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: ""
  }); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Fetch user data by ID
  const getUserById = async () => {
    try {
      console.log(`Fetching user with ID: ${id}`);
      const response = await fetch(`http://localhost:5000/admin/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken, 
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching user: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched user data:", data);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getUserById();
    }
  }, [id]); 

  // Handle form submission (Update User)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/admin/user/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken, 
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Error updating user");
      }

      const updatedUser = await response.json();
      console.log("Updated user data:", updatedUser);
      setUser(updatedUser);
      toast.success("User updated successfully.");
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Error updating user. Please try again.");
    }
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className={`min-vh-100 d-flex justify-content-center align-items-center ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <div className={`container p-4 shadow-lg rounded ${theme === "dark" ? "bg-secondary text-white" : "bg-white text-dark"}`} style={{ maxWidth: "500px" }}>
        <h2 className="mb-4 text-center">Edit User</h2>

        {loading && <div className="alert alert-info text-center">Loading...</div>}
        {error && <div className="alert alert-danger text-center">Error: {error}</div>}

        {!loading && !error && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className={`form-control ${theme === "dark" ? "bg-dark text-white border-secondary" : ""}`}
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${theme === "dark" ? "bg-dark text-white border-secondary" : ""}`}
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="text"
                className={`form-control ${theme === "dark" ? "bg-dark text-white border-secondary" : ""}`}
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Update User</button>
              <Link to="/admin/users" className="btn btn-secondary">Cancel</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

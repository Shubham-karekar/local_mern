import { useEffect, useState } from "react";
import { useAuth } from "../Store/auth";
import { Link } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

export const AdminUser = () => {
    const { authorizationToken } = useAuth();
    const { theme } = useTheme();
    const [users, setUsers] = useState([]);

    // Fetch all users
    const getAllUsersData = async () => {
        try {
            const response = await fetch("http://localhost:5000/admin/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Fetched users:", data);
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    };

    // Delete a user
    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const response = await fetch(`http://localhost:5000/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete user. Error ${response.status}`);
            }

            // Refresh user list after deletion
            setUsers(users.filter(user => user._id !== id));

            console.log(`User with ID ${id} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting user:", error.message);
        }
    };

    useEffect(() => {
        if (authorizationToken) {
            getAllUsersData();
        }
    }, [authorizationToken]); // Ensures effect runs only when token changes

    return (
        <div className={`min-vh-100 p-4 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <div className={`container p-4 rounded shadow-lg ${theme === "dark" ? "bg-secondary text-white" : "bg-white text-dark"}`}>
                <h2 className="mb-4 text-center">Admin User Management</h2>

                <table className={`table table-bordered ${theme === "dark" ? "table-dark" : "table-light"}`}>
                    <thead className={theme === "dark" ? "thead-light" : "thead-dark"}>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((curUser) => (
                                <tr key={curUser._id}>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td>{curUser.phone}</td>
                                    <td>
                                        <Link to={`/admin/user/${curUser._id}/update`}>
                                            <button className="btn btn-warning">Edit</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteUser(curUser._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-3">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

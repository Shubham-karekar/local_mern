import { useEffect, useState } from "react";
import { useAuth } from "../Store/auth";
import { useTheme } from "../Context/ThemeContext";

export const AdminContact = () => {
    const { authorizationToken } = useAuth();
    const { theme } = useTheme();
    const [contacts, setContacts] = useState([]);

    // Fetch all contacts
    const getAllContacts = async () => {
        try {
            const response = await fetch("http://localhost:5000/admin/contact", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const contactData = await response.json();
            console.log("Fetched contacts:", contactData);
            setContacts(contactData);
        } catch (error) {
            console.error("Failed to fetch contacts:", error.message);
        }
    };

    // Delete a contact
    const deleteContact = async (id) => {
        if (!window.confirm("Are you sure you want to delete this contact?")) return;

        try {
            const response = await fetch(`http://localhost:5000/admin/contact/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to delete contact. Error ${response.status}`);
            }

            setContacts((prevContacts) => prevContacts.filter(contact => contact._id !== id));

            console.log(`Contact with ID ${id} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting contact:", error.message);
        }
    };

    useEffect(() => {
        if (authorizationToken) {
            getAllContacts();
        }
    }, [authorizationToken]);

    return (
        <div className={`min-vh-100 p-4 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <div className={`container p-4 rounded shadow-lg ${theme === "dark" ? "bg-secondary text-white" : "bg-white text-dark"}`}>
                <h2 className="mb-4 text-center">Admin Contact List</h2>

                <table className={`table table-bordered ${theme === "dark" ? "table-dark" : "table-light"}`}>
                    <thead className={theme === "dark" ? "thead-light" : "thead-dark"}>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Message</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.length > 0 ? (
                            contacts.map((contact) => (
                                <tr key={contact._id}>
                                    <td>{contact.username}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.message}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteContact(contact._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-3">No contacts found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

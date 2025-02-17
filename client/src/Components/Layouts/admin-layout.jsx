import { NavLink, Outlet } from "react-router-dom"; 
import { FaUser } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { useTheme } from "../../Context/ThemeContext";

export const AdminLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={`d-flex min-vh-100 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
      
      {/* Sidebar */}
      <div className={`d-flex flex-column flex-shrink-0 p-3 vh-100 ${theme === "dark" ? "bg-secondary text-white" : "bg-light text-dark"}`} style={{ width: "250px" }}>
        <h4 className="text-center mb-4">Admin Panel</h4>
        
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink className={`nav-link ${theme === "dark" ? "text-white" : "text-dark"}`} to="/admin/user">
              <FaUser className="me-2" /> Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={`nav-link ${theme === "dark" ? "text-white" : "text-dark"}`} to="/admin/contact">
              <IoMdContact className="me-2" /> Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={`nav-link ${theme === "dark" ? "text-white" : "text-dark"}`} to="/">
              <IoHome className="me-2" /> Home
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className={`card shadow-lg p-4 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
          <Outlet /> {/* This will render child components like Users & Contact */}
        </div>
      </div>
    </div>
  );
};

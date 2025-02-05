import React, { useState } from "react"; 
import { SlBasket } from "react-icons/sl";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../Store/auth";
import { useCartContext } from "../Context/CartContext";
import LoadingBar from "react-top-loading-bar";
import { useTheme } from "../Context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa"; // import icons

export default function Navbar() {
  const { isLoggedIn } = useAuth();
  const { total_item } = useCartContext();
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const handleNavigation = () => {
    setProgress(30);
    setTimeout(() => setProgress(100), 800);
  };

  return (
    <div className={theme}>
      <LoadingBar
        color="#0d6efd"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <nav className={`navbar navbar-expand-lg ${theme === "dark" ? "bg-dark navbar-dark" : "bg-light navbar-light"} shadow-sm`}>
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold fs-4" to="/" onClick={handleNavigation}>
            ShopMate
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <NavLink className="nav-link fw-medium mx-2" to="/" onClick={handleNavigation}>Home</NavLink>
              <NavLink className="nav-link fw-medium mx-2" to="/About" onClick={handleNavigation}>About</NavLink>
              <NavLink className="nav-link fw-medium mx-2" to="/Contact" onClick={handleNavigation}>Contact</NavLink>

              {isLoggedIn ? (
                <>
                  <NavLink className="nav-link fw-medium mx-2" to="/Product" onClick={handleNavigation}>Products</NavLink>
                  <NavLink className="nav-link fw-medium mx-2" to="/logout" onClick={handleNavigation}>Logout</NavLink>

                  <NavLink to="/Cart" className="nav-link position-relative mx-2" onClick={handleNavigation}>
                    <SlBasket size={28} className={` ${theme === "dark" ? "text-light" : "text-dark"}`} />
                    {total_item > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow-sm"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {total_item}
                      </span>
                    )}
                  </NavLink>
                </>
              ) : (
                <NavLink to="/login" className="ms-3" onClick={handleNavigation}>
                  <button className="btn btn-outline-primary fw-bold">Login</button>
                </NavLink>
              )}

              {/* theme switch with icons */}
              <li className="nav-item align-items-center d-flex mx-2">

                <div className="ms-2 form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="themingSwitcher"
                    onChange={toggleTheme}
                    checked={theme === "dark"}
                  />
                </div>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

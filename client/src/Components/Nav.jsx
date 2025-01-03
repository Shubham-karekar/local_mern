import React from "react";
import { SlBasket } from "react-icons/sl";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Store/auth";

export default function Navbar() {
  const { isLoggedIn } = useAuth(); // Corrected variable name
  return (
    <div>
      <nav className="navbar bg-body-tertiary" style={{ boxShadow: "0 4px 20px" }}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img
              src="/docs/5.3/assets/brand/bootstrap-logo.svg"
              alt="Logo"
              width={30}
              height={24}
              className="d-inline-block align-text-top"
            />
          </NavLink>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
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
                <div className="navbar-nav">
                  <NavLink className="navbar-brand" to="/">
                    Home
                  </NavLink>
                  <NavLink className="navbar-brand mx-4" to="/About">
                    About
                  </NavLink>

                  <NavLink className="navbar-brand mx-4" to="/Contact">
                    Contact
                  </NavLink>
                  {isLoggedIn ? (
                    <>
                      <NavLink className="navbar-brand mx-4" to="/Product">
                        Products
                      </NavLink>
                      <NavLink className="navbar-brand mx-4" to="/logout">
                        Logout
                      </NavLink>
                      <NavLink to="/Cart">
                        <SlBasket size={40} className="navbar-brand mx-4" />
                      </NavLink>

                    </>
                  ) : (
                    <>
                      <NavLink to="/login">
                        <button
                          variant="light"
                          className="btn btn-outline-primary navbar-brand mx-4"
                        >
                          Login
                        </button>
                      </NavLink>

                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </nav>
    </div>
  );
}

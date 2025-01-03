import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* Contact Short Section */}
      <section className="contact-short bg-light d-flex align-items-center py-5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 text-center">
              <h3 className="font-weight-bold mb-3">Ready to get started?</h3>
              <h3 className="font-weight-bold">Talk to us today</h3>
            </div>
            <div className="col-md-6 text-md-right text-center mt-3 mt-md-0">
              <NavLink to="/" className="btn btn-outline-primary btn-lg">
                Get Started
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            {/* About Section */}
            <div className="col-md-3 mb-4 mx-auto">
              <h3 className="font-weight-bold mb-4">Stationary</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. The
                href attribute requires a valid value to be accessible. Provide
                a valid, navigable address as the href value.
              </p>
            </div>

            {/* Useful Links */}
            <div className="col-md-3 mb-4 mx-auto">
              <h3 className="font-weight-bold mb-4">Useful Links</h3>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
              />
              <p>
                <NavLink to="/" className="text-white text-decoration-none">
                  Home
                </NavLink>
              </p>
              <p>
                <NavLink
                  to="/about"
                  className="text-white text-decoration-none"
                >
                  About Us
                </NavLink>
              </p>
              <p>
                <NavLink
                  to="/contact"
                  className="text-white text-decoration-none"
                >
                  Contact
                </NavLink>
              </p>
              <p>
                <NavLink
                  to="/administration"
                  className="text-white text-decoration-none"
                >
                  All Products
                </NavLink>
              </p>
            </div>

            {/* Contact Info */}
            <div className="col-md-3 mb-4 mx-auto">
              <h3 className="font-weight-bold mb-4">Call Us</h3>
              <h4>+91 12345678978</h4>
              <p>
                Plot no 55/b, Shop no 780, Opposite Fin Mall, Above Market
                Glover Pune City, Maharashtra, India <br />
                PINCODE- 411090
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom-section mt-5">
          <div className="container">
            <hr className="bg-white" />
            <div className="row">
              <div className="col-md-6 text-center text-md-left">
                <p className="mb-0">
                  &copy; {new Date().getFullYear()} All Rights Reserved
                </p>
              </div>
              <div className="col-md-6 text-center text-md-right">
                <p className="mb-0">
                  <a href="#" className="text-white text-decoration-none">
                    Privacy Policy
                  </a>
                  {" | "}
                  <a href="#" className="text-white text-decoration-none">
                    Terms & Conditions
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

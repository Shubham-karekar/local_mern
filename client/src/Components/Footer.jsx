import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <>
      {/* Contact Short Section */}
      <section className={`contact-short py-5 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"}`}>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 text-center">
              <h3 className="font-weight-bold mb-3">Ready to get started?</h3>
              <h3 className="font-weight-bold">Talk to us today</h3>
            </div>
            <div className="col-md-6 text-md-right text-center mt-3 mt-md-0">
              <NavLink to="/" className="btn btn-primary btn-lg">
                Get Started
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={`py-5 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"}`}>
        <div className="container">
          <div className="row">
            {/* About Section */}
            <div className="col-md-3 mb-4 mx-auto">
              <h3 className="font-weight-bold mb-4 text-primary">ShopMate</h3>
              <p>
                Your go-to destination for quality products and seamless shopping experience.
              </p>
            </div>

            {/* Useful Links */}
            <div className="col-md-3 mb-4 mx-auto">
              <h3 className="font-weight-bold mb-4 text-primary">Useful Links</h3>
              <hr className={`mb-4 mt-0 d-inline-block mx-auto ${isDarkMode ? "bg-gray-700" : "bg-gray-400"}`} style={{ width: 60, height: 2 }} />
              <p><NavLink to="/" className={`text-decoration-none ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Home</NavLink></p>
              <p><NavLink to="/about" className={`text-decoration-none ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>About Us</NavLink></p>
              <p><NavLink to="/contact" className={`text-decoration-none ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Contact</NavLink></p>
              <p><NavLink to="/administration" className={`text-decoration-none ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>All Products</NavLink></p>
            </div>

            {/* Contact Info */}
            <div className="col-md-3 mb-4 mx-auto">
              <h3 className="font-weight-bold mb-4 text-primary">Call Us</h3>
              <h4 className="text-secondary">+91 12345678978</h4>
              <p>
                Plot no 55/b, Shop no 780, Opposite Fin Mall, Pune, Maharashtra, India <br />
                PINCODE- 411090
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom-section mt-5">
          <div className="container">
            <hr className={isDarkMode ? "bg-gray-700" : "bg-gray-400"} />
            <div className="row">
              <div className="col-md-6 text-center text-md-left">
                <p className="mb-0">&copy; {new Date().getFullYear()} ShopMate. All Rights Reserved</p>
              </div>
              <div className="col-md-6 text-center text-md-right">
                <p className="mb-0">
                  <NavLink to="/privacy-policy" className={`text-decoration-none ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Privacy Policy</NavLink>
                  {" | "}
                  <NavLink to="/terms-conditions" className={`text-decoration-none ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Terms & Conditions</NavLink>
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

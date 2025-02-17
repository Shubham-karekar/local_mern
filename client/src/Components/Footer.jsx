import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useTheme } from "../Context/ThemeContext";
import "../App.css"

const Footer = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // State for Modal
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Contact Short Section */}
      <section className={`contact-short py-5 ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 text-center">
              <h3 className="fw-bold mb-3">Ready to get started?</h3>
              <h3 className="fw-bold">Talk to us today</h3>
            </div>
            <div className="col-md-6 text-md-right text-center mt-3 mt-md-0">
              {/* Button to Open Side Modal */}
              <Button variant="primary" className="btn-lg" onClick={() => setShow(true)}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Side Modal and make it chatbot lilev*/}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        animation={true}
        dialogClassName="modal-side"
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton className={isDarkMode ? "bg-dark text-white" : "bg-light"}>
          <Modal.Title>Chat With Us</Modal.Title>
        </Modal.Header>

        <Modal.Body className={isDarkMode ? "bg-dark text-light" : "bg-white"}>
          <p>Welcome to ShopMate! How can we assist you today?</p>
        </Modal.Body>

        <Modal.Footer className={isDarkMode ? "bg-dark text-light" : "bg-light"}>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <NavLink to="/chatbot" className="btn btn-primary">
            Go to Chatbot
          </NavLink>
        </Modal.Footer>
      </Modal>

      {/* Footer Section */}
      <footer className={`py-5 ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
        <div className="container">
          <div className="row">
            {/* About Section */}
            <div className="col-md-3 mb-4 mx-auto">
              <h3 className="fw-bold mb-4 text-primary">ShopMate</h3>
              <p>Your go-to destination for quality products and seamless shopping experience.</p>
            </div>

            {/* Useful Links */}
            <div className="col-md-3 mb-4 mx-auto">
              <h3 className="fw-bold mb-4 text-primary">Useful Links</h3>
              <hr className={`mb-4 mt-0 d-inline-block mx-auto ${isDarkMode ? "bg-secondary" : "bg-gray-400"}`} style={{ width: 60, height: 2 }} />
              <p><NavLink to="/" className={`text-decoration-none ${isDarkMode ? "text-light" : "text-dark"}`}>Home</NavLink></p>
              <p><NavLink to="/about" className={`text-decoration-none ${isDarkMode ? "text-light" : "text-dark"}`}>About Us</NavLink></p>
              <p><NavLink to="/contact" className={`text-decoration-none ${isDarkMode ? "text-light" : "text-dark"}`}>Contact</NavLink></p>
            </div>

            {/* Contact Info */}
            <div className="col-md-3 mb-4 mx-auto">
              <h3 className="fw-bold mb-4 text-primary">Call Us</h3>
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
            <hr className={isDarkMode ? "bg-secondary" : "bg-gray-400"} />
            <div className="row">
              <div className="col-md-6 text-center text-md-left">
                <p className="mb-0">&copy; {new Date().getFullYear()} ShopMate. All Rights Reserved</p>
              </div>
              <div className="col-md-6 text-center text-md-right">
                <p className="mb-0">
                  <NavLink to="/privacy-policy" className={`text-decoration-none ${isDarkMode ? "text-light" : "text-dark"}`}>Privacy Policy</NavLink>
                  {" | "}
                  <NavLink to="/terms-conditions" className={`text-decoration-none ${isDarkMode ? "text-light" : "text-dark"}`}>Terms & Conditions</NavLink>
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


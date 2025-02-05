import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Custom CSS for additional styles
import { useTheme } from "../Context/ThemeContext"; // Import the theme context
import "../App.css"

const Trusted = () => {
  const { theme } = useTheme(); // Use the theme context

  return (
    <section className={`brand-section py-5 ${theme === "dark" ? "bg-dark navbar-dark" : "bg-light navbar-light"} shadow-sm`}>
      <div className="container">
        <h4 className={`text-center text-uppercase ${theme === "dark" ? "text-white" : "text-dark"} font-weight-bold mb-4`}>
          Trusted by Over 1000 Leading Companies
        </h4>
        <div className="brand-section-slider d-flex justify-content-between align-items-center flex-wrap">
          {/* Samsung logo */}
          <div className="slide mb-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/512px-Samsung_Logo.svg.png"
              alt="Samsung logo"
              className="img-fluid brand-img transition-transform"
              width={160}
              height={100}
            />
          </div>
          {/* Apple logo */}
          <div className="slide mb-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple logo"
              className="img-fluid brand-img transition-transform"
              width={140}
              height={100}
            />
          </div>
          {/* Sony logo */}
          <div className="slide mb-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/29/Sony_logo.svg"
              alt="Sony logo"
              className="img-fluid brand-img transition-transform"
              width={140}
              height={100}
            />
          </div>
          {/* LG logo */}
          <div className="slide mb-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/20/LG_logo_%282015%29.svg"
              alt="LG logo"
              className="img-fluid brand-img transition-transform"
              width={145}
              height={100}
            />
          </div>
          {/* Dell logo */}
          <div className="slide mb-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Dell_logo_2016.svg"
              alt="Dell logo"
              className="img-fluid brand-img transition-transform"
              width={150}
              height={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trusted;

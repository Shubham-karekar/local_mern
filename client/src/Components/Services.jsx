import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../Context/ThemeContext"; // Import the theme context
import "../App.css"; // Custom CSS for additional styles

const Services = () => {
  const { theme } = useTheme(); // Use the theme context
  const isDarkMode = theme === "dark";

  return (
    <section className={`py-5 ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"} shadow-sm`}>
      <div className="container">
        {/* Section Heading */}
        <h2 className="text-center mb-5 fw-bold">
          Why Shop With <span className="text-primary">ShopMate?</span>
        </h2>

        <div className="row text-center">
          {/* Fast and Free Delivery */}
          <div className="col-md-4 mb-4">
            <div
              className={`service-box p-4 rounded shadow-lg h-100 d-flex flex-column align-items-center justify-content-center 
                ${isDarkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}
            >
              <TbTruckDelivery size={60} className="icon mb-3 text-primary" />
              <h4 className="fw-bold">Fast & Free Delivery</h4>
              <p>Get your products delivered swiftly without any extra cost.</p>
            </div>
          </div>

          {/* Non-contact Shipping & Money-back Guarantee */}
          <div className="col-md-4 mb-4">
            <div className="row">
              {/* Non-contact Shipping */}
              <div className="col-12 mb-4">
                <div
                  className={`service-box p-4 rounded shadow-lg h-100 d-flex flex-column align-items-center justify-content-center 
                    ${isDarkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}
                >
                  <MdSecurity size={60} className="icon mb-3 text-success" />
                  <h4 className="fw-bold">Non-contact Shipping</h4>
                  <p>Safe and secure delivery right to your doorstep.</p>
                </div>
              </div>

              {/* Money-back Guaranteed */}
              <div className="col-12">
                <div
                  className={`service-box p-4 rounded shadow-lg h-100 d-flex flex-column align-items-center justify-content-center 
                    ${isDarkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}
                >
                  <GiReceiveMoney size={60} className="icon mb-3 text-warning" />
                  <h4 className="fw-bold">Money-back Guaranteed</h4>
                  <p>100% refund if you're not satisfied with your purchase.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Secure Payment System */}
          <div className="col-md-4 mb-4">
            <div
              className={`service-box p-4 rounded shadow-lg h-100 d-flex flex-column align-items-center justify-content-center 
                ${isDarkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}
            >
              <RiSecurePaymentLine size={60} className="icon mb-3 text-danger" />
              <h4 className="fw-bold">Secure Payment</h4>
              <p>We use end-to-end encryption for all transactions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

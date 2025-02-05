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

  return (
    <section className={`py-5 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"} shadow-sm`}>
      <div className="container">
        <div className="row text-center">
          {/* Fast and Free Delivery */}
          <div className="col-md-4 mb-4">
            <div className={`service-box p-4 rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center ${theme === "dark" ? "bg-secondary" : "bg-white"}`}>
              <TbTruckDelivery size={60} className="icon mb-3" />
              <h4 className="font-weight-bold">Fast and Free Delivery</h4>
            </div>
          </div>

          {/* Non-contact Shipping & Money-back Guarantee */}
          <div className="col-md-4 mb-4">
            <div className="row">
              <div className="col-12 mb-4">
                <div className={`service-box p-4 rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center ${theme === "dark" ? "bg-secondary" : "bg-white"}`}>
                  <MdSecurity size={60} className="icon mb-3" />
                  <h4 className="font-weight-bold">Non-contact Shipping</h4>
                </div>
              </div>
              <div className="col-12">
                <div className={`service-box p-4 rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center ${theme === "dark" ? "bg-secondary" : "bg-white"}`}>
                  <GiReceiveMoney size={60} className="icon mb-3" />
                  <h4 className="font-weight-bold">Money-back Guaranteed</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Secure Payment System */}
          <div className="col-md-4 mb-4">
            <div className={`service-box p-4 rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center ${theme === "dark" ? "bg-secondary" : "bg-white"}`}>
              <RiSecurePaymentLine size={60} className="icon mb-3" />
              <h4 className="font-weight-bold">Super Secure Payment System</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

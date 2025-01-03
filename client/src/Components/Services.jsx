import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Custom CSS for additional styles

const Services = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="service-box p-4 bg-white rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
              <TbTruckDelivery size={60} className="icon mb-3" />
              <h4 className="font-weight-bold">Fast and Free Delivery</h4>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="row">
              <div className="col-12 mb-4">
                <div className="service-box p-4 bg-white rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
                  <MdSecurity size={60} className="icon mb-3" />
                  <h4 className="font-weight-bold">Non-contact Shipping</h4>
                </div>
              </div>
              <div className="col-12">
                <div className="service-box p-4 bg-white rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
                  <GiReceiveMoney size={60} className="icon mb-3" />
                  <h4 className="font-weight-bold">Money-back Guaranteed</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="service-box p-4 bg-white rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
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

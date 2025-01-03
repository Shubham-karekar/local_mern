import React, { useEffect, useRef } from "react";
import img1 from "../Components/Images/slider2.jpg";
import img2 from "../Components/Images/Slider 2.jpg";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";


export default function Carousal() {
  const carouselRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextButton = carouselRef.current.querySelector(
          '[data-bs-slide="next"]'
        );
        if (nextButton) {
          nextButton.click();
        }
      }
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval);
  }, []);
  // const Carousal = ({ myData = { name: "Your Brand" } }) => {
  //   const { name } = myData;
  return (
    <>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        ref={carouselRef}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container py-5 my-4">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <p className="text-muted display-6">Welcome to Live Sale</p>
                  <h1 className="display-4 fw-bold mb-4">Discount upto 80%</h1>
                  <p className="lead mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestias atque temporibus veniam doloribus libero ad error
                    omnis voluptates animi! Suscipit sapiente.
                  </p>
                  <NavLink to="/Product">
                    <Button
                      variant="light"
                      className="btn-lg btn-outline-primary"
                    >
                      Shop Now
                    </Button>
                  </NavLink>
                </div>
                <div className="col-md-6 text-center">
                  <div className="position-relative">
                    <img
                      src={img1}
                      alt="About Us"
                      className="img- rounded shadow"
                      style={{ maxWidth: "80%", borderRadius: "15px" }}
                    />
                    <div
                      className="position-absolute"
                      style={{
                        content: '""',
                        width: "60%",
                        height: "70%",
                        backgroundColor: "rgba(81, 56, 238, 0.4)",
                        left: "70%",
                        top: "-2rem",
                        zIndex: "-1",
                        transform: "translateX(-50%)",
                        borderRadius: "15px",
                        transition:
                          "width 0.3s ease-in-out, height 0.3s ease-in-out",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container py-5 my-4">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <p className="text-muted display-6">
                    Sale is Live at 8 to 9pm
                  </p>
                  <h1 className="display-4 fw-bold mb-4">Discount upto 30%</h1>
                  <p className="lead mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestias atque temporibus veniam doloribus libero ad error
                    omnis voluptates animi! Suscipit sapiente.
                  </p>
                  <NavLink to="/Product">
                    <Button
                      variant="light"
                      className="btn-lg btn-outline-primary"
                    >
                      Shop Now
                    </Button>
                  </NavLink>
                </div>
                <div className="col-md-6 text-center">
                  <div className="position-relative">
                    <img
                      src={img2}
                      alt="About Us"
                      className="img- rounded shadow"
                      style={{ maxWidth: "80%", borderRadius: "15px" }}
                    />
                    <div
                      className="position-absolute"
                      style={{
                        content: '""',
                        width: "60%",
                        height: "70%",
                        backgroundColor: "rgba(81, 56, 238, 0.4)",
                        left: "70%",
                        top: "-2rem",
                        zIndex: "-1",
                        transform: "translateX(-50%)",
                        borderRadius: "15px",
                        transition:
                          "width 0.3s ease-in-out, height 0.3s ease-in-out",
                      }}
                    ></div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next "
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

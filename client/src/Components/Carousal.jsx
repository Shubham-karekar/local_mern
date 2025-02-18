import React, { useEffect, useRef } from "react";
import img1 from "../Components/Images/slider2.jpg";
import img2 from "../Components/Images/Slider2.jpg";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Store/auth";
import { useTheme } from "../Context/ThemeContext";
import { toast } from "react-toastify";


export default function Carousal() {
  const { theme } = useTheme();
  const carouselRef = useRef(null);
  const { user } = useAuth();
  const { isLoggedIn } = useAuth();

  const handleOnSubmit = () => {
    toast.error("Please Login first")
  }

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
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="carouselExampleFade"
      className={`carousel slide carousel-fade ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
        } shadow-sm`}
      ref={carouselRef}
    >
      <div className="carousel-inner">
        {/* Slide 1 */}
        <div className="carousel-item active">
          <div className="container py-5 my-4">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="display-6">
                  Welcome, {user?.username || "Guest"}!
                </p>
                <h1 className="display-4 fw-bold mb-4">
                  Mega Sale - Up to 80% Off
                </h1>
                <p className="lead mb-4">
                  Unbeatable discounts on your favorite products. Shop now and
                  save big. Don't miss out!
                </p>
                {isLoggedIn ? (
                  <NavLink to="/Product">
                    <Button variant="outline-primary" className="btn-lg">
                      Shop Now
                    </Button>
                  </NavLink>
                ) : (
                  <Button variant="outline-primary" className="btn-lg" onClick={handleOnSubmit}>
                    Shop Now
                  </Button>
                )}

              </div>
              <div className="col-md-6 text-center">
                <img
                  src={img1}
                  alt="Mega Sale"
                  className="img-fluid rounded shadow"
                  style={{ borderRadius: "15px" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <div className="container py-5 my-4">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="display-6">
                  Exclusive Hour: 8 PM to 9 PM
                </p>
                <h1 className="display-4 fw-bold mb-4">
                  Flash Sale - Up to 30% Off
                </h1>
                <p className="lead mb-4">
                  Experience incredible savings during our limited-time flash
                  sale. Shop smarter, save more!
                </p>
                {isLoggedIn ? (
                  <NavLink to="/Product">
                    <Button variant="outline-primary" className="btn-lg">
                      Shop Now
                    </Button>
                  </NavLink>
                ) : (
                  <Button variant="outline-primary" className="btn-lg" onClick={handleOnSubmit}>
                    Shop Now
                  </Button>
                )}

              </div>
              <div className="col-md-6 text-center">
                <img
                  src={img2}
                  alt="Flash Sale"
                  className="img-fluid rounded shadow"
                  style={{ borderRadius: "15px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

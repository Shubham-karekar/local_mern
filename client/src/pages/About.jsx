import React from "react";
import { useAuth } from "../Store/auth";
import { useTheme } from "../Context/ThemeContext";
import Footer from "../Components/Footer";
import img from "../images/laptop.jpg";
import img2 from "../images/great.jpg";
import img3 from "../images/wide_range.jpg";
import img4 from "../images/fast_shipping.jpg";
import Comments from "../Components/Comments";
import "../App.css"; // import custom styles

export const About = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <div className={`min-vh-100 d-flex flex-column ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
      {/* about section */}
      <div className="container my-5 p-4 shadow-sm rounded fade-in">
        <div className="text-center mb-4">
          <h5>Welcome, {user?.username || "Guest"}</h5>
          <h2 className="fw-bold">Your One-Stop Shop for Electronics</h2>
          <p>Explore our wide range of products and shop with ease.</p>
        </div>

        {/* feature sections */}
        {[
          { img: img, title: "Easy Online Shopping", text: "Shop for the latest electronic gadgets with ease." },
          { img: img2, title: "Great Prices", text: "Enjoy competitive prices on a wide range of electronics.", reverse: true },
          { img: img3, title: "Wide Product Range", text: "Explore a diverse selection of electronic gadgets." },
          { img: img4, title: "Fast Shipping", text: "Experience quick and reliable shipping services.", reverse: true }
        ].map(({ img, title, text, reverse }, index) => (
          <div className={`row align-items-center my-4 fade-in ${reverse ? "flex-md-row-reverse" : ""}`} key={index}>
            <div className="col-md-6">
              <img src={img} alt={title} className="img-fluid rounded shadow-sm hover-zoom" />
            </div>
            <div className="col-md-6">
              <div className={`p-4 rounded shadow-sm hover-shadow ${theme === "dark" ? "bg-secondary text-white" : "bg-white text-dark"}`}>
                <h4 className="fw-bold">{title}</h4>
                <p>{text}</p>
              </div>
            </div>
          </div>
        ))}

        {/* testimonial section */}
        <div className={`text-center py-4 rounded mt-5 fade-in slide-up ${theme === "dark" ? "bg-secondary text-white" : "bg-warning text-dark"} shadow-sm`}>
          <p className="fw-bold">
            "ElectroMart has made it so easy for me to find and purchase the latest gadgets I need. Their wide range of products and great prices keep me coming back for more."
          </p>
          <p className="fw-bold">- Yuri Clark</p>
        </div>
      </div>
      <Comments />

      {/* footer */}
      <Footer />
    </div>
  );
};


import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = ({ id, name, image, price, category }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4 mx-auto">
      <NavLink to={`/SingleProduct/${id}`} className="text-decoration-none text-dark">
        <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden hover-shadow-lg transition-transform" style={{ minHeight: "300px" }}>
          <figure className="position-relative m-0">
            <img
              src={image}
              className="card-img-top img-fluid"
              alt={name}
              style={{ transition: "transform 0.3s ease-in-out", height: "200px", objectFit: "cover" }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            />
            <figcaption className="position-absolute top-0 start-0 m-2 p-2 bg-dark text-white rounded text-uppercase small">
              {category}
            </figcaption>
          </figure>
          <div className="card-body d-flex flex-column justify-content-between mx-auto">
            <div>
              <h6 className="card-title text-truncate">{name}</h6>
              <p className="card-text text-muted mb-2">{<FormatPrice price={price} />}</p>
            </div>
            <button className="btn btn-primary btn-sm mt-auto w-100">View Details</button>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Product;


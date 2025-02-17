// import React from "react";
// import { NavLink } from "react-router-dom";
// import FormatPrice from "../Helpers/FormatPrice";
// import { useProductContext } from "../Context/ProductContex";
// import { useAuth } from "../Store/auth";
// import { toast } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useTheme } from "../Context/ThemeContext";

// const Product = () => {
//   const { products, isLoading, isError } = useProductContext();
//   const { isLoggedIn } = useAuth();
//   const { theme } = useTheme();

//   if (isLoading) return <p className="text-center my-5">Loading products...</p>;
//   if (isError || products.length === 0) return <p className="text-center text-danger my-5">Error loading products.</p>;

//   const displayProducts = products.slice(0, 3);

//   const handleUnauthenticatedClick = () => {
//     toast.error("Please login to view details");
//   };

//   return (
//     <div className={`min-vh-90 py-5 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
      
//       {/* Section Heading */}
//       <div className="container text-center mb-5">
//         <h2 className="fw-bold text-uppercase" style={{ letterSpacing: "2px" }}>
//           Our Products
//         </h2>
//         <hr className={`mx-auto ${theme === "dark" ? "bg-light" : "bg-dark"}`} style={{ width: "60px", height: "3px", border: "none" }} />
//       </div>

//       <div className="container">
//         <div className="row justify-content-center g-4">
//           {displayProducts.map(({ id, name, image, price, category }) => (
//             <div key={id} className="col-md-4">
//               <div className={`card h-100 border-0 shadow-lg rounded-4 overflow-hidden transition-all 
//                 ${theme === "dark" ? "bg-secondary text-light" : "bg-white text-dark"}`} 
//                 style={{ transition: "transform 0.3s ease-in-out" }}
//                 onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//                 onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//               >

//                 {/* Product Image */}
//                 <div className="position-relative">
//                   <img
//                     src={image}
//                     alt={name}
//                     className="card-img-top img-fluid"
//                     style={{ height: "230px", objectFit: "cover" }}
//                   />
//                   <span className="badge bg-dark position-absolute top-0 start-0 m-2 px-3 py-1 rounded text-uppercase small">
//                     {category}
//                   </span>
//                 </div>

//                 {/* Product Details */}
//                 <div className="card-body d-flex flex-column p-4">
//                   <h5 className="card-title fw-bold text-truncate">{name}</h5>
//                   <p className={`card-text ${theme === "dark" ? "text-light" : "text-muted"} mb-3`}>
//                     <FormatPrice price={price} />
//                   </p>

//                   {isLoggedIn ? (
//                     <NavLink to={`/SingleProduct/${id}`} className="btn btn-primary btn-sm mt-auto w-100 rounded-pill">
//                       View Details
//                     </NavLink>
//                   ) : (
//                     <button onClick={handleUnauthenticatedClick} className="btn btn-primary btn-sm mt-auto w-100 rounded-pill">
//                       View Details
//                     </button>
//                   )}
//                 </div>

//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;

import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";
import { useProductContext } from "../Context/ProductContex";
import { useAuth } from "../Store/auth";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../Context/ThemeContext";

const Product = () => {
  const { products, isLoading, isError } = useProductContext();
  const { isLoggedIn } = useAuth();
  const { theme } = useTheme();

  if (isLoading) return <p className="text-center my-5">Loading products...</p>;
  if (isError || products.length === 0) return <p className="text-center text-danger my-5">Error loading products.</p>;

  const displayProducts = products.slice(0, 3);

  const handleUnauthenticatedClick = () => {
    toast.error("Please login to view details");
  };

  return (
    <div className={`min-vh-90 py-5 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <div className="container text-center mb-5">
        <h2 className="fw-bold text-uppercase" style={{ letterSpacing: "2px" }}>
          Our Products
        </h2>
        <hr className={`mx-auto ${theme === "dark" ? "bg-light" : "bg-dark"}`} style={{ width: "60px", height: "3px", border: "none" }} />
      </div>

      <div className="container">
        <div className="row justify-content-center g-4">
          {displayProducts.map(({ id, name, image, price, category }) => (
            <div key={id} className="col-md-4">
              <div className={`card h-100 border-0 shadow-lg rounded-4 overflow-hidden transition-all ${theme === "dark" ? "bg-secondary text-light" : "bg-white text-dark"}`} 
                style={{ transition: "transform 0.3s ease-in-out" }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div className="position-relative">
                  <img src={image} alt={name} className="card-img-top img-fluid" style={{ height: "230px", objectFit: "cover" }} />
                  <span className="badge bg-dark position-absolute top-0 start-0 m-2 px-3 py-1 rounded text-uppercase small">
                    {category}
                  </span>
                </div>
                <div className="card-body d-flex flex-column p-4">
                  <h5 className="card-title fw-bold text-truncate">{name}</h5>
                  <p className={`card-text ${theme === "dark" ? "text-light" : "text-muted"} mb-3`}>
                    <FormatPrice price={price} />
                  </p>
                  {isLoggedIn ? (
                    <NavLink to={`/SingleProduct/${id}`} className="btn btn-primary btn-sm mt-auto w-100 rounded-pill">
                      View Details
                    </NavLink>
                  ) : (
                    <button onClick={handleUnauthenticatedClick} className="btn btn-primary btn-sm mt-auto w-100 rounded-pill">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;

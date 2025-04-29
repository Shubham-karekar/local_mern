// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
// import { MdSecurity } from "react-icons/md";
// import { TbTruckDelivery, TbReplace } from "react-icons/tb";
// import AddToCart from "../Components/AddToCart";
// import { useTheme } from "../Context/ThemeContext";


// const API = "https://api.pujakaitem.com/api/products";

// const SingleProduct = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { theme } = useTheme();

//   useEffect(() => {
//     const getProduct = async () => {
//       try {
//         const response = await fetch(`${API}?id=${id}`); // Correct string interpolation
//         if (!response.ok) {
//           throw new Error("Product not found");
//         }
//         const data = await response.json();
//         setProduct(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getProduct();
//   }, [id]);

//   if (loading) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center my-5">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="my-5">
//         <Alert variant="danger">Error: {error}</Alert>
//       </Container>
//     );
//   }

//   const { name, company, price, description, category, stock, stars, reviews, image } = product;

//   return (
//     <div className={`min-vh-100 d-flex flex-column ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
//       <Container className={`my-5 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
//         <h2>{name}</h2>
//         <Row className="gy-4">
//           {/* Product Image */}
//           <Col md={6} className="d-flex justify-content-center">
//             {image ? (
//               <img src={image[0]?.url} alt={name} className="img-fluid my-auto" style={{ maxWidth: "80%", height: "50%" }} />
//             ) : (
//               <p>No Image Available</p>
//             )}
//           </Col>

//           {/* Product Data */}
//           <Col md={6}>
//             <h2>{name}</h2>
//             {/* Product Stars */}
//             <p>
//               Rating: {stars} ({reviews} reviews)
//             </p>

//             {/* Product Price */}
//             <p className="fw-bold">
//               MRP: <del>${price + 250}</del>
//             </p>
//             <p className="h4 text-primary">
//               Deal of the Day: ${price}
//             </p>
//             <p>{description}</p>

//             {/* Product Warranty Information */}
//             <Row className="text-center mb-4">
//               <Col xs={6} md={3} className="mb-3">
//                 <TbTruckDelivery size={30} className="text-primary" />
//                 <p className="mt-2">Free Delivery</p>
//               </Col>
//               <Col xs={6} md={3} className="mb-3">
//                 <TbReplace size={30} className="text-success" />
//                 <p className="mt-2">Replacement</p>
//               </Col>
//               <Col xs={6} md={3} className="mb-3">
//                 <TbTruckDelivery size={30} className="text-warning" />
//                 <p className="mt-2">Fast Return</p>
//               </Col>
//               <Col xs={6} md={3}>
//                 <MdSecurity size={30} className="text-info" />
//                 <p className="mt-2">2 Year Warranty</p>
//               </Col>
//             </Row>

//             {/* Product Availability */}
//             <p>
//               Available: <strong>{stock > 0 ? "In Stock" : "Not Available"}</strong>
//             </p>
//             <p>ID: <strong>{id}</strong></p>
//             <p>Brand: <strong>{company}</strong></p>
//             <hr />

//             {/* Add to Cart */}
//             {stock > 0 && <AddToCart product={product} />}
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default SingleProduct;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Breadcrumb,
  Form,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import Comments from "../Components/Comments";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { FaFacebook, FaTwitter, FaWhatsapp, FaStar } from "react-icons/fa";
import AddToCart from "../Components/AddToCart";
import { useTheme } from "../Context/ThemeContext";

const API = "https://api.pujakaitem.com/api/products";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`${API}?id=${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  const {
    name,
    company,
    price,
    description,
    category,
    stock,
    stars,
    reviews = [],
    image = [],
  } = product;

  const themeClasses = theme === "dark" ? "bg-dark text-white" : "bg-white text-dark";

  return (
    <div className={`min-vh-100 ${themeClasses}`}>
      <Container className="py-5">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{name}</Breadcrumb.Item>
        </Breadcrumb>

        {/* Product Section */}
        <Row className="gy-4">
           {/* Product Image */}
           <Col md={6} className="d-flex justify-content-center">
             {image ? (
               <img src={image[0]?.url} alt={name} className="img-fluid my-auto" style={{ maxWidth: "80%", height: "50%" }} />
             ) : (

              <p>No Image Available</p>
             )}
           </Col>

           {/* Product Data */}
           <Col md={6}>
             <h2>{name}</h2>
             {/* Product Stars */}
             <p>
               Rating: {stars} ({reviews} reviews)
             </p>
             {/* Product Price */}
             <p className="fw-bold">
               MRP: <del>${price + 250}</del>
             </p>
             <p className="h4 text-primary">
               Deal of the Day: ${price}
             </p>
             <p>{description}</p>

             {/* Product Warranty Information */}
             <Row className="text-center mb-4">
               <Col xs={6} md={3} className="mb-3">
                 <TbTruckDelivery size={30} className="text-primary" />
                 <p className="mt-2">Free Delivery</p>
               </Col>
               <Col xs={6} md={3} className="mb-3">
                 <TbReplace size={30} className="text-success" />
                 <p className="mt-2">Replacement</p>
               </Col>
               <Col xs={6} md={3} className="mb-3">
                 <TbTruckDelivery size={30} className="text-warning" />
                <p className="mt-2">Fast Return</p>
              </Col>
<Col xs={6} md={3}>
                <MdSecurity size={30} className="text-info" />
                 <p className="mt-2">2 Year Warranty</p>
               </Col>
             </Row>
             {/* Product Availability */}
             <p>
               Available: <strong>{stock > 0 ? "In Stock" : "Not Available"}</strong>
             </p>
             <p>ID: <strong>{id}</strong></p>
             <p>Brand: <strong>{company}</strong></p>
             <hr />
             {/* Add to Cart */}
            {stock > 0 && <AddToCart product={product} />}
           </Col>
         </Row>

        <hr className="my-5" />

        {/* Shipping Estimate */}
        <section className="mb-5">
          <h4 className="mb-3">Shipping Estimate</h4>
          <Form className="row gy-2">
            <Col sm={6} md={4}>
              <Form.Control placeholder="Enter your pincode" />
            </Col>
            <Col sm={6} md={3}>
              <Button variant="outline-primary">Check</Button>
            </Col>
          </Form>
        </section>

        {/* Reviews */}
        <section className="mb-5">
          <h4 className="mb-3">Customer Reviews</h4>
          {reviews && reviews.length > 0 ? (
            <p>No reviews yet.</p>

          ) : (
            <Comments />
          )}
        </section>


        {/* Review Form */}
        <section className="mb-5">
          <h4 className="mb-3">Leave a Review</h4>
          <Form>
            <Row className="gy-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Rating</Form.Label>
                  <Form.Select>
                    <option>5 - Excellent</option>
                    <option>4 - Good</option>
                    <option>3 - Average</option>
                    <option>2 - Poor</option>
                    <option>1 - Terrible</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Your Review</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Write your review here..." />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Button type="submit" variant="primary">Submit Review</Button>
              </Col>
            </Row>
          </Form>
        </section>

        {/* Social Sharing */}
        <section className="mb-5">
          <h4 className="mb-3">Share This Product</h4>
          <div className="d-flex gap-3 flex-wrap">
            <Button variant="primary" className="d-flex align-items-center gap-2">
              <FaFacebook /> Facebook
            </Button>
            <Button variant="info" className="text-white d-flex align-items-center gap-2">
              <FaTwitter /> Twitter
            </Button>
            <Button variant="success" className="d-flex align-items-center gap-2">
              <FaWhatsapp /> WhatsApp
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default SingleProduct;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import AddToCart from "../Components/AddToCart";

const API = "https://api.pujakaitem.com/api/products";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`${API}?id=${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
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
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
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

  const { name, company, price, description, category, stock, stars, reviews, image } = product;

  return (
    <Container className="my-5">
      <h2>{name}</h2>
      <Row className="gy-4">
        {/* Product Image */}
        <Col md={6} className="d-flex justify-content-center">
          {image ? (
            <img src={image[0]?.url} alt={name} className="img-fluid my-auto"
            style={{ maxWidth: "80%", height: "50%" }}
             />
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
            MRP:{" "}
            <del>
              ${price + 250}
            </del>
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
              <p className="mt-2">Fast Delivered</p>
            </Col>
            <Col xs={6} md={3}>
              <MdSecurity size={30} className="text-info" />
              <p className="mt-2">2 Year Warranty</p>
            </Col>
          </Row>

          {/* Product Availability */}
          <p>
            Available:{" "}
            <strong>{stock > 0 ? "In Stock" : "Not Available"}</strong>
          </p>
          <p>ID: <strong>{id}</strong></p>
          <p>Brand: <strong>{company}</strong></p>
          <hr />

          {/* Add to Cart */}
          {stock > 0 && 
          <AddToCart product={product} />              
          
          }
        </Col>
      </Row>
    </Container>
  );
};

export default SingleProduct;

import React from "react";
// import FilterSection from "./Components/FilterSection";
import ProductList from "../Components/ProductList";
// import Sort from "./Components/Sort";
import Footer from "../Components/Footer";
import { Container, Row, Col } from "react-bootstrap";

const Products = () => {
  return (
    <>
    {/* <Container className="my-4">
      <Row>
        <Col md={3} className="mb-4">
          <FilterSection />
        </Col>
        <Col md={9}>
          <section className="product-view--sort">
            <Row className="mb-4">
              <Col>
                <Sort />
              </Col>
            </Row>
            <Row>
              <Col>
                <ProductList />
              </Col>
            </Row>
          </section>
        </Col>
      </Row>
    </Container> */}
    <ProductList />
    <Footer/>
    </>
  );
};

export default Products;

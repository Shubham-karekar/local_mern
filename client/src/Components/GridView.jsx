import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap"; // Added Container
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";
import { useFilterContext } from "../Context/FilterContext";
import "../App.css";
import FilterSection from "../Components/FilterSection";
import Sort from "./Sort";
import Footer from "../Components/Footer"
import { useTheme } from "../Context/ThemeContext";


const GridView = () => {
  const { filter_products = [] } = useFilterContext(); // Removed empty object props
  const { theme } = useTheme();
  if (!filter_products.length) {
    return <p>No products available</p>;
  }

  return (
    <>
    <div className={`min-vh-100 d-flex flex-column ${theme ==="dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <Container className={`my-4 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
        <Row className="mx-auto">
          <Col md={3} className="mb-4">
            <FilterSection />
          </Col>
          <Col md={9}>
            <Row>
              <Col md={12} className="mb-4">
                <Sort />
              </Col>
            </Row>
            <Row>
              {filter_products.map((curElem) => (
                <Col key={curElem.id} md={4} className="mb-4">
                  <NavLink
                    to={`/SingleProduct/${curElem.id}`}
                    className="text-decoration-none text-dark"
                  >
                    <Card className={`h-100 shadow-sm border-0 rounded-3 overflow-hidden ${theme ==="dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
                      <div className="position-relative">
                        <img
                          src={curElem.image}
                          alt={curElem.name}
                          className="card-img-top img-fluid rounded-top"
                          style={{
                            transition: "transform 0.3s ease-in-out",
                            height: "200px",
                            objectFit: "cover",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.transform = "scale(1.05)")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        />
                      </div>
                      <Card.Body className="text-center">
                        <Card.Title className="text-capitalize">
                          {curElem.name}
                        </Card.Title>
                        <Card.Text className="text-primary">
                          {<FormatPrice price={curElem.price} />}
                        </Card.Text>

                        <Button variant="outline-primary" className="mt-3">
                          View Product
                        </Button>
                      </Card.Body>
                    </Card>
                  </NavLink>
                </Col>
              ))}
            </Row>
          </Col> {/* This closes the second <Col> */}
        </Row>
      </Container>
      <Footer />
      </div>
    </>
  );
};

export default GridView;

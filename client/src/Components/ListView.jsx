import React from "react";
import { useFilterContext } from "../Context/FilterContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../App.css"; // Import custom CSS
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";
import FilterSection from "../Components/FilterSection";
import Sort from "./Sort";
import Footer from "../Components/Footer"
import { useTheme } from "../Context/ThemeContext";

const ListView = () => {
  const { filter_products = [] } = useFilterContext();
  const { theme } = useTheme();

  if (!filter_products.length) {
    return <p>No products available</p>;
  }

  return (
    <>
      <div className={`min-vh-100 d-flex flex-column ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
        <Container className={`my-4 ${theme === 'dark' ? "bg-dark text-white" : "bg-light text-dark"}`}>
          <Row>
            <Col md={3} className={`mb-4 ${theme === 'dark' ? "bg-dark text-white" : "bg-light text-dark"}`}>
              <FilterSection />
            </Col>
            <Col md={9}>
              <Row>
                <Col md={12} className="mb-4">
                  <Sort />
                </Col>
              </Row>
              <Row>
                {filter_products.map((product) => (
                  <Col md={12} key={product.id} className="mb-4">
                    <Card className={`h-100 product-card ${theme === 'dark' ? "bg-dark text-white" : "bg-light text-dark"}`}>
                      <Row noGutters>
                        <Col md={4}>
                          <Card.Img
                            variant="top"
                            src={product.image}
                            alt={product.name}
                            style={{
                              transition: "transform 0.3s ease-in-out",
                              height: "240px",
                              width: "240px",
                              objectFit: "cover",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.transform = "scale(1.05)")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                          />
                        </Col>
                        <Col md={8}>
                          <Card.Body>
                            <h1 className="text-capitalize">{product.name}</h1>
                            <p className="text-primary">{<FormatPrice price={product.price} />}</p> {/* Corrected this line */}
                            <Card.Text>{product.description}</Card.Text>
                            <NavLink to={`/SingleProduct/${product.id}`}>
                              <Button variant="outline-primary" className="mt-3">
                                View Product
                              </Button>
                            </NavLink>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default ListView;

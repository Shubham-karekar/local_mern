import React from "react";
import { useFilterContext } from "../Context/FilterContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../App.css"; // Import custom CSS
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";
import FilterSection from "../Components/FilterSection";
import Sort from "./Sort";

const ListView = () => {
  const { filter_products = [] } = useFilterContext();

  if (!filter_products.length) {
    return <p>No products available</p>;
  }

  return (
    <Container className="my-4">
      <Row>
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
            {filter_products.map((product) => (
              <Col md={12} key={product.id} className="mb-4">
                <Card className="h-100 product-card">
                  <Row noGutters>
                    <Col md={4}>
                      <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.name}
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
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <h1>{product.name}</h1>
                        <p>{<FormatPrice price={product.price} />}</p> {/* Corrected this line */}
                        <Card.Text>{product.description}</Card.Text>
                        <NavLink to={`/SingleProduct/${product.id}`}>
                          <Button className="btn-outline-primary" variant="light">
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
  );
};

export default ListView;

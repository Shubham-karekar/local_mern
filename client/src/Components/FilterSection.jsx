import React from "react";
import { Form, Button, Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { useFilterContext } from "../Context/FilterContext";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../Helpers/FormatPrice";

const FilterSection = () => {
  const {
    filters: { category, color, company, price,minPrice,maxPrice },
    updateFilterValue,
    clearFilters,
    all_products,
  } = useFilterContext();


  // Function to get unique values from product data
  const getUniqueData = (data, attr) => {
    let newVal = data.map((curElem) => curElem[attr] || ""); // Fallback to empty string if undefined

    if (attr === "colors") {
      newVal = newVal.flat();
    }

    return ["All", ...new Set(newVal)];
  };

  // Get unique values for categories, companies, and colors
  const categoryData = getUniqueData(all_products, "category");
  const companyData = getUniqueData(all_products, "company");
  const colorsData = getUniqueData(all_products, "colors");

  return (
    <Container className="py-5">
      {/* Search Box */}
      <Row className="mb-4">
        <Col>
          <Form onSubmit={(e) => e.preventDefault()}>
            <InputGroup>
              <FormControl
                type="text"
                name="text"
                placeholder="Search"
                onChange={updateFilterValue}
              />
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {/* Category Filter */}
      <Row className="mb-2">
        <Col className="text-left">
          <h3>Category</h3>
          <Row className="mb-4">
            {categoryData.map((curElem, index) => (
              <Button
                key={index}
                variant="light"
                name="category"
                value={curElem}
                className={`btn ${curElem === category ? "text-capitalize active" : ""}`}
                onClick={updateFilterValue}
              >
                {curElem}
              </Button>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Company Filter */}
      <Row className="mb-2">
        <Col className="text-left">
          <h3>Company</h3>
          <Form.Group controlId="company">
            <Form.Control
              as="select"
              name="company"
              value={company}
              onChange={updateFilterValue}
            >
              {companyData.map((curElem, index) => (
                <option key={index} value={curElem}>
                  {curElem}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {/* Color Filter */}
      <Row>
        <Col>
          <h3 className="my-4">Colors</h3>
          <div className="d-flex flex-wrap">
            {colorsData.map((curColor, index) => (
              <Button
                key={index}
                type="button"
                value={curColor}
                name="color"
                style={{ backgroundColor: curColor || "#ffffff" }} // Fallback to white if no color
                className={`btnStyle ${color === curColor ? "active" : ""}`}
                onClick={updateFilterValue}
              >
                {color === curColor && <FaCheck className="text-white" />}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Price Range */}
      <Row>
        <Col>
          <h3 className="my-4">Price Range</h3>
          <p>
            <FormatPrice price={price} />
          </p>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={price}
            name="price"
            onChange={updateFilterValue}
          />
        </Col>
      </Row>

      {/* Clear Filters */}
      <Row>
        <Col className="mx-4">
          <Button className="btn btn-outline-primary my-4" variant="light" onClick={clearFilters} name="clear">
            Clear Filter
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FilterSection;

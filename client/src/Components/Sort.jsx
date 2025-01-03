import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useFilterContext } from "../Context/FilterContext";
import { NavLink } from "react-router-dom"; 


const Sort = () => {
  const {
    filter_products = [],
    grid_view,
    setGridView,
    setListView,
    sorting,
  } = useFilterContext();


  return (
    <Row className="my-4 align-items-center">
      {/* 1st column */}
      <Col xs="auto">
        <NavLink to="/GridView">
          <Button
            variant={grid_view ? "light" : "outline-primary"}
            onClick={setGridView}
            className="me-2"
          >
            <BsFillGridFill />
          </Button>
        </NavLink>
        <NavLink to="/ListView">
          <Button
            variant={!grid_view ? "light" : "outline-primary"}
            onClick={setListView}
          >
            <BsList />
          </Button>
        </NavLink>
      </Col>

      {/* 2nd column */}
      <Col xs="auto">
        <p className="mb-0">{`${filter_products.length} Product${
          filter_products.length !== 1 ? "s" : ""
        } Available`}</p>
      </Col>

      {/* 3rd column */}
      <Col xs="auto" className="ms-auto">
        <Form.Group controlId="sort">
          <Form.Select onChange={sorting} className="form-select">
            <option onClick={sorting} value="lowest">
              Price (lowest)
            </option>
            <option onClick={sorting} value="highest">
              Price (highest)
            </option>
            <option onClick={sorting} value="a-z">
              Name (a-z)
            </option>
            <option onClick={sorting} value="z-a">
              Name (z-a)
            </option>
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default Sort;

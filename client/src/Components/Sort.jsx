import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useFilterContext } from "../Context/FilterContext";
import { NavLink } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

const Sort = () => {
  const {
    filter_products = [],
    grid_view,
    setGridView,
    setListView,
    sorting,
  } = useFilterContext();
  const { theme, toggleTheme } = useTheme(); // Use the theme context

  return (
    <Row className={`my-4 align-items-center ${theme === "dark" ? "bg-dark navbar-dark" : "bg-light navbar-light"
      } shadow-sm`}>
      {/* 1st column */}
      <Col xs="auto">
        <NavLink to="/gridview">
          <Button
            variant={grid_view ? "light" : "outline-primary"}
            onClick={setGridView}
            className="me-2"
          >
            <BsFillGridFill />
          </Button>
        </NavLink>
        <NavLink to="/listView">
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
        <p className="mb-0">{`${filter_products.length} Product${filter_products.length !== 1 ? "s" : ""
          } Available`}</p>
      </Col>

      {/* 3rd column */}
      <Col xs="auto" className="ms-auto">
        <Form.Group controlId="sort">
          <Form.Select onChange={sorting} className={`form-select ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
            } shadow-sm`}>
            <option value="lowest">Price (lowest)</option>
            <option value="highest">Price (highest)</option>
            <option value="a-z">Name (a-z)</option>
            <option value="z-a">Name (z-a)</option>
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default Sort;

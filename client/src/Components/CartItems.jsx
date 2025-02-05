import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import FormatPrice from "../Helpers/FormatPrice";
import { useCartContext } from "../Context/CartContext";
import { useTheme } from "../Context/ThemeContext";

const CartItem = ({ id, name, price, amount, color, image }) => {
  const { removeItem, setDecrease, setIncrement } = useCartContext();
  const { theme } = useTheme();

  return (
    <Row
      className={`align-items-center text-center py-3 rounded shadow-sm ${
        theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"
      }`}
    >
      {/* Product Image & Name */}
      <Col className="d-flex flex-column align-items-center">
        <img src={image} alt={name} width="60" className="rounded mb-2" />
        <p className="mb-1 fw-bold">{name}</p>
        <p className="small">
          Color: <span className="rounded px-2" style={{ backgroundColor: color, color: "white" }}>{color}</span>
        </p>
      </Col>

      {/* Price (Visible on larger screens) */}
      <Col className="d-none d-md-block">
        <FormatPrice price={price} />
      </Col>

      {/* Quantity Controls */}
      <Col>
        <Button variant="outline-secondary" size="sm" onClick={() => setDecrease(id)}>
          -
        </Button>
        <span className="mx-2 fw-bold">{amount}</span>
        <Button variant="outline-secondary" size="sm" onClick={() => setIncrement(id)}>
          +
        </Button>
      </Col>

      {/* Subtotal (Visible on larger screens) */}
      <Col className="d-none d-md-block">
        <FormatPrice price={price * amount} />
      </Col>

      {/* Remove Item Button */}
      <Col>
        <Button variant="outline-danger" size="sm" onClick={() => removeItem(id)}>
          🗑️ Remove
        </Button>
      </Col>
    </Row>
  );
};

export default CartItem;

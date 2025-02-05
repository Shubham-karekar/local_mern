import React from "react";
import { useCartContext } from "../Context/CartContext";
import CartItem from "../Components/CartItems";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Button, Table, Alert } from "react-bootstrap";
import FormatPrice from "../Helpers/FormatPrice";
import { useTheme } from "../Context/ThemeContext";

const Cart = () => {
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();
  const { theme } = useTheme();

  if (cart.length === 0) {
    return (
      <div className={`min-vh-100 d-flex justify-content-center align-items-center ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
        <Alert variant={theme === "dark" ? "secondary" : "danger"} className="text-center w-50">
          <h4 className="mb-0">🛒 Your cart is empty!</h4>
        </Alert>
      </div>
    );
  }

  return (
    <div className={`min-vh-100 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <Container className="py-5">
        <div className="p-4 rounded shadow">
          {/* Cart Header */}
          <Row className="text-center fw-bold border-bottom pb-2">
            <Col>Item</Col>
            <Col className="d-none d-md-block">Price</Col>
            <Col>Quantity</Col>
            <Col className="d-none d-md-block">Subtotal</Col>
            <Col>Remove</Col>
          </Row>

          {/* Cart Items */}
          {cart.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}

          {/* Action Buttons */}
          <Row className="mt-4">
            <Col>
              <NavLink to="/products">
                <Button variant="outline-primary" className="px-4">
                  🛍️ Continue Shopping
                </Button>
              </NavLink>
            </Col>
            <Col className="text-end">
              <Button variant="outline-danger" className="px-4" onClick={clearCart}>
                🗑️ Clear Cart
              </Button>
            </Col>
          </Row>

          {/* Cart Summary */}
          <Row className="justify-content-end mt-4">
            <Col md={6}>
              <Table bordered className={theme === "dark" ? "table-dark" : "table-light"}>
                <tbody>
                  <tr>
                    <td className="fw-bold">Subtotal</td>
                    <td><FormatPrice price={total_price} /></td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Shipping Fee</td>
                    <td><FormatPrice price={shipping_fee} /></td>
                  </tr>
                  <tr className="table-primary">
                    <td className="fw-bold">Total</td>
                    <td className="fw-bold"><FormatPrice price={total_price + shipping_fee} /></td>
                  </tr>
                </tbody>
              </Table>

              {/* Payment Button */}
              <div className="d-flex justify-content-end mt-3">
                <NavLink to="/checkout">
                  <Button variant="outline-success" className="px-4">
                    💳 Make Payment
                  </Button>
                </NavLink>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Cart;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useCartContext } from "../Context/CartContext";
import FormatPrice from "../Helpers/FormatPrice";
import { FaMoneyBillWave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useTheme } from "../Context/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Store/auth";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isLoggedIn } = useAuth();
  const { cart, total_price, shipping_fee } = useCartContext();

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [userCode, setUserCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const generateCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newCode = generateCode();
    setGeneratedCode(newCode);
    setShowCodeInput(true);
  };

  const handleConfirmOrder = () => {
    if (userCode !== generatedCode) {
      toast.error("Incorrect code! Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    toast.success("Order placed successfully!", {
      position: "top-center",
      autoClose: 2000,
    });

    setTimeout(() => {
      navigate("/invoicePage");
    }, 2500);
  };

  const themeCard = theme === "dark" ? "bg-dark text-white" : "bg-light text-dark";
  const themeList = theme === "dark" ? "list-group-item bg-dark text-white border-secondary" : "";

  return (
    <div className={`min-vh-100 py-5 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <Container>
        <Row className="justify-content-center">
          {/* Order Summary */}
          <Col md={5}>
            <Card className={`mb-4 shadow-lg ${themeCard}`}>
              <Card.Body>
                <Card.Title className="text-center mb-3">Order Summary</Card.Title>
                <ul className="list-group list-group-flush">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className={`list-group-item d-flex justify-content-between ${themeList}`}
                    >
                      <span>{item.name} (x{item.amount})</span>
                      <strong>
                        <FormatPrice price={item.price * item.amount} />
                      </strong>
                    </li>
                  ))}
                  <li className={`list-group-item d-flex justify-content-between ${themeList}`}>
                    <span>Shipping</span>
                    <strong>
                      <FormatPrice price={shipping_fee} />
                    </strong>
                  </li>
                  <li className={`list-group-item d-flex justify-content-between ${theme === "dark" ? "bg-secondary text-white" : "bg-light"}`}>
                    <strong>Total</strong>
                    <strong>
                      <FormatPrice price={total_price + shipping_fee} />
                    </strong>
                  </li>
                </ul>
                <p className={`text-center mt-3 ${theme === "dark" ? "text-light" : "text-muted"}`}>
                  Pay when you receive the order
                </p>
              </Card.Body>
            </Card>
          </Col>

          {/* Payment Options */}
          <Col md={5}>
            <Card className={`shadow-lg ${themeCard}`}>
              <Card.Body>
                <Card.Title className="text-center mb-3">Select Payment Method</Card.Title>
                <Form onSubmit={handlePlaceOrder}>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="radio"
                      label={
                        <span>
                          <FaMoneyBillWave className="me-2" /> Cash on Delivery (COD)
                        </span>
                      }
                      name="paymentMethod"
                      defaultChecked
                      className={theme === "dark" ? "text-white" : ""}
                    />
                  </Form.Group>
                  <Button variant="success" type="submit" className="w-100">
                    <FaMoneyBillWave className="me-2" /> Place Order
                  </Button>
                </Form>

                {showCodeInput && (
                  <div className="mt-4 text-center">
                    <h5 className="mb-3">Enter the Code Below</h5>
                    <p className="fw-bold fs-5 text-primary">{generatedCode}</p>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Enter the code shown above"
                        maxLength="5"
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        className={`text-center ${theme === "dark" ? "bg-dark text-white border-secondary" : ""}`}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      onClick={handleConfirmOrder}
                      className="w-100"
                    >
                      Confirm & Place Order
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PaymentPage;

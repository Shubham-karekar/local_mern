import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const CartAmountToggle = ({ amount, setDecrease, setIncrease }) => {
  return (
    <ButtonGroup>
      <Button variant="outline-secondary" onClick={setDecrease}>-</Button>
      <Button variant="light" disabled className="fw-bold">{amount}</Button>
      <Button variant="outline-secondary" onClick={setIncrease}>+</Button>
    </ButtonGroup>
  );
};

export default CartAmountToggle;

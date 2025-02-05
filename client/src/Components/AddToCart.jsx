import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Button, ButtonGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import CartAmountToggle from "../Components/CartAmountToggle";
import { useCartContext } from "../Context/CartContext";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const { id, colors = [], stock } = product;

  const [color, setColor] = useState(colors.length > 0 ? colors[0] : "");
  const [amount, setAmount] = useState(1);

  const setDecrease = () => setAmount((prev) => Math.max(1, prev - 1));
  const setIncrease = () => setAmount((prev) => Math.min(stock, prev + 1));

  const handleOnSubmit = () => {
    toast.error("The work is in process");
  };

  return (
    <div className="mt-3">
      {/* color selection */}
      {colors.length > 0 && (
        <div className="mb-3">
          <p className="mb-2 fw-bold">color:</p>
          <ButtonGroup>
            {colors.map((curColor, index) => (
              <Button
                key={index}
                variant={color === curColor ? "primary" : "outline-primary"}
                className="rounded-circle p-2"
                style={{
                  backgroundColor: curColor,
                  border: `2px solid ${color === curColor ? "black" : "gray"}`,
                  width: "30px",
                  height: "30px",
                }}
                onClick={() => setColor(curColor)}
              >
                {color === curColor && <FaCheck className="text-white" />}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      )}

      {/* quantity toggle */}
      <CartAmountToggle amount={amount} setDecrease={setDecrease} setIncrease={setIncrease} />

      {/* buttons */}
      <div className="mt-4 d-flex gap-3">
        <NavLink to="/cart">
          <Button variant="primary" onClick={() => addToCart(id, color, amount, product)}>
            add to cart
          </Button>
        </NavLink>
        <Button variant="success" onClick={handleOnSubmit}>
          buy now
        </Button>
      </div>
    </div>
  );
};

export default AddToCart;

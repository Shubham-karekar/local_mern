import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import CartAmountToggle from "../Components/CartAmountToggle";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useCartContext } from "../Context/CartContext";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  //const {Buy } = useCartContext();

  const { id, colors, stock } = product;

  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };

  return (
    <>
      <div className="mb-3">
        <p>
          Color:
          {colors.map((curColor, index) => {
            return (
              <Button
                key={index}
                variant={color === curColor ? "primary" : "outline-primary"}
                style={{ backgroundColor: curColor }}
                className="mx-1"
                onClick={() => setColor(curColor)}
              >
                {color === curColor ? <FaCheck className="text-white" /> : null}
              </Button>
            );
          })}
        </p>
      </div>

      {/* Add to Cart */}

      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />
      <br></br>
      <NavLink to="/cart" onClick={() => addToCart(id, color, amount, product)}>
        <Button variant="primary" className="mt-3">
          Add To Cart
        </Button>
      </NavLink>
      <NavLink 
      //to="/cart" 
      //onClick={() => (id, color, amount, product)}
      >
        <Button variant="primary" className="mt-3 mx-4">
          Buy Now
        </Button>
      </NavLink>
    </>
  );
};

export default AddToCart;

// import React from "react";
// import FormatPrice from "../Helpers/FormatPrice";
// import CartAmountToggle from "./CartAmountToggle";
// import { FaTrash } from "react-icons/fa";
// import { useCartContext } from "../Context/CartContext";
// import { Col, Row } from "react-bootstrap";

// const CartItem = ({ id, name, image, color, price, amount, stock }) => {
//   const { removeItem, updateItemAmount } = useCartContext();

//   const setDecrease = () => {
//     if (amount > 1) {
//       updateItemAmount(id, amount - 1);
//     }
//   };

//   const setIncrease = () => {
//     if (amount < stock) {
//       updateItemAmount(id, amount + 1);
//     }
//   };

//   return (
//     <Row className="cart-item align-items-center ">
//       <Col md={4} className="d-flex flex-column align-items-center text-center">
//         <figure>
//           <img
//             src={image}
//             alt={name}
//             style={{ height: "15vh", objectFit: "contain" }}
//           />
//         </figure>

//         <div className="mt-2">
//           <p className="mb-1">{name}</p>
//           <div className="color-div d-flex justify-content-center align-items-center">
//             <p className="mb-0 me-1">Color:</p>
//             <div
//               className="color-style"
//               style={{
//                 backgroundColor: color,
//                 width: "20px",
//                 height: "20px",
//                 borderRadius: "50%",
//               }}
//             ></div>
//           </div>
//         </div>
//       </Col>

//       {/* Price */}
//       <Col md={2} className="d-none d-md-block">
//       <p className="card-text text-muted mb-2">{<FormatPrice price={price} />}</p>
//       </Col>

//       {/* Quantity */}
//       <Col md={2}>
//         <CartAmountToggle
//           amount={amount}
//           setDecrease={setDecrease}
//           setIncrease={setIncrease}
//         />
//       </Col>

//       {/* Subtotal */}
//       <Col md={2} className="d-none d-md-block">
//         <p>
//           <FormatPrice price={price * amount} />
//         </p>
//       </Col>

//       {/* Remove Item */}
//       <Col md={2} className="text-center">
//         <FaTrash
//           className="remove_icon"
//           onClick={() => removeItem(id)}
//           style={{ cursor: "pointer" }}
//         />
//       </Col>
//     </Row>
//   );
// };

// export default CartItem;

import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import FormatPrice from "../Helpers/FormatPrice";
import { useCartContext } from "../Context/CartContext";

const CartItem = ({ id, name, price, amount, color, image }) => {
  const {removeItem , setDecrease, setIncrement} = useCartContext();
  return (
    <Row className="align-items-center text-center mb-3">
      {/* Product Image and Name */}
      <Col>
        <img src={image} alt={name} width="50" />
        <p>{name}</p>
        <p>Color: {color}</p>
      </Col>

      {/* Price (for larger screens) */}
      <Col className="d-none d-md-block"><FormatPrice price={price} /></Col>

      {/* Quantity Control */}
      <Col>
        <Button onClick={() => setDecrease(id)}>-</Button>
        <span className="mx-2">{amount}</span>
        <Button onClick={() => setIncrement(id)}>+</Button>
      </Col>

      {/* Subtotal Price (for larger screens) */}
      <Col className="d-none d-md-block"><FormatPrice price={price * amount} /></Col>

      {/* Remove Item Button */}
      <Col>
        <Button variant="danger" onClick={() => removeItem(id)}>Remove</Button>
      </Col>
    </Row>
  );
};

export default CartItem;

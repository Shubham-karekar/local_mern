// import { createContext, useContext, useReducer, useEffect } from "react";
// import reducer from "../Reducer/CartReducer";


// const CartContext = createContext();

// const getLocalCartData = () => {
//   let localCartData = localStorage.getItem("thapaCart");
//   if (localCartData == []) {
//     return [];
//   } else {
//     return JSON.parse(localCartData);
//   }
// };

// const initialState = {
//   // cart: [],
//   cart: getLocalCartData(),
//   total_item: "",
//   total_price: "",
//   shipping_fee: 5000,
// };

// const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const addToCart = (id, color, amount, product) => {
//     dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
//   };

//   // increment and decrement the product

//   const setDecrease = (id) => {
//     dispatch({ type: "SET_DECREMENT", payload: id });
//   };

//   const setIncrement = (id) => {
//     dispatch({ type: "SET_INCREMENT", payload: id });
//   };

//   // to remove the individual item from cart
//   const removeItem = (id) => {
//     dispatch({ type: "REMOVE_ITEM", payload: id });
//   };

//   // to clear the cart
//   const clearCart = () => {
//     dispatch({ type: "CLEAR_CART" });
//   };

//   // to add the data in localStorage
//   // get vs set

//   useEffect(() => {
//     // dispatch({ type: "CART_TOTAL_ITEM" });
//     // dispatch({ type: "CART_TOTAL_PRICE" });
//     dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

//     localStorage.setItem("thapaCart", JSON.stringify(state.cart));
//   }, [state.cart]);

//   return (
//     <CartContext.Provider
//       value={{
//         ...state,
//         addToCart,
//         removeItem,
//         clearCart,
//         setDecrease,
//         setIncrement,
//       }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// const useCartContext = () => {
//   return useContext(CartContext);
// };

// export { CartProvider, useCartContext };


import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../Reducer/CartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("thapaCart");
  try {
    return localCartData ? JSON.parse(localCartData) : [];
  } catch (error) {
    console.error("Error parsing localCartData:", error);
    return [];
  }
};

const initialState = {
  cart: getLocalCartData(), // Fetch cart from localStorage or default to an empty array
  total_item: 0,
  total_price: 0,
  shipping_fee: 50,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Add an item to the cart
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  // Decrease the quantity of a cart item
  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  // Increase the quantity of a cart item
  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  // Remove an item from the cart
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // Clear the entire cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Update cart totals and persist cart data to localStorage
  useEffect(() => {
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
    localStorage.setItem("thapaCart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };

// import { createContext, useContext, useReducer, useEffect } from "react";
// import reducer from "../Reducer/CartReducer";

// const CartContext = createContext();

// const getLocalCartData = () => {
//   let localCartData = localStorage.getItem("ecomCart");
//   try {
//     return localCartData ? JSON.parse(localCartData) : [];
//   } catch (error) {
//     console.error("Error parsing localCartData:", error);
//     return [];
//   }
// };

// const initialState = {
//   cart: getLocalCartData(), // Fetch cart from localStorage or default to an empty array
//   total_item: 0,
//   total_price: 0,
//   shipping_fee: 50,
// };

// const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
  

//   // Add an item to the cart
//   const addToCart = (id, color, amount, product) => {
//     dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
//   };

//   // Other cart actions (decrement, increment, etc.)
//   const setDecrease = (id) => {
//     dispatch({ type: "SET_DECREMENT", payload: id });
//   };

//   const setIncrement = (id) => {
//     dispatch({ type: "SET_INCREMENT", payload: id });
//   };

//   const removeItem = (id) => {
//     dispatch({ type: "REMOVE_ITEM", payload: id });
//   };

//   const clearCart = () => {
//     dispatch({ type: "CLEAR_CART" });
//   };

//   useEffect(() => {
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
//       }}
//     >
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
  let localCartData = localStorage.getItem("ecomCart");
  try {
    return localCartData ? JSON.parse(localCartData) : [];
  } catch (error) {
    console.error("Error parsing localCartData:", error);
    return [];
  }
};

const initialState = {
  cart: getLocalCartData(),
  total_item: 0,
  total_price: 0,
  shipping_fee: 50,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  useEffect(() => {
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
    localStorage.setItem("ecomCart", JSON.stringify(state.cart));
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

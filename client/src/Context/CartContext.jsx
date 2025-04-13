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
//   cart: getLocalCartData(),
//   total_item: 0,
//   total_price: 0,
//   shipping_fee: 50,
// };
 


// const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
  
//   const addToCart = (id, color, amount, product) => {
//     dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
//   };

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
//     localStorage.setItem("ecomCart", JSON.stringify(state.cart));
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
  try {
    const data = localStorage.getItem("ecomCart");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
    return [];
  }
};

const initialState = {
  cart: getLocalCartData(),
  total_item: 0,
  total_price: 0,
  shipping_fee: 50,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
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
        setIncrement,
        setDecrease,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

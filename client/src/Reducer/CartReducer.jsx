// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       let { id, color, amount, product } = action.payload;
//       let existingProduct = state.cart.find(
//         (curItem) => curItem.id === id + color
//       );

//       if (!existingProduct) {
//         const newCartItem = {
//           id: id + color,
//           name: product.name,
//           color,
//           amount,
//           image: product.image[0]?.url,
//           price: product.price,
//           max: product.stock,
//         };
//         return { ...state, cart: [...state.cart, newCartItem] };
//       } else {
//         const updatedCart = state.cart.map((item) =>
//           item.id === id + color
//             ? { ...item, amount: Math.min(item.amount + amount, item.max) }
//             : item
//         );
//         return { ...state, cart: updatedCart };
//       }

//     case "SET_INCREMENT":
//       return {
//         ...state,
//         cart: state.cart.map((item) =>
//           item.id === action.payload
//             ? { ...item, amount: Math.min(item.amount + 1, item.max) }
//             : item
//         ),
//       };

//     case "SET_DECREMENT":
//       return {
//         ...state,
//         cart: state.cart.map((item) =>
//           item.id === action.payload && item.amount > 1
//             ? { ...item, amount: item.amount - 1 }
//             : item
//         ),
//       };

//     case "REMOVE_ITEM":
//       return {
//         ...state,
//         cart: state.cart.filter((item) => item.id !== action.payload),
//       };

//     case "CLEAR_CART":
//       return { ...state, cart: [] };

//     case "CART_ITEM_PRICE_TOTAL":
//       let total_price = state.cart.reduce((total, item) => total + item.amount * item.price, 0);
//       let total_item = state.cart.reduce((total, item) => total + item.amount, 0);

//       return { ...state, total_price, total_item };

//     default:
//       return state;
//   }
// };

// export default cartReducer;


const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { id, color, amount, product } = action.payload;
      const existingProduct = state.cart.find(
        (item) => item.id === id + color
      );

      if (!existingProduct) {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.image[0]?.url,
          price: product.price,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      } else {
        const updatedCart = state.cart.map((item) =>
          item.id === id + color
            ? { ...item, amount: Math.min(item.amount + amount, item.max) }
            : item
        );
        return { ...state, cart: updatedCart };
      }

    case "SET_INCREMENT":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, amount: Math.min(item.amount + 1, item.max) }
            : item
        ),
      };

    case "SET_DECREMENT":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload && item.amount > 1
            ? { ...item, amount: item.amount - 1 }
            : item
        ),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "CART_ITEM_PRICE_TOTAL":
      const total_price = state.cart.reduce(
        (acc, item) => acc + item.amount * item.price,
        0
      );
      const total_item = state.cart.reduce(
        (acc, item) => acc + item.amount,
        0
      );
      return { ...state, total_price, total_item };

    default:
      return state;
  }
};

export default cartReducer;

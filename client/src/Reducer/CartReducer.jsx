const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let { id, color, amount, product } = action.payload;
      let existingProduct = state.cart?.find(
        (curItem) => curItem.id === id + color
      );
      if (!state.cart) state.cart = []; // Fallback to an empty array

      if (existingProduct) {
        const updatedCart = state.cart.map((item) =>
          item.id === id + color
            ? {
                ...item,
                amount: Math.min(item.amount + amount, item.max),
              }
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
        const newCartItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.image[0]?.url,
          price: product.price,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newCartItem] };
      }
    // Other cases...
    default:
      return state;
  }
};

export default cartReducer;

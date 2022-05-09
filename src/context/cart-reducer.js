const storeCartItems = (cartItems) => {
  const cart = cartItems.length > 0 ? cartItems : [];
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const sumItems = (cartItems) => {
  storeCartItems(cartItems);
  return {
    itemCount: cartItems.reduce((total, prod) => total + prod.quantity, 0),
    total: cartItems.reduce(
      (total, prod) => total + prod.price * prod.quantity,
      0
    ),
  };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD ITEM W ATTRIBUTE": {
      const previousItemsOfSize = state.cartItems.filter((item) => {
        return (
          Number(item.id) === Number(action.payload.product.id) &&
          item.metadata.property === action.payload.metadata &&
          item.metadata.property2 === action.payload.metadata2
        );
      });

      console.log(previousItemsOfSize);

      if (previousItemsOfSize.length === 0) {
        
        state.cartItems.push({
          ...action.payload.product,
          quantity: 1,
          metadata: { 
            property: action.payload.metadata,
            property2: action.payload.metadata2
           },
        });
      }
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
}

//case "ADD ITEM WITH MULTIPLE ATTRIBUTES": {}

    case "INCREASE": {
    //   if()
    const previousItemsOfSize = state.cartItems.filter((item) => {
        return (
          Number(item.id) === Number(action.payload.product.id) &&
          item.metadata.property === action.payload.metadata && 
          item.metadata.property2 === action.payload.metadata2
        );
      });

      console.log(previousItemsOfSize);

      const increaseIndex = state.cartItems.findIndex(
        (item) =>item === previousItemsOfSize[0]
      );
      if (previousItemsOfSize.length > 0 ){
      state.cartItems[increaseIndex].quantity++;
    }
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    }
    case "DECREASE": {
      const previousItemsOfSize = state.cartItems.filter((item) => {
        return (
          Number(item.id) === Number(action.payload.product.id) &&
          item.metadata.property === action.payload.metadata && 
          item.metadata.property2 === action.payload.metadata2
        );
      });
        console.log(action.payload.metadata);
        console.log(previousItemsOfSize);
        const decreaseIndex = state.cartItems.findIndex(
          (item) => (item) === previousItemsOfSize[0]
        );
        console.log(decreaseIndex);
        console.log(action.payload);
        if (previousItemsOfSize.length > 0 ){
          state.cartItems[decreaseIndex].quantity--;
        }
       
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    }
    case "REMOVE_ITEM": {
      const previousItemsOfSize = state.cartItems.filter((item) => {
        return (
          Number(item.id) === Number(action.payload.product.id) &&
          item.metadata.property === action.payload.metadata && 
          item.metadata.property2 === action.payload.metadata2
        );
      });

    
    console.log(previousItemsOfSize);
      const newCartItems = state.cartItems.filter(
        (item) => item !== previousItemsOfSize[0]
      );
      console.log(newCartItems);
      return {
        ...state,
        cartItems: [...newCartItems],
        ...sumItems(newCartItems),
      };
    }
    case "CLEAR": {
      localStorage.removeItem("cart");
      return {
        cartItems: [],
        itemCount: 0,
        total: 0,
      };
}
    default: {
      return state;
    }
  }
};

export default cartReducer;

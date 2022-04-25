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
    case "ADD_ITEM": {
      //check if item is in cart
      if (
        !state.cartItems.find(
          (item) => Number(item.id) === Number(action.payload.product.id)
        )
      ) {
        state.cartItems.push({
          ...action.payload.product,
          quantity: 1,
          metadata: { property: action.payload.metadata },
        });

        console.log(action.payload, state.cartItems);
      }

      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
}
    case "ADD ITEM W NEW ATTRIBUTE": {
      const previousItemsOfSize = state.cartItems.filter((item) => {
        return (
          Number(item.id) === Number(action.payload.product.id) &&
          item.metadata.property === action.payload.metadata
        );
      });

      console.log(previousItemsOfSize);

      if (previousItemsOfSize.length === 0) {
        state.cartItems.push({
          ...action.payload.product,
          quantity: 1,
          metadata: { property: action.payload.metadata },
        });
      }

      //   if (
      //     state.cartItems.find(
      //       (item) =>
      //         Number(item.id) === Number(action.payload.product.id) &&
      //         item.metadata.property !== action.payload.metadata
      //     )
      //   ) {
      //     state.cartItems.push({
      //       ...action.payload.product,
      //       quantity: 1,
      //       metadata: { property: action.payload.metadata },
      //     });
      //   }
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
}
    case "INCREASE": {
    //   if()
    const previousItemsOfSize = state.cartItems.filter((item) => {
        return (
          Number(item.id) === Number(action.payload.product.id) &&
          item.metadata.property === action.payload.metadata
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
        const previousItemsOfSize = state.cartItems.filter((item) => item.metadata.property === action.payload.metadata.property);
        console.log(action.payload.metadata.property);
        console.log(previousItemsOfSize);
        const decreaseIndex = state.cartItems.findIndex(
          (item) => (item) === previousItemsOfSize[0]
        );
        console.log(decreaseIndex, action.payload);
        const product = state.cartItems[decreaseIndex];
        if (product.quantity > 1) {
          product.quantity--;
        }
       
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    }
    case "REMOVE_ITEM": {
    const sameProductTitle = state.cartItems.filter((item) => 
        item.title === action.payload.title && item.metadata.property === action.payload.metadata.property
    )

    
    console.log(sameProductTitle);
      const newCartItems = state.cartItems.filter(
        (item) => item !== sameProductTitle[0]
      );
      console.log(newCartItems);
      return {
        ...state,
        cartItems: [...newCartItems],
        ...sumItems(newCartItems),
      };
    }
    case "CLEAR":
      localStorage.removeItem("cart");
      return {
        cartItems: [],
        itemCount: 0,
        total: 0,
      };

    default:
      return state;
  }
};

export default cartReducer;

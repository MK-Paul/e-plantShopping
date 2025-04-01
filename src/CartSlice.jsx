import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      // Check if the item already exists in the cart
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );

      if (existingItem) {
        // If the item exists, you can update its quantity or ignore it
        existingItem.quantity += 1;
      } else {
        // If the item doesn't exist, add it to the cart with a quantity of 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      // Remove an item from the cart by filtering it out
      state.items = state.items.filter(
        (item) => item.name !== action.payload.name
      );
    },
    updateQuantity: (state, action) => {
      // Update the quantity of a specific item in the cart
      const itemToUpdate = state.items.find(
        (item) => item.name === action.payload.name
      );

      if (itemToUpdate) {
        itemToUpdate.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

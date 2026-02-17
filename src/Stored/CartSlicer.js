import { createSlice } from "@reduxjs/toolkit";


// example:
// {
//     id: 124,
//     name: "Wednesday Chicken Bucket",
//     
//    quantity: 2
// }

// [{id:123,name:"Tandoori paneer", quanity:3},{id:124,name:"Tandoori chicken", quanity:2},{id:125,name:"pizza", quanity:3}]

const cart = createSlice({
  name: "cartslice",
  initialState: {
    items: [],
    count: 0,
  },
  reducers: {
    addItems: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.count += 1;
    },
    IncrementItems: (state, action) => {
      const element = state.items.find((item) => item.id === action.payload.id);
      if (!element) return;
      element.quantity += 1;
      state.count += 1;
    },
    DecrementItems: (state, action) => {
      const element = state.items.find((item) => item.id === action.payload.id);
      if (!element) return;

      if (element.quantity > 1) {
        element.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      }
      state.count = Math.max(state.count - 1, 0);
    },
    removeItem: (state, action) => {
      const element = state.items.find((item) => item.id === action.payload.id);
      if (!element) return;
      state.count = Math.max(state.count - element.quantity, 0);
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
      state.count = 0;
    },
  },
});

export const { addItems, IncrementItems, DecrementItems, removeItem, clearCart } = cart.actions;
export default cart.reducer;



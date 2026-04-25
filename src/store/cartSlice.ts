import type { CartItem, Offer, CartState } from "../types/Cart";
import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
  subtotal: 0,
  offersApplied: [],
  finalTotal: 0,
};

const calculateOffers = (items: CartItem[]): Offer[] => {
  const offers: Offer[] = [];
  // First offer - Buy one get one cheese
  const cheese = items.find((i) => i.name === "Cheese");
  if (cheese && cheese.quantity >= 2) {
    const freeCheeseCount = Math.floor(cheese.quantity / 2);
    offers.push({
      description: "Buy One Get One Cheese",
      saving: freeCheeseCount * cheese.price,
    });
  }
  // Second Offer - Soup + Half price Bread
  const soup = items.find((i) => i.name === "Soup");
  const bread = items.find((i) => i.name === "Bread");
  if (soup && bread) {
    const eligibleBreadCount = Math.min(soup.quantity, bread.quantity);
    offers.push({
      description: "Half price Bread with Soup",
      saving: eligibleBreadCount * (bread.price / 2),
    });
  }
  // Third Offer - Butter one third off
  const butter = items.find((i) => i.name === "Butter");
  if (butter) {
    offers.push({
      description: "One-third off Butter",
      saving: butter.quantity * (butter.price / 3),
    });
  }
  return offers;
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      cartSlice.caseReducers.recalculateTotals(state);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      cartSlice.caseReducers.recalculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.offersApplied = [];
      state.finalTotal = 0;
    },
    recalculateTotals: (state) => {
      state.subtotal = state.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
      state.offersApplied = calculateOffers(state.items);
      const totalSavings = state.offersApplied.reduce(
        (s, o) => s + o.saving,
        0,
      );
      state.finalTotal = state.subtotal - totalSavings;
    },
  },
});
export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

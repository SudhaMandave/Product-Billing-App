import type { Product } from "./Product";

export interface CartItem extends Product {
  quantity: number;
}

export interface Offer {
  description : string;
  saving : number;
}

export interface CartState {
  items : CartItem[];
  subtotal : number;
  offersApplied : Offer[];
  finalTotal : number;
}
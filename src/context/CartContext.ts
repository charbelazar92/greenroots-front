import { createContext } from 'react';
import type { CartItem } from '../@types/cart';

// Ce qu'on partage aux composants du site
export interface CartContextType {
  items: CartItem[];
  addItem: (tree: CartItem['tree'], quantity?: number) => void;
  removeItem: (treeId: number) => void;
  updateQuantity: (treeId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

// undefined permet de détecter l'absence du futur CartProvider.
export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
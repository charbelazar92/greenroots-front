import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export function useCart() {
  // Lit les données du panier dans le contexte.
  const cart = useContext(CartContext);

  // Vérifie qu'un provider fournit bien le panier.
  if (cart === undefined) {
    throw new Error('useCart doit être utilisé dans un CartProvider');
  }

  return cart;
}
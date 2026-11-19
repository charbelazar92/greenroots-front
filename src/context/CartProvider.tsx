import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../@types/cart';
import { CartContext } from './CartContext';
import { CART_STORAGE_KEY, readStoredCart } from '../utils/cartStorage';

// Les composants entourés par le provider.
interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  // 1. Charger le panier sauvegardé au démarrage.
  const [items, setItems] = useState<CartItem[]>(readStoredCart);

  // 2. Sauvegarder le panier après chaque modification.
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      console.warn(
        'Impossible de sauvegarder le panier dans ce navigateur.',
      );
    }
  }, [items]);

  // 3. Ajouter un arbre, avec une quantité de 1 par défaut.
  function addItem(tree: CartItem['tree'], quantity: number = 1) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      return;
    }

    setItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.tree.id === tree.id,
      );

      // Arbre déjà présent : augmenter sa quantité.
      if (existingItem) {
        return previousItems.map((item) => {
          if (item.tree.id === tree.id) {
            return { ...item, quantity: item.quantity + quantity };
          }

          return item;
        });
      }

      // Nouvel arbre : ajouter une ligne au panier.
      return [...previousItems, { tree, quantity }];
    });
  }

  // 4. Supprimer une ligne du panier.
  function removeItem(treeId: number) {
    setItems((previousItems) =>
      previousItems.filter((item) => item.tree.id !== treeId),
    );
  }

  // 5. Remplacer la quantité d'un arbre.
  function updateQuantity(treeId: number, quantity: number) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      return;
    }

    setItems((previousItems) =>
      previousItems.map((item) => {
        if (item.tree.id === treeId) {
          return { ...item, quantity };
        }

        return item;
      }),
    );
  }

  // 6. Vider le panier.
  function clearCart() {
    setItems([]);
  }

  // 7. Calculer le montant et le nombre total d'arbres.
  let totalInCents = 0;
  let cartCount = 0;

  for (const item of items) {
    const unitPriceInCents = Math.round(Number(item.tree.price) * 100);

    totalInCents += unitPriceInCents * item.quantity;
    cartCount += item.quantity;
  }

  const cartTotal = totalInCents / 100;

  // 8. Partager les données et les fonctions avec les enfants.
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
import { useEffect, useState } from 'react';

import type { Order, PendingOrderApiError } from '../@types/order';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import { useAuth } from './useAuth';

const pendingOrderMessage =
  'Vous avez déjà une commande en attente de paiement.';

// Vérifie si l'utilisateur possède une commande en attente.
export function usePendingOrderCheck(
  cartItemCount: number,
) {
  const {
    user,
    setUser,
    isAuthLoading,
  } = useAuth();

  const [
    isPendingOrderLoading,
    setIsPendingOrderLoading,
  ] = useState(true);
  const [
    pendingOrderConflict,
    setPendingOrderConflict,
  ] = useState<PendingOrderApiError | null>(null);

  useEffect(() => {
    // Vérifie uniquement un panier non vide après la restauration de la session.
    if (
      isAuthLoading ||
      user === null ||
      cartItemCount === 0
    ) {
      return;
    }

    const controller = new AbortController();

    async function checkPendingOrder() {
      setIsPendingOrderLoading(true);

      try {
        const response = await fetchWithAuth(
          `${import.meta.env.VITE_API_URL}/api/orders`,
          {
            signal: controller.signal,
          },
        );

        // Termine la session si les tokens sont invalides.
        if (response.status === 401) {
          setUser(null);
          return;
        }

        // Une erreur de vérification ne bloque pas le checkout.
        if (!response.ok) {
          return;
        }

        const orders =
          (await response.json()) as Order[];

        const pendingOrder = orders.find(
          (order) => order.status === 'pending',
        );

        if (pendingOrder) {
          setPendingOrderConflict({
            error: pendingOrderMessage,
            order: pendingOrder,
          });
        }
      } catch (error) {
        // Ignore l'annulation lors du départ de la page.
        if (
          error instanceof Error &&
          error.name === 'AbortError'
        ) {
          return;
        }

        // Le POST restera protégé par le backend.
      } finally {
        if (!controller.signal.aborted) {
          setIsPendingOrderLoading(false);
        }
      }
    }

    void checkPendingOrder();

    // Annule la requête si la page est quittée.
    return () => controller.abort();
  }, [
    cartItemCount,
    isAuthLoading,
    setUser,
    user,
  ]);

  return {
    isPendingOrderLoading,
    pendingOrderConflict,
    setPendingOrderConflict,
  };
}
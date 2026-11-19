import { useEffect, useState } from 'react';

import type { Order, OrderApiError } from '../@types/order';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import { useAuth } from './useAuth';

// Charge une commande à partir de son identifiant.
export function useOrderDetails(
  id: string | undefined,
) {
  const {
    user,
    setUser,
    isAuthLoading,
  } = useAuth();

  const [order, setOrder] =
    useState<Order | null>(null);
  const [errorMessage, setErrorMessage] =
    useState('');
  const [isOrderLoading, setIsOrderLoading] =
    useState(true);

  const orderId = Number(id);

  const isOrderIdInvalid =
    id !== undefined &&
    (!Number.isInteger(orderId) || orderId <= 0);

  useEffect(() => {
    if (
      isAuthLoading ||
      user === null ||
      id === undefined ||
      isOrderIdInvalid
    ) {
      return;
    }

    const controller = new AbortController();

    async function loadOrder() {
      setIsOrderLoading(true);
      setErrorMessage('');

      try {
        const response = await fetchWithAuth(
          `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
          {
            signal: controller.signal,
          },
        );

        // Termine la session si les tokens sont invalides.
        if (response.status === 401) {
          setUser(null);
          return;
        }

        const data = (await response.json()) as
          | Order
          | OrderApiError;

        if (!response.ok) {
          const message =
            'error' in data
              ? data.error
              : "La commande n'a pas pu être récupérée.";

          setErrorMessage(message);
          return;
        }

        setOrder(data as Order);
      } catch (error) {
        // Ignore l'annulation lors du départ de la page.
        if (
          error instanceof Error &&
          error.name === 'AbortError'
        ) {
          return;
        }

        setErrorMessage(
          'Impossible de contacter le serveur.',
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsOrderLoading(false);
        }
      }
    }

    void loadOrder();

    // Annule la requête si la page est quittée.
    return () => controller.abort();
  }, [
    id,
    isAuthLoading,
    isOrderIdInvalid,
    setUser,
    user,
  ]);

  return {
    order,
    errorMessage,
    isOrderLoading,
    isOrderIdInvalid,
  };
}
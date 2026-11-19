import { useEffect, useState } from "react";

import type {
  Order,
  OrderApiError,
} from "../@types/order";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import { useAuth } from "./useAuth";

// Charge les commandes de l'utilisateur connecté.
export function useOrders() {
  const {
    user,
    setUser,
    isAuthLoading,
  } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] =
    useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isAuthLoading || user === null) {
      return;
    }

    const controller = new AbortController();

    async function loadOrders() {
      setIsOrdersLoading(true);
      setErrorMessage("");

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

        const data = (await response.json()) as
          | Order[]
          | OrderApiError;

        // Affiche l'erreur retournée par le back.
        if (!response.ok) {
          const message =
            "error" in data
              ? data.error
              : "Vos commandes n’ont pas pu être récupérées.";

          setErrorMessage(message);
          return;
        }

        setOrders(data as Order[]);
      } catch (error) {
        // Ignore l'annulation lors du départ de la page.
        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          return;
        }

        setErrorMessage(
          "Impossible de contacter le serveur.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsOrdersLoading(false);
        }
      }
    }

    void loadOrders();

    // Annule la requête si la page est quittée.
    return () => controller.abort();
  }, [
    isAuthLoading,
    setUser,
    user,
  ]);

  return {
    orders,
    isOrdersLoading,
    errorMessage,
  };
}
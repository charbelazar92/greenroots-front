import { useState } from 'react';
import { useNavigate } from 'react-router';

import type {
  CreateOrderBody,
  Order,
  OrderApiError,
  PendingOrderApiError,
} from '../@types/order';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import { useAuth } from './useAuth';
import { useCart } from './useCart';

interface UseCheckoutSubmitParams {
  setPendingOrderConflict: (
    conflict: PendingOrderApiError | null,
  ) => void;
}

// Gère la validation et la création d'une commande.
export function useCheckoutSubmit({
  setPendingOrderConflict,
}: UseCheckoutSubmitParams) {
  const cart = useCart();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [submitMessage, setSubmitMessage] =
    useState('');
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(formData: FormData) {
    const firstname = String(
      formData.get('firstname') ?? '',
    ).trim();

    const lastname = String(
      formData.get('lastname') ?? '',
    ).trim();

    const email = String(
      formData.get('email') ?? '',
    ).trim();

    // Vérifie les informations obligatoires.
    if (!firstname || !lastname || !email) {
      setSubmitMessage(
        'Veuillez remplir tous les champs obligatoires.',
      );
      return;
    }

    // Empêche la validation d'un panier vide.
    if (cart.items.length === 0) {
      setSubmitMessage('Votre panier est vide.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    setPendingOrderConflict(null);

    // Prépare uniquement les données utiles au back.
    const body: CreateOrderBody = {
      items: cart.items.map(
        ({ tree, quantity }) => ({
          treeId: tree.id,
          quantity,
        }),
      ),
    };

    try {
      // Crée la commande avec renouvellement de session.
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );

      // Termine la session si les tokens sont invalides.
      if (response.status === 401) {
        setUser(null);
        return;
      }

      const data = (await response.json()) as
        | Order
        | OrderApiError
        | PendingOrderApiError;

      // Affiche la commande déjà en attente.
      if (
        response.status === 409 &&
        'order' in data
      ) {
        setPendingOrderConflict(
          data as PendingOrderApiError,
        );
        return;
      }

      // Conserve le traitement des autres erreurs.
      if (!response.ok) {
        const message =
          'error' in data
            ? data.error
            : "La commande n'a pas pu être créée.";

        setSubmitMessage(message);
        return;
      }

      const order = data as Order;

      // Vide le panier uniquement après la création.
      cart.clearCart();

      // Redirige vers la confirmation.
      navigate(`/cart/order/${order.id}`);
    } catch {
      setSubmitMessage(
        'Impossible de contacter le serveur.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    handleSubmit,
    isSubmitting,
    submitMessage,
  };
}
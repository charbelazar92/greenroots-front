import { Navigate, useParams } from 'react-router';

import confirmationIcon from '../../assets/icons/confirmation.png';
import { OrderConfirmationError } from '../../components/order/OrderConfirmationError';
import { OrderConfirmationSummary } from '../../components/order/OrderConfirmationSummary';
import { PaymentInformation } from '../../components/order/PaymentInformation';
import { useAuth } from '../../hooks/useAuth';
import { useOrderDetails } from '../../hooks/useOrderDetails';

import './OrderConfirmationPage.css';

export function OrderConfirmationPage() {
  const { id } = useParams();
  const { user, isAuthLoading } = useAuth();

  const {
    order,
    errorMessage,
    isOrderLoading,
    isOrderIdInvalid,
  } = useOrderDetails(id);

  // Attend la vérification de la session.
  if (isAuthLoading) {
    return (
      <main className="order-confirmation-page">
        <p>Vérification de votre session...</p>
      </main>
    );
  }

  // Redirige les visiteurs vers la connexion.
  if (user === null) {
    return (
      <Navigate
        to="/login"
        state={{
          redirectTo: `/cart/order/${id ?? ''}`,
        }}
        replace
      />
    );
  }

  // Redirige si aucun identifiant n'est présent.
  if (id === undefined) {
    return <Navigate to="/cart" replace />;
  }

  // Affiche une erreur si l'identifiant est invalide.
  if (isOrderIdInvalid) {
    return (
      <OrderConfirmationError
        message="L’identifiant de la commande est invalide."
      />
    );
  }

  // Affiche le chargement de la commande.
  if (isOrderLoading) {
    return (
      <main className="order-confirmation-page">
        <p>Chargement de votre commande...</p>
      </main>
    );
  }

  // Affiche une erreur si la commande est introuvable.
  if (errorMessage || order === null) {
    return (
      <OrderConfirmationError
        message={
          errorMessage ||
          "La commande n'a pas pu être chargée."
        }
      />
    );
  }

  return (
    <main className="order-confirmation-page">
      {/* Présente la confirmation de la commande. */}
      <header className="order-confirmation-header">
        <img
          className="order-confirmation-check"
          src={confirmationIcon}
          alt=""
        />

        <h1>Commande confirmée</h1>

        <p className="order-confirmation-number">
          n° {order.orderNumber}
        </p>

        <p className="order-confirmation-introduction">
          Merci pour votre commande. Vous disposez de
          30 jours pour la régler. Passé ce délai, elle
          sera annulée.
        </p>
      </header>

      <div className="order-confirmation-layout">
        {/* Affiche les informations de paiement. */}
        <PaymentInformation
          orderNumber={order.orderNumber}
        />

        {/* Affiche le récapitulatif de la commande. */}
        <OrderConfirmationSummary order={order} />
      </div>
    </main>
  );
}
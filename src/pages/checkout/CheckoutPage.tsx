import { Link, Navigate } from 'react-router';

import { CheckoutCustomerInformation } from '../../components/order/CheckoutCustomerInformation';
import { CheckoutOrderSummary } from '../../components/order/CheckoutOrderSummary';
import { CheckoutPaymentMethods } from '../../components/order/CheckoutPaymentMethods';
import { CheckoutSubmitActions } from '../../components/order/CheckoutSubmitActions';
import { PendingOrderModal } from '../../components/order/PendingOrderModal';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useCheckoutSubmit } from '../../hooks/useCheckoutSubmit';
import { usePendingOrderCheck } from '../../hooks/usePendingOrderCheck';

import './CheckoutPage.css';

export function CheckoutPage() {
  const cart = useCart();

  const {
    user,
    isAuthLoading,
  } = useAuth();

  const {
    isPendingOrderLoading,
    pendingOrderConflict,
    setPendingOrderConflict,
  } = usePendingOrderCheck(cart.items.length);

  const {
    handleSubmit,
    isSubmitting,
    submitMessage,
  } = useCheckoutSubmit({
    setPendingOrderConflict,
  });

  // Attend la vérification de la session.
  if (isAuthLoading) {
    return (
      <div className="checkout-page">
        <p>Chargement de vos informations...</p>
      </div>
    );
  }

  // Redirige les visiteurs vers la connexion.
  if (user === null) {
    return (
      <Navigate
        to="/login"
        state={{ redirectTo: '/cart/order' }}
        replace
      />
    );
  }

  // Attend la vérification des commandes existantes.
  if (
    cart.items.length > 0 &&
    isPendingOrderLoading
  ) {
    return (
      <div className="checkout-page">
        <p>Vérification de vos commandes...</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Link
        className="checkout-back-link"
        to="/cart"
      >
        <span
          className="checkout-back-icon"
          aria-hidden="true"
        />

        Retour au panier
      </Link>

      <h1>Valider ma commande</h1>

      <p className="checkout-payment-deadline">
        Le paiement doit être effectué dans les 30 jours
        suivant la validation. Passé ce délai, votre
        commande sera automatiquement annulée.
      </p>

      {/* Affiche un message si le panier est vide. */}
      {cart.items.length === 0 ? (
        <div className="checkout-empty">
          <h2>Votre panier est vide</h2>

          <p>
            Choisissez des arbres avant de valider votre
            commande.
          </p>

          <Link to="/catalog">
            Découvrir les arbres
          </Link>
        </div>
      ) : (
        <form
          className="checkout-form"
          action={handleSubmit}
        >
          <div className="checkout-details">
            {/* Étape 1 : informations utilisateur. */}
            <CheckoutCustomerInformation user={user} />

            {/* Étape 2 : moyens de paiement. */}
            <CheckoutPaymentMethods />
          </div>

          {/* Étape 3 : récapitulatif et validation. */}
          <div className="checkout-confirmation">
            <CheckoutOrderSummary
              items={cart.items}
              total={cart.cartTotal}
            />

            <CheckoutSubmitActions
              isSubmitting={isSubmitting}
              message={submitMessage}
            />
          </div>
        </form>
      )}

      {/* Affiche la commande déjà en attente. */}
      {pendingOrderConflict && (
        <PendingOrderModal
          conflict={pendingOrderConflict}
          onClose={() =>
            setPendingOrderConflict(null)
          }
        />
      )}
    </div>
  );
}
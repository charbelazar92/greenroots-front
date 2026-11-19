import { Link } from 'react-router';

import treeIcon from '../../assets/icons/footer-separator-tree.png';

interface CheckoutSubmitActionsProps {
  isSubmitting: boolean;
  message: string;
}

// Affiche les actions et les messages de validation.
export function CheckoutSubmitActions({
  isSubmitting,
  message,
}: CheckoutSubmitActionsProps) {
  return (
    <>
      <button
        className="checkout-submit-button"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? 'Création en cours...'
          : 'Confirmer ma commande'}

        <img
          className="checkout-submit-icon"
          src={treeIcon}
          alt=""
        />
      </button>

      <p className="checkout-legal-note">
        En validant ma commande, j’accepte les{' '}
        <Link to="/conditions-generales-de-vente">
          conditions générales de vente
        </Link>{' '}
        et la{' '}
        <Link to="/politique-de-confidentialite">
          politique de confidentialité
        </Link>
        .
      </p>

      {message && (
        <p
          className="checkout-message"
          role="alert"
        >
          {message}
        </p>
      )}
    </>
  );
}
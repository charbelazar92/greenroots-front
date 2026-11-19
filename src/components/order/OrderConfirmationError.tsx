import { Link } from 'react-router';

interface OrderConfirmationErrorProps {
  message: string;
}

// Affiche une erreur liée à la récupération d'une commande.
export function OrderConfirmationError({
  message,
}: OrderConfirmationErrorProps) {
  return (
    <main className="order-confirmation-page">
      <header className="order-confirmation-header">
        <h1>Commande introuvable</h1>

        <p>{message}</p>

        <Link
          className="order-secondary-link"
          to="/catalog"
        >
          Retourner au catalogue
        </Link>
      </header>
    </main>
  );
}
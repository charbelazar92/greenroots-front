import { useState } from 'react';
import { Link } from 'react-router';

import type { Order } from '../../@types/order';
import {
  getOrderTreeCount,
  getPaymentDeadline,
} from '../../utils/orderUtils';

interface OrderConfirmationSummaryProps {
  order: Order;
}

// Affiche le récapitulatif d'une commande confirmée.
export function OrderConfirmationSummary({
  order,
}: OrderConfirmationSummaryProps) {
  const [
    isDeadlineInfoOpen,
    setIsDeadlineInfoOpen,
  ] = useState(false);

  const treeCount =
    getOrderTreeCount(order.items);

  const orderDate = new Date(order.orderDate);

  const paymentDeadline =
    getPaymentDeadline(orderDate);

  const dateFormatter = new Intl.DateTimeFormat(
    'fr-FR',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    },
  );

  const formattedOrderDate =
    dateFormatter.format(orderDate);

  const formattedPaymentDeadline =
    dateFormatter.format(paymentDeadline);

  const statusLabels: Record<
    Order['status'],
    string
  > = {
    pending: 'En attente de paiement',
    validated: 'Validée',
    cancelled: 'Annulée',
  };

  return (
    <section className="order-summary">
      <h2>Récapitulatif de la commande</h2>

      <dl className="order-summary-details">
        <div>
          <dt>Nombre d’arbres commandés</dt>
          <dd>{treeCount}</dd>
        </div>

        <div>
          <dt>Date de la commande</dt>

          <dd>
            <time dateTime={order.orderDate}>
              {formattedOrderDate}
            </time>
          </dd>
        </div>

        <div>
          <dt>Statut</dt>
          <dd>{statusLabels[order.status]}</dd>
        </div>

        {/* Met en avant la date limite. */}
        <div className="order-summary-deadline">
          <dt>À payer avant le</dt>

          <dd className="order-summary-deadline__value">
            <time
              dateTime={paymentDeadline.toISOString()}
            >
              {formattedPaymentDeadline}
            </time>

            <span className="order-summary-deadline__info">
              <button
                type="button"
                className="order-summary-deadline__button"
                aria-label="Informations sur le délai de paiement"
                aria-expanded={isDeadlineInfoOpen}
                aria-describedby="payment-deadline-tooltip"
                onClick={() =>
                  setIsDeadlineInfoOpen(
                    (previousValue) =>
                      !previousValue,
                  )
                }
              >
                i
              </button>

              <span
                id="payment-deadline-tooltip"
                className={
                  `order-summary-deadline__tooltip` +
                  (isDeadlineInfoOpen
                    ? ` order-summary-deadline__tooltip--visible`
                    : ``)
                }
                role="tooltip"
              >
                Sans réception du paiement sous
                30 jours, la commande sera
                automatiquement annulée.
              </span>
            </span>
          </dd>
        </div>
      </dl>

      <div className="order-summary-total">
        <span>Total</span>
        <strong>{order.totalAmount} €</strong>
      </div>

      {/* Propose les actions après la commande. */}
      <div className="order-summary-actions">
        <Link
          className="order-primary-link"
          to="/me/orders"
        >
          Voir mes commandes
        </Link>

        <Link
          className="order-secondary-link"
          to="/catalog"
        >
          Retourner au catalogue
        </Link>
      </div>
    </section>
  );
}
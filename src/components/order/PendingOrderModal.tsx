import {
  useEffect,
  useRef,
} from 'react';
import { Link } from 'react-router';

import type {
  PendingOrderApiError,
} from '../../@types/order';
import { getPaymentDeadline } from '../../utils/orderUtils';

import './PendingOrderModal.css';

interface PendingOrderModalProps {
  conflict: PendingOrderApiError;
  onClose: () => void;
}

export function PendingOrderModal({
  conflict,
  onClose,
}: PendingOrderModalProps) {
  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const { error, order } = conflict;

  const orderDate = new Date(order.orderDate);

  const paymentDeadline =
    getPaymentDeadline(orderDate);

  // Prépare les dates au format français.
  const dateFormatter = new Intl.DateTimeFormat(
    'fr-FR',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    },
  );

  const formattedOrderDate =
    dateFormatter.format(orderDate);

  const formattedPaymentDeadline =
    dateFormatter.format(paymentDeadline);

  // Place le focus dans la modale et gère Escape.
  useEffect(() => {
    const previouslyFocusedElement =
      document.activeElement as HTMLElement | null;

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener(
      'keydown',
      handleKeyDown,
    );

    // Restaure le focus à la fermeture.
    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown,
      );

      previouslyFocusedElement?.focus();
    };
  }, [onClose]);

  // Ferme la modale lors d'un clic sur l'arrière-plan.
  function handleOverlayClick(
    event: React.MouseEvent<HTMLDivElement>,
  ) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="pending-order-modal__overlay"
      onClick={handleOverlayClick}
    >
      <section
        className="pending-order-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pending-order-modal-title"
        aria-describedby="pending-order-modal-message"
      >
        {/* En-tête et fermeture rapide. */}
        <header className="pending-order-modal__header">
          <h2 id="pending-order-modal-title">
            Commande en attente
          </h2>

          <button
            ref={closeButtonRef}
            className="pending-order-modal__close"
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre"
          >
            ×
          </button>
        </header>

        {/* Message retourné par le backend. */}
        <p
          id="pending-order-modal-message"
          className="pending-order-modal__message"
        >
          {error}
        </p>

        {/* Informations principales de la commande. */}
        <dl className="pending-order-modal__summary">
          <div>
            <dt>Numéro de commande</dt>
            <dd>{order.orderNumber}</dd>
          </div>

          <div>
            <dt>Date</dt>

            <dd>
              <time dateTime={order.orderDate}>
                {formattedOrderDate}
              </time>
            </dd>
          </div>

          <div>
            <dt>À payer avant le</dt>

            <dd>
              <time
                dateTime={paymentDeadline.toISOString()}
              >
                {formattedPaymentDeadline}
              </time>
            </dd>
          </div>
        </dl>

        {/* Articles de la commande existante. */}
        <div className="pending-order-modal__items">
          <h3>Articles</h3>

          <ul>
            {order.items.map((item) => (
              <li key={item.treeId}>
                <div>
                  <span>{item.name}</span>

                  <span>
                    Quantité : {item.quantity}
                  </span>
                </div>

                <strong>
                  {item.lineTotal} €
                </strong>
              </li>
            ))}
          </ul>
        </div>

        {/* Montant total de la commande. */}
        <div className="pending-order-modal__total">
          <span>Total</span>

          <strong>
            {order.totalAmount} €
          </strong>
        </div>

        {/* Actions proposées à l'utilisateur. */}
        <div className="pending-order-modal__actions">
          <Link
            className="pending-order-modal__primary"
            to={`/cart/order/${order.id}`}
            onClick={onClose}
          >
            Voir ma commande
          </Link>

          <button
            className="pending-order-modal__secondary"
            type="button"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </section>
    </div>
  );
}
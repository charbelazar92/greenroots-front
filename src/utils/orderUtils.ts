import type { Order } from '../@types/order';

export const PAYMENT_DEADLINE_DAYS = 30;

// Calcule la date limite de paiement d'une commande.
export function getPaymentDeadline(
  orderDate: string | Date,
) {
  const paymentDeadline = new Date(orderDate);

  paymentDeadline.setDate(
    paymentDeadline.getDate() +
      PAYMENT_DEADLINE_DAYS,
  );

  return paymentDeadline;
}

// Calcule le nombre total d'arbres d'une commande.
export function getOrderTreeCount(
  items: Order['items'],
) {
  return items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
}
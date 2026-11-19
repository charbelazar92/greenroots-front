import type { CartItem } from '../../@types/cart';

interface CheckoutOrderSummaryProps {
  items: CartItem[];
  total: number;
}
// Affiche les articles et le montant total du panier.
export function CheckoutOrderSummary({
  items,
  total,
}: CheckoutOrderSummaryProps) {
  return (
    <section
      className="checkout-section checkout-summary"
      aria-labelledby="checkout-summary-title"
    >
      <div className="checkout-section-heading">
        <span
          className="checkout-step"
          aria-hidden="true"
        >
          3
        </span>

        <h2 id="checkout-summary-title">
          Récapitulatif de la commande
        </h2>
      </div>

      <div className="checkout-section-content">
        <ul className="checkout-items">
          {items.map(({ tree, quantity }) => (
            <li
              className="checkout-item"
              key={tree.id}
            >
              <span>
                {tree.name} × {quantity}
              </span>

              <strong>
                {(
                  Math.round(Number(tree.price) * 100) *
                  quantity /
                  100
                ).toFixed(2)}{' '}
                €
              </strong>
            </li>
          ))}
        </ul>

        <div className="checkout-total">
          <span>Total</span>

          <strong>{total.toFixed(2)} €</strong>
        </div>
      </div>
    </section>
  );
}
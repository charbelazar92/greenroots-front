import type { Order } from "../../@types/order";
import { getOrderTreeCount } from "../../utils/orderUtils";

interface OrderCardProps {
  order: Order;
}

const statusLabels: Record<
  Order["status"],
  string
> = {
  pending: "En attente",
  validated: "Validée",
  cancelled: "Annulée",
};

const orderDateFormatter =
  new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

// Affiche les informations principales d'une commande.
export function OrderCard({
  order,
}: OrderCardProps) {
  const treeCount =
    getOrderTreeCount(order.items);

  const formattedDate = orderDateFormatter.format(
    new Date(order.orderDate),
  );

  // Utilise la première image disponible.
  const previewImage = order.items.find(
    (item) => item.urlImage,
  )?.urlImage;

  return (
    <li className="orders-page__list-item">
      <article className="order-card">
        {previewImage && (
          <img
            className="order-card__image"
            src={previewImage}
            alt=""
          />
        )}

        <div className="order-card__content">
          <h2 className="order-card__title">
            Commande #{order.orderNumber}
          </h2>

          {/* Informations principales. */}
          <dl className="order-card__details">
            <div>
              <dt>Date</dt>
              <dd>{formattedDate}</dd>
            </div>

            <div>
              <dt>Quantité</dt>
              <dd>
                {treeCount} arbre
                {treeCount > 1 ? "s" : ""}
              </dd>
            </div>

            <div>
              <dt>Montant</dt>
              <dd>{order.totalAmount} €</dd>
            </div>
          </dl>

          {/* Statut actuel de la commande. */}
          <p
            className={
              `order-card__status ` +
              `order-card__status--${order.status}`
            }
          >
            {statusLabels[order.status]}
          </p>
        </div>
      </article>
    </li>
  );
}
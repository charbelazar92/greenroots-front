import { Link, Navigate } from "react-router";

import { OrderCard } from "../../components/order/OrderCard";
import { useAuth } from "../../hooks/useAuth";
import { useOrders } from "../../hooks/useOrders";

import "./OrdersPage.css";

export function OrdersPage() {
  const {
    user,
    isAuthLoading,
  } = useAuth();

  const {
    orders,
    isOrdersLoading,
    errorMessage,
  } = useOrders();

  // Attend la restauration de la session.
  if (isAuthLoading) {
    return (
      <section className="orders-page">
        <p>Chargement de votre compte…</p>
      </section>
    );
  }

  // Redirige les visiteurs vers la connexion.
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ redirectTo: "/me/orders" }}
        replace
      />
    );
  }

  // Affiche le chargement des commandes.
  if (isOrdersLoading) {
    return (
      <section className="orders-page">
        <p>Chargement de vos commandes…</p>
      </section>
    );
  }

  // Affiche une erreur si la requête échoue.
  if (errorMessage) {
    return (
      <section className="orders-page">
        <p role="alert">{errorMessage}</p>
      </section>
    );
  }

  return (
    <section className="orders-page">
      {/* Retour vers l'espace personnel. */}
      <Link
        className="orders-page__back-link"
        to="/me"
      >
        <span
          className="orders-page__back-icon"
          aria-hidden="true"
        />

        Mon compte
      </Link>

      {/* Indique la position actuelle dans le compte. */}
      <nav
        className="orders-page__breadcrumb"
        aria-label="Fil d’Ariane"
      >
        <Link to="/me">Mon compte</Link>

        <span aria-hidden="true">›</span>

        <span aria-current="page">
          Mes commandes
        </span>
      </nav>

      {/* Présente la page des commandes. */}
      <header className="orders-page__header">
        <h1 className="orders-page__title">
          Mes commandes
        </h1>

        <p className="orders-page__introduction">
          Retrouvez ici l’historique de toutes vos
          commandes. Chaque arbre compte, merci de faire
          partie de l’aventure GreenRoots !
        </p>
      </header>

      {/* Affiche un message si la liste est vide. */}
      {orders.length === 0 ? (
        <p className="orders-page__empty">
          Vous n’avez pas encore passé de commande.
        </p>
      ) : (
        <ul className="orders-page__list">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
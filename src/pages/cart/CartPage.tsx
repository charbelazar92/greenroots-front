import { Link } from 'react-router';
import { useCart } from '../../hooks/useCart';
import { QuantitySelector } from '../../components/quantitySelector/QuantitySelector';
import './CartPage.css';
import treeIcon from '../../assets/icons/footer-separator-tree.png';
import removeIcon from '../../assets/icons/remove.png';

export function CartPage() {
  // Récupère les données et les actions du panier partagé.
  const cart = useCart();

  return (
    <div className="cart-page">
      <Link className="cart-back-link" to="/catalog">
        <span className="cart-back-icon" aria-hidden="true" />
        Continuer mes achats
      </Link>

      <h1>Mon panier</h1>

      {/* Affiche un message si le panier est vide, sinon son contenu. */}
      {cart.items.length === 0 ? (
        <div className="cart-empty">
          <h2>Votre panier est vide</h2>
          <p>Découvrez nos arbres et choisissez votre contribution.</p>

          <Link className="cart-catalog-link" to="/catalog">
            Découvrir les arbres
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          {/* Affiche le nombre total d'articles, quantités comprises. */}
          <p aria-live="polite">
            {cart.cartCount} article{cart.cartCount > 1 ? 's' : ''}
          </p>

          <div className="cart-layout">
            <section aria-label="Arbres dans le panier">
              <ul className="cart-items">
                {/* Crée une carte pour chaque ligne du panier. */}
                {cart.items.map(({ tree, quantity }) => (
                  <li className="cart-item" key={tree.id}>
                    {/* Image à gauche et informations à droite. */}
                    <div className="cart-item-product">
                      <img
                        className="cart-item-image"
                        src={tree.url_image}
                        alt={tree.name}
                      />

                      <div className="cart-item-info">
                        <h2>{tree.name}</h2>

                        <p className="cart-item-species">
                          {tree.species}
                        </p>

                        <p className="cart-item-price">
                          {Number(tree.price).toFixed(2)} €
                        </p>
                      </div>
                    </div>

                    {/* Quantité et suppression sur la même ligne. */}
                    <div className="cart-item-controls">
                      <div className="cart-quantity-group">
                        <span>Quantité :</span>

                        <QuantitySelector
                          quantity={quantity}
                          onQuantityChange={(newQuantity) =>
                            cart.updateQuantity(tree.id, newQuantity)
                          }
                          label={`Quantité pour ${tree.name}`}
                        />
                      </div>

                      {/* Supprime toute la ligne de cet arbre. */}
                      <button
                        className="cart-remove"
                        type="button"
                        aria-label={`Supprimer ${tree.name} du panier`}
                        onClick={() => cart.removeItem(tree.id)}
                      >
                        <img 
                          src={removeIcon}
                          alt=""
                          className="cart-remove-icon"
                        />
                        Supprimer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <div className="cart-checkout">
              {/* Affiche les montants calculés par le panier. */}
              <aside
                className="cart-summary"
                aria-label="Récapitulatif du panier"
              >
                <h2>Récapitulatif</h2>

                <div className="cart-subtotal">
                  <span>
                    Sous-total ({cart.cartCount} article
                    {cart.cartCount > 1 ? 's' : ''})
                  </span>

                  <strong>{cart.cartTotal.toFixed(2)} €</strong>
                </div>

                <div className="cart-total" aria-live="polite">
                  <span>Total</span>
                  <strong>{cart.cartTotal.toFixed(2)} €</strong>
                </div>
              </aside>
              
              <Link className="cart-checkout-button" 
                to="/login"
                state={{ redirectTo: '/cart/order' }}>
                Valider mon panier
                <img
                  src={treeIcon}
                  alt=""
                  className="cart-checkout-icon"
                />
              </Link>

              <p className="cart-checkout-note">
                Connexion demandée avant la commande.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
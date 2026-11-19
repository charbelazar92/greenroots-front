import { useState } from 'react';
import { Link } from 'react-router';

import accountIcon from '../../assets/icons/user-account.svg';
import cartIcon from '../../assets/icons/cart.svg';
import menuIcon from '../../assets/icons/menu.svg';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { HeaderBrand } from './HeaderBrand';
import { HeaderDesktopNav } from './HeaderDesktopNav';
import { HeaderLogoutButton } from './HeaderLogoutButton';
import { HeaderMenu } from './HeaderMenu';

import './Header.css';

export function Header() {
  const { cartCount } = useCart();
  const { isLoggedIn, user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);
  const [
    isAccountMenuOpen,
    setIsAccountMenuOpen,
  ] = useState(false);

  // Ouvre ou ferme le menu mobile.
  function handleMenuToggle() {
    setIsMenuOpen(
      (previousIsMenuOpen) =>
        !previousIsMenuOpen,
    );
  }

  // Ferme le menu mobile après un clic.
  function handleMenuClose() {
    setIsMenuOpen(false);
  }

  return (
    <header className="header">
      <HeaderBrand />

      <HeaderDesktopNav />

      <div className="header-buttons">
        {/* Affiche le compte ou le lien de connexion. */}
        {isLoggedIn ? (
          <div className="header-account">
            <button
              type="button"
              className="header-account-button"
              aria-label="Menu du compte"
              aria-expanded={isAccountMenuOpen}
              aria-controls="header-account-menu"
              onClick={() =>
                setIsAccountMenuOpen(
                  !isAccountMenuOpen,
                )
              }
            >
              <img
                src={accountIcon}
                alt=""
                className="header-account-icon"
              />

              <span className="header-account-name">
                {user?.firstname}
              </span>
            </button>

            {/* Affiche le menu du compte sur desktop. */}
            {isAccountMenuOpen && (
              <nav
                id="header-account-menu"
                className="header-account-menu"
                aria-label="Navigation du compte"
              >
                <ul>
                  <li>
                    <Link
                      to="/me"
                      onClick={() =>
                        setIsAccountMenuOpen(false)
                      }
                    >
                      Mon compte
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/me/profil"
                      onClick={() =>
                        setIsAccountMenuOpen(false)
                      }
                    >
                      Mes informations
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/me/orders"
                      onClick={() =>
                        setIsAccountMenuOpen(false)
                      }
                    >
                      Mes commandes
                    </Link>
                  </li>

                  {/* Réserve l'administration aux admins. */}
                  {user?.role === 'admin' && (
                    <li>
                      <Link
                        to="/admin"
                        onClick={() =>
                          setIsAccountMenuOpen(false)
                        }
                      >
                        Administration
                      </Link>
                    </li>
                  )}

                  <li>
                    <HeaderLogoutButton
                      onClose={() =>
                        setIsAccountMenuOpen(false)
                      }
                    />
                  </li>
                </ul>
              </nav>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="header-login-link"
          >
            Se connecter
          </Link>
        )}

        {/* Affiche le panier hors des petits écrans. */}
        <Link
          to="/cart"
          className="header-cart-button"
          aria-label={
            `Voir le panier : ${cartCount} arbre` +
            (cartCount > 1 ? 's' : '')
          }
        >
          <img
            src={cartIcon}
            alt=""
            className="header-cart-icon"
          />

          {cartCount > 0 && (
            <span className="header-cart-count">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Ouvre le menu de navigation mobile. */}
        <button
          type="button"
          className={
            `header-menu-button` +
            (cartCount > 0
              ? ` header-menu-button--has-cart`
              : ``)
          }
          onClick={handleMenuToggle}
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen
              ? 'Fermer le menu'
              : cartCount > 0
                ? `Ouvrir le menu, panier : ${cartCount} arbre${
                    cartCount > 1 ? 's' : ''
                  }`
                : 'Ouvrir le menu'
          }
        >
          {isMenuOpen ? (
            <span
              className="header-menu-close"
              aria-hidden="true"
            >
              ×
            </span>
          ) : (
            <img
              src={menuIcon}
              alt=""
              className="header-menu-icon"
            />
          )}

          {/* Signale le contenu du panier sur mobile. */}
          {cartCount > 0 && (
            <span
              key={cartCount}
              className="header-menu-count"
              aria-hidden="true"
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Affiche le contenu du menu mobile. */}
      {isMenuOpen && (
        <HeaderMenu onClose={handleMenuClose} />
      )}
    </header>
  );
}
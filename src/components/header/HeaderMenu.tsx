import { HeaderNavLinks } from './HeaderNavLinks';
import { Link } from "react-router";
import { useCart } from '../../hooks/useCart';
import cartIcon from '../../assets/icons/cart.svg';
import { useAuth } from "../../hooks/useAuth";

import { HeaderLogoutButton } from "./HeaderLogoutButton";


// Déclare la fonction reçue du Header pour fermer le menu.
interface HeaderMenuProps {
  onClose: () => void;
}

export function HeaderMenu({ onClose }: HeaderMenuProps) {
  const { cartCount } = useCart();
  const { isLoggedIn, user } = useAuth();



  return (
    <nav className="header-menu" aria-label="Navigation principale">
      <ul className="header-menu-list">
        <HeaderNavLinks onClose={onClose} />

        <li>
          {isLoggedIn ? (
            <Link
              to="/me"
              className="header-nav-link"
              onClick={onClose}
            >
              Mon compte
            </Link>
          ) : (
            <Link
              to="/login"
              className="header-nav-link"
              onClick={onClose}
            >
              Se connecter
            </Link>
          )}
        </li>

           {user?.role === "admin" && (
          <li>
            <Link
              to="/admin"
              className="header-nav-link"
              onClick={onClose}
            >
              Administration
            </Link>
          </li>
        )}

        <li className="header-menu-cart">
          <Link
            to="/cart"
            className="header-nav-link header-menu-cart-link"
            onClick={onClose}
          >
            <img
              src={cartIcon}
              alt=""
              className="header-menu-cart-icon"
            />

            <span>Mon panier</span>

            <span className="header-menu-cart-count">
              {cartCount} article{cartCount > 1 ? 's' : ''}
            </span>
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <HeaderLogoutButton onClose={onClose} />
          </li>
        )}
      </ul>
    </nav>
  );
}
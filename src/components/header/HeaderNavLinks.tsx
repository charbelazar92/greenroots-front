import { Link } from 'react-router';

// Facultative car ce composant est aussi utilisé dans le menu desktop.
interface HeaderNavLinksProps {
  onClose?: () => void;
}

export function HeaderNavLinks({ onClose }: HeaderNavLinksProps) {
  return (
    <>
      <li>
        <Link
          to="/#comment-ca-marche"
          className="header-nav-link"
          onClick={onClose}
        >
          Comment ça marche ?
        </Link>
      </li>

      <li>
        <Link
          to="/#nos-arbres"
          className="header-nav-link"
          onClick={onClose}
        >
          Nos arbres
        </Link>
      </li>

      <li>
        <Link
          to="/#notre-mission"
          className="header-nav-link"
          onClick={onClose}
        >
          Notre mission
        </Link>
      </li>
    </>
  );
}
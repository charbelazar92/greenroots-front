import { Link } from 'react-router';
import logo from '../../assets/images/greenroots-logo.png';

export function HeaderBrand() {
  return (
    <Link
      to="/"
      className="header-brand"
      aria-label="Greenroots - Retour à l'accueil "
    >
      <img src={logo} alt="logo" className="header-logo" />
      
      <div className="header-brand-text">
        <span className="header-brand-name">GreenRoots</span>
        <span className="header-brand-tagline">
          Le déclic pour la reforestation
        </span>
      </div>
    </Link>
  );
}
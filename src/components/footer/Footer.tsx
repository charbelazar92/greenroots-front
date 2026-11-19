import { Link } from 'react-router';
import logo from '../../assets/images/greenroots-logo-white.png';
import separatorTree from '../../assets/icons/footer-separator-tree.png';
import instagramIcon from '../../assets/icons/instagram-white.svg';
import linkedinIcon from '../../assets/icons/linkedin-white.svg';
import youtubeIcon from '../../assets/icons/youtube-white.svg';


import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/" className="footer__brand">
          <img src={logo} alt="" className="footer__logo" />

          <div className="footer__brand-text">
            <span className="footer__name">GreenRoots</span>
            <span className="footer__tagline">
              Le déclic pour la reforestation.
            </span>
          </div>
        </Link>

        <nav className="footer__links" aria-label="Informations légales">
          <Link to="/legal-notice">Mentions légales</Link>
          <img src={separatorTree} alt="" className="footer__separator" />

          <Link to="/privacy-policy">Politique de confidentialité</Link>
          <img src={separatorTree} alt="" className="footer__separator" />

          <Link to="/cgv">Conditions générales de ventes</Link>
          <img src={separatorTree} alt="" className="footer__separator" />

          <Link to="/contact">Contact</Link>
          <img src={separatorTree} alt="" className="footer__separator" />
        </nav>

        <div className="footer__socials" aria-label="Réseaux sociaux">
          <a href="https://www.instagram.com/" aria-label="Instagram">
            <img src={instagramIcon} alt="" />
          </a>

          <a href="https://www.linkedin.com/" aria-label="LinkedIn">
            <img src={linkedinIcon} alt="" />
          </a>

          <a href="https://www.youtube.com/" aria-label="YouTube">
            <img src={youtubeIcon} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
}
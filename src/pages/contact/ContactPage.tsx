import { Link } from "react-router";

import chevronLeft from "../../assets/icons/chevron-left.svg";
import emailIcon from "../../assets/icons/contact.png";
import phoneIcon from "../../assets/icons/phone.png";
import locationIcon from "../../assets/icons/location.png";

import "./ContactPage.css";

export function ContactPage() {
  return (
    <div className="contact-page">
      <Link className="contact-page__back-link" to="/">
        <img
          className="contact-page__back-icon"
          src={chevronLeft}
          alt=""
        />
        Retour à l’accueil
      </Link>

      {/* Présentation de la page */}
      <header className="contact-page__intro">
        <p className="contact-page__label">Contact</p>

        <h1 className="contact-page__title">
          Contactez-nous
        </h1>

        <p className="contact-page__subtitle">
          Une question ? Une envie ?
          <br />
          Nous sommes là pour vous.
        </p>
      </header>

      {/* Moyens de contact */}
      <div className="contact-page__methods">
        <section className="contact-page__method">
          <div className="contact-page__icon-container">
            <img
              className="contact-page__icon"
              src={emailIcon}
              alt=""
            />
          </div>

          <div className="contact-page__details">
            <h2 className="contact-page__method-title">
              Par e-mail
            </h2>

            <p className="contact-page__description">
              Une question sur notre démarche ou votre commande ?
              Écrivez-nous, notre équipe sera heureuse de vous répondre.
            </p>

            <a
              className="contact-page__contact-link"
              href="mailto:contact@greenroots.fr"
            >
              contact@greenroots.fr
            </a>
          </div>
        </section>

        <section className="contact-page__method contact-page__method--separated">
          <div className="contact-page__icon-container">
            <img
              className="contact-page__icon"
              src={phoneIcon}
              alt=""
            />
          </div>

          <div className="contact-page__details">
            <h2 className="contact-page__method-title">
              Par téléphone
            </h2>

            <p className="contact-page__description">
              Vous préférez échanger directement avec nous ?
              Contactez notre équipe pour discuter de votre projet.
            </p>

            <a
              className="contact-page__contact-link"
              href="tel:+33123456789"
            >
              01 23 45 67 89
            </a>

            <p className="contact-page__hours">
              Du lundi au vendredi, de 9h à 18h.
            </p>
          </div>
        </section>

        <section className="contact-page__method contact-page__method--separated">
          <div className="contact-page__icon-container">
            <img
              className="contact-page__icon"
              src={locationIcon}
              alt=""
            />
          </div>

          <div className="contact-page__details">
            <h2 className="contact-page__method-title">
              Par courrier
            </h2>

            <p className="contact-page__description">
              Pour toute correspondance ou proposition de partenariat,
              vous pouvez nous écrire à l’adresse suivante.
            </p>

            <address className="contact-page__address">
              GreenRoots
              <br />
              123 rue de la Forêt
              <br />
              75000 Paris
            </address>
          </div>
        </section>
      </div>
    </div>
  );
}
import { Link } from 'react-router';
import './HomeHero.css';

export function HomeHero() {
  return (
    <section className="home-hero">
      <h1 className="home-hero-title">
        Le déclic pour la reforestation
      </h1>
      <p className="home-hero-description">
        Choisissez votre arbre. Nous faisons le reste.
      </p>
      <Link to="/#comment-ca-marche" className="home-hero-button">
        Comment ça marche ?
      </Link>
    </section>
  );
}
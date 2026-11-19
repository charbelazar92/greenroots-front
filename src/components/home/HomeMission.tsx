import './HomeMission.css';
import missionImage from '../../assets/images/mission.jpg';

export function HomeMission() {
  return (
    <section
      id="notre-mission"
      className="home-mission"
      aria-labelledby="home-mission-title"
    >
      <div className="home-mission__container">
        <h2 id="home-mission-title" className="home-mission__heading">
          Notre mission
        </h2>

        <img
          className="home-mission__image"
          src={missionImage}
          alt="Paysage de montagnes couvertes de forêts"
          loading="lazy"
        />

        <p className="home-mission__description">
          Rendre la reforestation accessible à tous et permettre à chacun
          d’agir concrètement pour la planète. Chez GreenRoots, nous croyons
          que chaque arbre planté est un pas vers des forêts plus vivantes,
          une biodiversité préservée et un avenir plus durable. Notre mission
          est de réunir celles et ceux qui souhaitent contribuer à la
          restauration des écosystèmes et faire grandir un engagement
          collectif. Ensemble, redonnons à la nature la place qu’elle mérite
          et construisons, un arbre à la fois, un héritage pour les
          générations futures.
        </p>
      </div>
    </section>
  );
}
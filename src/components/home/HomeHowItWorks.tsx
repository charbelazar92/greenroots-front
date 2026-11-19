import './HomeHowItWorks.css';

import chooseTreeIcon from '../../assets/icons/choose-tree.png';
import orderTreeIcon from '../../assets/icons/order-tree.png';
import plantTreeIcon from '../../assets/icons/plant-tree.png';

const steps = [
  {
    number: 1,
    title: 'Choisissez votre arbre',
    description: 'Découvrez les arbres et choisissez celui que vous souhaitez soutenir.',
    icon: chooseTreeIcon,
  },
  {
    number: 2,
    title: 'Passez commande',
    description: 'Validez votre contribution en quelques clics, de façon sécurisée.',
    icon: orderTreeIcon,
  },
  {
    number: 3,
    title: 'Plantez et faites la différence',
    description: 'Votre soutien participe à la plantation et à la préservation des forêts.',
    icon: plantTreeIcon,
  },
];

export function HomeHowItWorks() {
  return (
    <section id="comment-ca-marche" className="how-it-works" aria-labelledby="how-it-works-title">
      <div className="how-it-works__container">
        <header className="how-it-works__header">
          <h2 id="how-it-works-title" className="how-it-works__heading">
            Comment ça marche ?
          </h2>

          <p className="how-it-works__introduction">
           Choisissez votre arbre, validez votre contribution et participez à la reforestation.
          </p>
        </header>

        <ol className="how-it-works__steps">
          {steps.map((step) => (
            <li className="how-it-works__step" key={step.number}>
              <div className="how-it-works__visual">
                <img
                  className="how-it-works__icon"
                  src={step.icon}
                  alt=""
                  aria-hidden="true"
                />

                <span className="how-it-works__number">
                  {step.number}
                </span>
              </div>

              <h3 className="how-it-works__title">{step.title}</h3>

              <p className="how-it-works__description">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
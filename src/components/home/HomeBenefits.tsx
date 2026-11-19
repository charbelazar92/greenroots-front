import './HomeBenefits.css';

import leafIcon from '../../assets/icons/leaf.svg';
import communityIcon from '../../assets/icons/community.svg';
import qualityIcon from '../../assets/icons/quality.svg';

const benefits = [
  {
    title: 'Des arbres durables',
    description: '100 % d’essences adaptées aux écosystèmes locaux.',
    icon: leafIcon,
  },
  {
    title: 'Un impact réel',
    description: '1 contribution = 1 arbre planté pour soutenir la reforestation.',
    icon: communityIcon,
  },
  {
    title: 'Une démarche transparente',
    description: 'Un suivi clair de chaque contribution et de son impact.',
    icon: qualityIcon,
  },
];

export function HomeBenefits() {
  return (
    <section className="home-benefits" aria-label="Nos engagements">
      <div className="home-benefits__list">
        {benefits.map((benefit) => (
          <article className="home-benefits__item" key={benefit.title}>
            <div className="home-benefits__icon-wrapper">
              <img
                className="home-benefits__icon"
                src={benefit.icon}
                alt=""
                aria-hidden="true"
              />
            </div>

            <div className="home-benefits__content">
              <h2 className="home-benefits__title">{benefit.title}</h2>
              <p className="home-benefits__description">
                {benefit.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
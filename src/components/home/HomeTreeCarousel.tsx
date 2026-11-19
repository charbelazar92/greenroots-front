import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { useTrees } from '../../context/TreesContext'; 
import { TreeCard } from '../trees/TreeCard';

import chevronLeft from '../../assets/icons/chevron-left.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';

import './HomeTreeCarousel.css';

export function HomeTreeCarousel() {
  const { trees, isLoading } = useTrees();
  const [page, setPage] = useState(0);

  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia('(max-width: 599px)').matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 599px)');

    function handleChange(event: MediaQueryListEvent) {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const featuredTrees = trees
    .filter((tree) => tree.available)
    .slice(0, isMobile ? 4 : 8);

  const treesPerPage = isMobile ? 1 : 2;

  const pageCount = Math.ceil(featuredTrees.length / treesPerPage);
  const currentPage = Math.min(page, Math.max(0, pageCount - 1));

  const visibleTrees = featuredTrees.slice(
    currentPage * treesPerPage,
    currentPage * treesPerPage + treesPerPage,
  );

  return (
    <section
      className="home-tree-carousel"
      aria-labelledby="home-tree-carousel-title"
      id="nos-arbres"
    >
      <div className="home-tree-carousel__container">
        <header className="home-tree-carousel__header">
          <h2
            id="home-tree-carousel-title"
            className="home-tree-carousel__heading"
          >
            Nos arbres à planter
          </h2>

          <p className="home-tree-carousel__introduction">
            Découvrez les arbres disponibles et choisissez votre contribution.
          </p>
        </header>

        {isLoading ? (
          <p role="status">Chargement des arbres...</p>
        ) : featuredTrees.length === 0 ? (
          <p>Aucun arbre disponible pour le moment.</p>
        ) : (
          <div className="home-tree-carousel__navigation">
            <button
              type="button"
              className="home-tree-carousel__arrow"
              aria-label={
                currentPage === 0
                  ? 'Afficher les derniers arbres'
                  : 'Afficher les arbres précédents'
              }
              aria-controls="home-tree-carousel-track"
              disabled={pageCount <= 1}
              onClick={() =>
                setPage((currentPage - 1 + pageCount) % pageCount)
              }
            >
              <img src={chevronLeft} alt="" />
            </button>

            <div
              id="home-tree-carousel-track"
              className="home-tree-carousel__track"
            >
              {visibleTrees.map((tree) => (
                <TreeCard key={tree.id} tree={tree} />
              ))}
            </div>

            <button
              type="button"
              className="home-tree-carousel__arrow"
              aria-label={
                currentPage === pageCount - 1
                  ? 'Revenir aux premiers arbres'
                  : 'Afficher les arbres suivants'
              }
              aria-controls="home-tree-carousel-track"
              disabled={pageCount <= 1}
              onClick={() => setPage((currentPage + 1) % pageCount)}
            >
              <img src={chevronRight} alt="" />
            </button>
          </div>
        )}

        {!isLoading && pageCount > 1 && (
          <div
            className="home-tree-carousel__pagination"
            role="group"
            aria-label="Pages du carrousel"
          >
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                className="home-tree-carousel__dot"
                aria-label={`Afficher la page ${index + 1}`}
                aria-controls="home-tree-carousel-track"
                aria-current={index === currentPage ? 'true' : undefined}
                onClick={() => setPage(index)}
              />
            ))}
          </div>
        )}

        {!isLoading && pageCount > 0 && (
          <p
            className="home-tree-carousel__status"
            role="status"
            aria-atomic="true"
          >
            Page {currentPage + 1} sur {pageCount}
          </p>
        )}

        <Link className="home-tree-carousel__link" to="/catalog">
          Voir tous les arbres
        </Link>
      </div>
    </section>
  );
}
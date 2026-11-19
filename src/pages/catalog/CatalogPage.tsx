import { useState } from "react";
import "./CatalogPage.css";
import { useTrees } from "../../context/TreesContext";
import { TreeCard } from "../../components/trees/TreeCard";
import { SearchBar } from "../../components/catalog/SearchBar";
import { SortSelect } from "../../components/catalog/SortSelect";


function removeAccents(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function CataloguePage() {
  const { trees, isLoading } = useTrees();

  const [searchTree, setSearchTree] = useState("");
  const [sortOption, setSortOption] = useState("relevance");
  const [visibleCart, setVisibleTrees] = useState(6);


  // Récupère l'entrée de l'utilisateur puis ignore les majuscule et les accents
  const searchNormalized = removeAccents(searchTree.toLowerCase());
  // Filtre les arbres dont le nom ou espèce correspond à la recherche
  const filteredTrees = trees.filter((tree) => {
    if (!tree.available) return false;
  // Normalise la recherche (retire accents et met tout en miniscule
  const nameNormalized = removeAccents(tree.name.toLowerCase());
  const speciesNormalized = removeAccents(tree.species.toLowerCase());

  // Sélectionne l'arbre dont le nom ou l'espèce correpond à la recherche
    return (
      nameNormalized.includes(searchNormalized) ||
      speciesNormalized.includes(searchNormalized)
    );
  });

  // Crée une copie du tableau afin de ne pas le modifier directement
  const sortedTrees = [...filteredTrees];

  // Si l'utilisateur selectionne tri par prix ascendant
  if (sortOption === "price-asc") {
    // Les arbres sont triés du moins cher au plus cher et Number tranforme le prix en prix en nombre
    sortedTrees.sort((treeA, treeB) => Number(treeA.price) - Number(treeB.price));
  }
  // Si l'utilisateur selectionne tri par prix descendant
  if (sortOption === "price-desc") {
   // Les arbres sont triés du plus cher au moins cher et Number tranforme le prix en prix en nombre
    sortedTrees.sort((treeA, treeB) => Number(treeB.price) - Number(treeA.price));
  }

  // / Si l'utilisateur selectionne tri par npm de A à Z
  if (sortOption === "name-asc") {
  // Les arbres sont triés par ordre alphabétique
    sortedTrees.sort((treeA, treeB) => treeA.name.localeCompare(treeB.name));
  }

  // Si l'utilisateur selectionne tri par npm de Z à A
  if (sortOption === "name-desc") {
  // Les arbres sont triés dans l'ordre alphabétique inverse
    sortedTrees.sort((treeA, treeB) => treeB.name.localeCompare(treeA.name));
  }




const visibleTrees = sortedTrees.slice(0, visibleCart);

const showMoreTrees = visibleCart < sortedTrees.length;
const showLessTrees = visibleCart > 6;

  function handleSearchChange(value: string) {
    setSearchTree(value);
    setVisibleTrees(6);
  }

  if (isLoading) {
    return <div>Chargement des arbres...</div>;
  }

  return (
    <div className="catalogue">
      <h1 className="page-title">Nos arbres à planter</h1>
      <p className="page-subtitle">Découvrez les arbres disponibles et choisissez votre contribution.</p>

     <div className="filters">
  <SearchBar searchTerm={searchTree} onSearchChange={handleSearchChange} />
  <SortSelect sortOption={sortOption} onSortChange={setSortOption} />
</div>

      <p className="tree-count">{sortedTrees.length} arbres disponibles</p>

      <div className="grid">
        {visibleTrees.map((tree) => (
          <TreeCard key={tree.id} tree={tree} />
        ))}
      </div>

      {showMoreTrees && (
        <button className="show-more" type="button" onClick={() => setVisibleTrees(visibleCart + 6)}>
          Voir plus
        </button>
      )}

      {showLessTrees && (
        <button className="show-more" type="button" onClick={() => setVisibleTrees(visibleCart - 6)}>
          Voir moins
        </button>
      )}

      
    </div>
  );
}
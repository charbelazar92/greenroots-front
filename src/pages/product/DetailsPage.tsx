import "./DetailsPage.css";
import { Link, useParams } from "react-router";
import { ErrorPage } from "../error/ErrorPage";
import { useTrees } from "../../context/TreesContext";
import { useEffect, useState } from "react";
import { useCart } from '../../hooks/useCart';
import type ITree from "../../@types/trees";
import cartIcon from "../../assets/icons/cart.svg";

export function DetailsPage() {
  const { addItem } = useCart();
  const { getTreeBySlug } = useTrees();
  const params = useParams();
  const slug = params.slug as string;

  const [tree, setTree] = useState<ITree | null | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const data = await getTreeBySlug(slug);
      if (!cancelled) setTree(data ?? null);
    })();

    return () => {
      cancelled = true;
    };
  }, [slug, getTreeBySlug]);

  if (tree === undefined) return <div>Chargement...</div>;
  if (tree === null) return <ErrorPage />;

  const handleAddToCart = () => {
    addItem(tree, quantity);
    setAddedToCart(true);
  };



  const decreaseQuantity = () => {
    setQuantity((quantity) => Math.max(1, quantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  return (

    <section className="details-page">
      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to="/catalog">Catalogue</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{tree.name}</span>
      </nav>

      <div className="product-layout">
        <div className="card-details_image">
          <img src={tree.url_image} alt={tree.name} />
        </div>

        <div className="card-details_info">
          <div className="card-details">
            <div>
              <h1 className="card-details_name">{tree.name}</h1>
              <p className="card-details_species">{tree.species}</p>
              <p className={`availability ${tree.available ? "available" : "unavailable"}`}>  {tree.available ? "Disponible" : "Rupture de stock"}</p>
            </div>



            <div className="card-price">
              <p className="card-details_price">{Number(tree.price).toFixed(2)} €</p>
              <p className="card-details_price_label">Prix unitaire TTC</p>
            </div>
          </div>

          <div className="card-details_description">
            <h2>Description</h2>
            <p>{tree.description}</p>
          </div>

          <div className="card-quantity">
            <p className="card-details_quantity">Quantité</p>

            <div className="quantity-details_selector">
              <button className="bouton-details_selector_1" type="button" onClick={decreaseQuantity} aria-label="Diminuer la quantité">
                -
              </button>
              <span>{quantity}</span>
              <button className="bouton-details_selector_2" type="button" onClick={increaseQuantity} aria-label="Augmenter la quantité">
                +
              </button>
            </div>
          </div>

          <button type="button" className="cart-details_button_product" onClick={handleAddToCart} disabled={!tree.available}>
            <img className="cart-details_icon" src={cartIcon} alt="cart-icon" />
            <span>Ajouter au panier</span>
          </button>

          {addedToCart && (
            <div className="added-to-cart_details">
              <img src={cartIcon} alt="" />
              <span>Produit ajouté au panier</span>
            </div>
          )}

        </div>
      </div>

      <div className="steps-description">
        <h2>De la commande à la plantation</h2>
        <ol className="steps-list">
          <li>
            <span className="step-number">1</span>
            Sélection de l'arbre
          </li>
          <li>
            <span className="step-number">2</span>
            Validation de la commande
          </li>
          <li>
            <span className="step-number">3</span>
            Prise en charge par GreenRoots
          </li>
          <li>
            <span className="step-number">4</span>
            Historique de la contribution
          </li>
        </ol>
      </div>
    </section>
  );
}
import "./TreeCard.css";
import type ITree from "../../@types/trees";
import { useCart } from '../../hooks/useCart';
import cartIcon from '../../assets/icons/cart.svg';
import { Link } from "react-router";

interface TreeCardProps {
  tree: ITree;
}

export function TreeCard({ tree }: TreeCardProps) {
  const { addItem } = useCart();
  return (
    <section className="card">
      <div className="card-image">
        <img src={tree.url_image} alt={tree.name} />
      </div>
      <div className="card-info">
        <h3 className="name">{tree.name}</h3>
        <p className="species">{tree.species}</p>
        <p className="description">{tree.description}</p>
      </div>


      <div className="card-footer">
        <p className="price">{Number(tree.price).toFixed(2)} €</p>
        <button 
          type="button" 
          className="cart-button" 
          aria-label={`Ajouter ${tree.name} au panier`}
          onClick={() => addItem(tree)}
          disabled={!tree.available}
          >
          <span className="cart-button-label">Ajouter au panier</span>
          <img className="cart-icon" src={cartIcon} alt="icon-cart" />
        </button>
      </div>

      <Link type="button" className="product-link-button" to={`/catalog/${tree.slug}`}>
        Découvrir cette arbre
      </Link>

     
    </section>
  );
}
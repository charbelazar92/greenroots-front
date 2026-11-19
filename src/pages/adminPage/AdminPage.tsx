import "./AdminPage.css";
import { Link } from "react-router";
import treeIcon from "../../assets/icons/choose-tree.png";
import orderIcon from "../../assets/icons/orders.svg"
import { useAuth } from "../../hooks/useAuth";

export function AdminPage() {

  const { user } = useAuth();

  return (

    <main className="admin-page">
      <nav className="admin-page_breadcrumb" aria-label="Fil d'Ariane">
        <Link className="admin-page_breadcrumb-link" to="/">Administration</Link>
      </nav>
      <div>
        <h1 className="admin-page_title" >Administration</h1>
        <h2 className="admin-page_subtitle" >Bienvenue <span className="admin-page_user-name">{user?.firstname} {user?.lastname}</span> </h2>
        <p className="admin-page_description">Sélectionnez l'espace que vous souhaitez gérer.</p>
      </div>

      <section className="admin-manage">
        <div className="admin-space_manage">
          <img className="admin-page_icon" src={treeIcon} alt="cart-icon" />
          <div className="admin-manage_content ">
            <h2 className="admin-manage_title">Gestion du catalogue</h2>
            <p className="admin-manage_description ">Créer, consulter, modifier ou supprimer les arbres proposés sur le site.</p>
            <Link type="button" className="admin-manage_button" to={`/admin/trees`}>
              Accéder au catalogue
            </Link>
          </div>
        </div>
      </section>

      <section className="admin-manage">
        <div className="admin-space_manage">
          <img className="admin-page_icon" src={orderIcon} alt="order-icon" />
          <div className="admin-manage_content ">
            <h2 className="admin-manage_title">Gestion des commandes</h2>
            <p className="admin-manage_description ">Consulter, confirmer ou annuler les commandes</p>
            <Link type="button" className="admin-manage_button" to={`/admin/orders`}>
              Accéder aux commandes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

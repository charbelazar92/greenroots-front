import "./AccountPage.css";

import { Link, Navigate, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";



import chevronLeft from "../../assets/icons/chevron-left.svg";
import accountIcon from "../../assets/icons/user-account.svg";
import ordersIcon from "../../assets/icons/orders.svg";
import logoutIcon from "../../assets/icons/deconnexion.png";


export function AccountPage() {
    const { user, isAuthLoading, logout } = useAuth();

    const navigate = useNavigate();
    const [logoutError, setLogoutError] = useState("");

// Redirige vers l’accueil uniquement si la déconnexion réussit.
// En cas d’échec, affiche une erreur sur la page.
    async function handleLogout() {
        setLogoutError("");

        try {
            await logout();
            navigate("/");
        } catch {
            setLogoutError(
                "La déconnexion a échoué. Veuillez réessayer.",
            );
        }
    }
// Attend la restauration de session pour éviter de rediriger
// un utilisateur connecté lors du rechargement de la page.
    if (isAuthLoading) {
        return <p>Chargement de votre compte…</p>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="account-page">
            <Link className="account-page__back-link" to="/">
                <img
                    className="account-page__back-icon"
                    src={chevronLeft}
                    alt=""
                />
                Retour à l’accueil
            </Link>

            <h1 className="account-page__title">
                Bonjour {user.firstname}
            </h1>

            <p className="account-page__subtitle">
                Gérez vos informations et consultez vos commandes.
            </p>
            <div className="account-page__cards">
                <section className="account-page__card">
                    <div className="account-page__card-header">
                        <img
                            className="account-page__card-icon"
                            src={accountIcon}
                            alt=""
                        />

                        <div>
                            <h2 className="account-page__card-title">
                                Mes informations
                            </h2>

                            <p className="account-page__card-description">
                                Modifier mes informations personnelles.
                            </p>
                        </div>
                    </div>

                    <Link
                        className="account-page__card-link"
                        to="/me/profil"
                    >
                        Accéder à mon profil
                    </Link>

                </section>
                <section className="account-page__card">
                    <div className="account-page__card-header">
                        <img
                            className="account-page__card-icon"
                            src={ordersIcon}
                            alt=""
                        />
                        <div>
                            <h2 className="account-page__card-title">
                                Mes commandes
                            </h2>

                            <p className="account-page__card-description">
                                Consulter l’historique de mes contributions.
                            </p>
                        </div>
                    </div>

                    <Link
                        className="account-page__card-link"
                        to="/me/orders"
                    >
                        Voir mes commandes
                    </Link>
                </section>
            </div>
            <div className="account-page__logout">
                <button
                    type="button"
                    className="account-page__logout-button"
                    onClick={handleLogout}
                >
                    <img
                        className="account-page__logout-icon"
                        src={logoutIcon}
                        alt=""
                    />
                    Se déconnecter
                </button>

                {logoutError && (
                    <p className="account-page__logout-error" role="alert">
                        {logoutError}
                    </p>
                )}
            </div>
        </div>
    );
}
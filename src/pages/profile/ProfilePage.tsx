import { Link, Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import chevronLeft from "../../assets/icons/chevron-left.svg";
import { useState } from "react";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

import { DeleteAccount } from "../../components/deleteAccount/DeleteAccount";

import "./ProfilePage.css";

export function ProfilePage() {
    const { user, setUser, isAuthLoading } = useAuth();

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    

    async function handleSubmit(formData: FormData) {
        setErrorMessage("");
        setSuccessMessage("");

        if (!user) {
            return;
        }

        const firstname = (formData.get("firstname") as string).trim();
        const lastname = (formData.get("lastname") as string).trim();
        const email = (formData.get("email") as string).trim();

        const userProfileData: {
            firstname?: string;
            lastname?: string;
            email?: string;
        } = {};

        if (firstname !== user.firstname) {
            userProfileData.firstname = firstname;
        }

        if (lastname !== user.lastname) {
            userProfileData.lastname = lastname;
        }

        if (email !== user.email) {
            userProfileData.email = email;
        }

        if (Object.keys(userProfileData).length === 0) {
            setSuccessMessage("Aucune modification à enregistrer.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetchWithAuth(
                `${import.meta.env.VITE_API_URL}/api/users/me/profile`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userProfileData),
                },
            );

            if (response.status === 401) {
                setUser(null);
                return;
            }
            const responseData = await response.json();

            if (!response.ok) {
                setErrorMessage(
                    responseData.error ||
                    "La modification de vos informations a échoué.",
                );
                return;
            }

            setUser(responseData);
            setSuccessMessage("Vos informations ont bien été mises à jour.");
        } catch {
            setErrorMessage(
                "Impossible de terminer la modification. Veuillez réessayer.",
            );
        } finally {
            setIsSubmitting(false);
        }
    }


    if (isAuthLoading) {
        return <p>Chargement de vos informations…</p>;
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ redirectTo: "/me/profil" }}
                replace
            />
        );
    }
    return (
        <div className="profile-page">
            <div className="profile-page__content">
                <Link className="profile-page__back-link" to="/me">
                    <img
                        className="profile-page__back-icon"
                        src={chevronLeft}
                        alt=""
                    />
                    Retour à mon compte
                </Link>

                <h1 className="profile-page__title">
                    Mes informations
                </h1>

                <p className="profile-page__subtitle">
                    Consultez et modifiez vos informations personnelles.
                </p>

                <form className="profile-page__form" action={handleSubmit}>
                    <h2 className="profile-page__form-title">
                        Informations personnelles
                    </h2>

                    <div className="profile-page__full-name">
                        <div className="profile-page__form-group">
                            <label htmlFor="firstname">Prénom</label>

                            <input
                                id="firstname"
                                name="firstname"
                                type="text"
                                defaultValue={user.firstname}
                                autoComplete="given-name"
                                required
                            />
                        </div>

                        <div className="profile-page__form-group">
                            <label htmlFor="lastname">Nom</label>

                            <input
                                id="lastname"
                                name="lastname"
                                type="text"
                                defaultValue={user.lastname}
                                autoComplete="family-name"
                                required
                            />
                        </div>
                    </div>

                    <div className="profile-page__form-group">
                        <label htmlFor="email">Adresse e-mail</label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={user.email}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <p className="profile-page__required-note">
                        Tous les champs sont obligatoires.
                    </p>

                    {errorMessage && (
                        <p className="profile-page__error-message" role="alert">
                            {errorMessage}
                        </p>
                    )}

                    {successMessage && (
                        <p className="profile-page__success-message" role="status">
                            {successMessage}
                        </p>
                    )}

                    <div className="profile-page__actions">
                        <button
                            type="submit"
                            className="profile-page__submit-button"
                            disabled={isSubmitting}
                        >
                            Enregistrer les modifications
                        </button>

                        <Link
                            className="profile-page__cancel-link"
                            to="/me"
                        >
                            Annuler
                        </Link>
                    </div>
                </form>

               <DeleteAccount />
               
            </div>
        </div>
    );
}
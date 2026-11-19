import { useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../../hooks/useAuth";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

import "./DeleteAccount.css";

export function DeleteAccount() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteAccount(formData: FormData) {
    setDeleteErrorMessage("");
    setIsDeleting(true);

    const password = formData.get("password") as string;

    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/api/users/me`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        },
      );

      if (response.status === 401) {
        setUser(null);
        return;
      }

      const responseData = await response.json();

      if (!response.ok) {
        setDeleteErrorMessage(
          responseData.error || "La suppression du compte a échoué.",
        );
        return;
      }

      navigate("/", { replace: true });
      setUser(null);
    } catch {
      setDeleteErrorMessage(
        "Impossible de terminer la suppression. Veuillez réessayer.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section className="delete-account">
      <h2>Supprimer mon compte</h2>

      <p className="delete-account__description">
        La suppression de votre compte est définitive. Vous perdrez
        l’accès à votre espace personnel et à votre historique de commandes.
        Les commandes seront conservées sans être rattachées à votre compte.
      </p>

      {!isDeleteConfirmationVisible && (
        <button
          className="delete-account__open-button"
          type="button"
          onClick={() => setIsDeleteConfirmationVisible(true)}
        >
          Supprimer mon compte
        </button>
      )}

      {isDeleteConfirmationVisible && (
        <form
          className="delete-account__confirmation"
          action={handleDeleteAccount}
        >
          <div className="delete-account__form-group">
            <label htmlFor="deletePassword">Mot de passe actuel</label>

            <input
              id="deletePassword"
              name="password"
              type="password"
              placeholder="Votre mot de passe actuel"
              required
            />
          </div>

          {deleteErrorMessage && (
            <p className="delete-account__error-message" role="alert">
              {deleteErrorMessage}
            </p>
          )}

          <div className="delete-account__actions">
            <button
              type="submit"
              className="delete-account__submit-button"
              disabled={isDeleting}
            >
              Confirmer la suppression
            </button>

            <button
              type="button"
              className="delete-account__cancel-button"
              disabled={isDeleting}
              onClick={() => setIsDeleteConfirmationVisible(false)}
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
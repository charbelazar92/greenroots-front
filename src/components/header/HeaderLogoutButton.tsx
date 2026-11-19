import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

interface HeaderLogoutButtonProps {
  onClose: () => void;
}

export function HeaderLogoutButton({
  onClose,
}: HeaderLogoutButtonProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState("");

  async function handleLogout() {
    setLogoutError("");

    try {
      await logout();
      onClose();
      navigate("/");
    } catch {
      setLogoutError(
        "La déconnexion a échoué. Veuillez réessayer.",
      );
    }
  }

  return (
    <>
      <button
        type="button"
        className="header__logout-button"
        onClick={handleLogout}
      >
        Se déconnecter
      </button>

      {logoutError && (
        <p className="header__logout-error" role="alert">
          {logoutError}
        </p>
      )}
    </>
  );
}
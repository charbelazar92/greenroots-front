import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useState, } from "react";

import { useAuth } from "../../hooks/useAuth.ts";

import "./LoginPage.css";

import eyeIcon from "../../assets/icons/eye.svg";
import chevronLeft from "../../assets/icons/chevron-left.svg";

export function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, isLoggedIn, isAuthLoading, } = useAuth();

  //On recupère la destination 
  const redirectTo = location.state?.redirectTo ?? '/';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  // Après une inscription, affiche la confirmation et préremplit l’adresse e-mail sur la page de connexion
  const successMessage = location.state?.successMessage;
  const registeredEmail = location.state?.registeredEmail;


  // la connexion est géré par le contexte, puis redirige en cas de succès. Si échec, affiche message d’erreur dans le formulaire.
  async function handleSubmit(formData: FormData) {
    setErrorMessage("");

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "La connexion a échoué. Veuillez réessayer.",
      );
    }
  }

  if (isAuthLoading) {
    return null;
  }

  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }
  return (
    <div className="login-page">
      <Link className="login-page__back-link" to="/">
        <img
          className="login-page__back-icon"
          src={chevronLeft}
          alt=""
        />
        Retour à l’accueil
      </Link>

      <section className="login-page__content">
        <h1 className="login-page__title">Se connecter</h1>

        <p className="login-page__subtitle">
          Accédez à votre compte et continuez votre engagement avec GreenRoots.
        </p>

        {successMessage && (
          <p className="login-page__success-message">
            {successMessage}
          </p>
        )}

        <form className="login-page__form" action={handleSubmit}>
          <div className="login-page__form-group">
            <label htmlFor="email">Adresse e-mail</label>

            <input
              id="email"
              name="email"
              type="email"
              defaultValue={registeredEmail ?? ""}
              placeholder="nom@exemple.fr"
              required
            />
          </div>

          <div className="login-page__form-group">
            <label htmlFor="password">Mot de passe</label>

            <div className="login-page__password-container">
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Votre mot de passe"
                required
              />

              <button
                type="button"
                className="login-page__password-button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <img src={eyeIcon} alt="Afficher le mot de passe" />
              </button>
            </div>

          </div>

          {errorMessage && (
            <p
              className="login-page__error-message"
              role="alert"
            >
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            className="login-page__submit-button"
          >
            Se connecter
          </button>
        </form>


        <p className="login-page__register">
          Pas encore de compte ?{" "}
          <Link className="login-page__link" to="/register" state={{ redirectTo }}>
            S’inscrire
          </Link>
        </p>
      </section>
    </div>
  );
}
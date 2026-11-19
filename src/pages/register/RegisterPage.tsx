import { Link, useLocation, useNavigate, Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import chevronLeft from "../../assets/icons/chevron-left.svg";
import eyeIcon from "../../assets/icons/eye.svg";
import "./RegisterPage.css";

import { useState } from "react";

export function RegisterPage() {

  const navigate = useNavigate();

  const { isLoggedIn, isAuthLoading } = useAuth();

  const location = useLocation();

  // Conserve la destination prévue après la connexion.
  const redirectTo = location.state?.redirectTo ?? '/';

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Vérifie les critères pendant la saisie pour guider l’utilisateur

  const isMinimumLengthValid = password.length >= 8;
  const isUppercaseValid = /[A-Z]/.test(password);
  const isNumberValid = /[0-9]/.test(password);

  const isPasswordMatching = password === confirmPassword;


  // Condition d’activation du bouton : critères du mot de passe,
  // confirmation identique et politique de confidentialité acceptée.

  const isPasswordValid =
    isMinimumLengthValid &&
    isUppercaseValid &&
    isNumberValid &&
    isPasswordMatching &&
    isPrivacyAccepted;

  async function handleSubmit(formData: FormData) {
    // Efface l’erreur précédente et désactive le bouton pendant la requête.

    setErrorMessage("");
    setIsSubmitting(true);

    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const userRegistrationData = {
      firstname,
      lastname,
      email,
      password,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userRegistrationData),
        },
      );

      const responseData = await response.json();

      if (!response.ok) {
        setErrorMessage(responseData.error);
        return;
      }

      // Après l’inscription, transmet à la page de connexion :la confirmation, l’e-mail et la destination à reprendre.
      navigate("/login", {
        state: {
          successMessage:
            "Votre compte a bien été créé. Vous pouvez maintenant vous connecter.",
          registeredEmail: email,
          redirectTo,
        },
      });
    } catch {
      setErrorMessage(
        "Impossible de contacter le serveur. Veuillez réessayer.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  if (isAuthLoading) {
    return null;
  }

  if (isLoggedIn) {
    return <Navigate to="/me" replace />;
  }
  return (
    <div className="register-page">
      <Link className="register-page__back-link" to="/">
        <img className="register-page__back-icon" src={chevronLeft} alt="" />
        Retour à l'accueil
      </Link>

      <section className="register-page__content">
        <h1 className="register-page__title">Créer un compte</h1>

        <p className="register-page__subtitle">
          Rejoignez la communauté GreenRoots et faites partie du changement.
        </p>

        <form className="register-page__form" action={handleSubmit}>
          <div className="register-page__full-name">
            <div className="register-page__form-group">
              <label htmlFor="firstname">Prénom</label>

              <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder="Votre prénom"
                required
              />
            </div>

            <div className="register-page__form-group">
              <label htmlFor="lastname">Nom</label>

              <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Votre nom"
                required
              />
            </div>
          </div>
          <div className="register-page__form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="nom@exemple.com"
              required
            />
          </div>
          <div className="register-page__form-group">
            <label htmlFor="password">Mot de passe</label>

            <div className="register-page__password-container">
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Votre mot de passe"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                type="button"
                className="register-page__password-button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                aria-label={
                  isPasswordVisible
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
                aria-pressed={isPasswordVisible}
              >
                <img src={eyeIcon} alt="" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="register-page__form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>

            <div className="register-page__password-container">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
              <button
                type="button"
                className="register-page__password-button"
                onClick={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
                aria-label={
                  isConfirmPasswordVisible
                    ? "Masquer la confirmation du mot de passe"
                    : "Afficher la confirmation du mot de passe"
                }
                aria-pressed={isConfirmPasswordVisible}
              >
                <img src={eyeIcon} alt="" aria-hidden="true" />
              </button>
            </div>
            {confirmPassword.length > 0 && (
              <p
                className={
                  isPasswordMatching
                    ? "password-identical"
                    : "password-not-identical"
                }
              >
                {isPasswordMatching
                  ? "Les mots de passe correspondent"
                  : "Les mots de passe ne correspondent pas"}
              </p>
            )}
          </div>

          <div className="register-page__password-rules">
            <p>Le mot de passe doit contenir :</p>

            <ul>
              <li
                className={
                  isMinimumLengthValid
                    ? "password-rule-valid"
                    : "password-rule-invalid"
                }
              >
                Au moins 8 caractères
              </li>

              <li
                className={
                  isUppercaseValid
                    ? "password-rule-valid"
                    : "password-rule-invalid"
                }
              >
                {" "}
                Au moins une majuscule
              </li>

              <li
                className={
                  isNumberValid ? "password-rule-valid" : "password-rule-invalid"
                }
              >
                {" "}
                Au moins un chiffre{" "}
              </li>
            </ul>
          </div>

          <div className="register-page__privacy">
            <input
              id="privacy"
              name="privacy"
              type="checkbox"
              checked={isPrivacyAccepted}
              onChange={(event) => setIsPrivacyAccepted(event.target.checked)}
              required
            />
            <label htmlFor="privacy">
              J'accepte la{" "}
              <Link className="register-page__privacy-link" to="/privacy">
                politique de confidentialité
              </Link>{" "}
            </label>
          </div>

          {errorMessage && (
          <p
            className="register-page__error-message"
            role="alert"
          >
            {errorMessage}
          </p>
        )}

          <button
            type="submit"
            className="register-page__submit-button"
            disabled={!isPasswordValid || isSubmitting}
          >
            Créer mon compte
          </button>
        </form>

        <p className="register-page__login">
          {" "}
          Déjà inscrit ?{" "}
          <Link className="register-page__link" to="/login" state={{ redirectTo }}>
            Se connecter
          </Link>
        </p>

      </section>
    </div>
  );
}

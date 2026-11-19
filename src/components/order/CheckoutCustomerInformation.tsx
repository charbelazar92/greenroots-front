import type { AuthUser } from '../../@types/auth';

interface CheckoutCustomerInformationProps {
  user: Pick<
    AuthUser,
    'firstname' | 'lastname' | 'email'
  >;
}

// Affiche les informations personnelles du client.
export function CheckoutCustomerInformation({
  user,
}: CheckoutCustomerInformationProps) {
  return (
    <section
      className="checkout-section"
      aria-labelledby="checkout-information-title"
    >
      <div className="checkout-section-heading">
        <span
          className="checkout-step"
          aria-hidden="true"
        >
          1
        </span>

        <h2 id="checkout-information-title">
          Vos informations
        </h2>
      </div>

      <div className="checkout-section-content">
        <div className="checkout-form-group">
          <label htmlFor="firstname">
            Prénom *
          </label>

          <input
            id="firstname"
            name="firstname"
            type="text"
            defaultValue={user.firstname}
            placeholder="Votre prénom"
            autoComplete="given-name"
            minLength={2}
            maxLength={50}
            required
          />
        </div>

        <div className="checkout-form-group">
          <label htmlFor="lastname">
            Nom *
          </label>

          <input
            id="lastname"
            name="lastname"
            type="text"
            defaultValue={user.lastname}
            placeholder="Votre nom"
            autoComplete="family-name"
            minLength={2}
            maxLength={50}
            required
          />
        </div>

        <div className="checkout-form-group">
          <label htmlFor="email">
            Adresse e-mail *
          </label>

          <input
            id="email"
            name="email"
            type="email"
            defaultValue={user.email}
            placeholder="votre@email.com"
            autoComplete="email"
            required
          />
        </div>
      </div>
    </section>
  );
}
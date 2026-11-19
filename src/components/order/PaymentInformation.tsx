import bankIcon from '../../assets/icons/bank.png';
import creditCardIcon from '../../assets/icons/credit-card.png';
import './PaymentInformation.css';

interface PaymentInformationProps {
  orderNumber: string;
}

export function PaymentInformation({
  orderNumber,
}: PaymentInformationProps) {
  return (
    <section className="payment-information">
      <header className="payment-information-heading">
        <img
          className="payment-information-heading-icon"
          src={creditCardIcon}
          alt=""
        />

        <h2>Informations pour le paiement</h2>
      </header>

      <div className="payment-information-content">
        <article className="payment-method">
          <div className="payment-method-icon">
            <img src={bankIcon} alt="" />
          </div>

          <div className="payment-method-content">
            <h3>Virement bancaire</h3>

            <p>
              Effectuez votre virement sur le compte suivant :
            </p>

            <div className="payment-bank-account">
              FR76 3000 6000 0112 3456 7890 123
            </div>

            <p>
              Une fois votre virement réalisé, merci de nous envoyer
              un e-mail à{' '}
              <a href="mailto:paiement@greenroots.fr">
                paiement@greenroots.fr
              </a>{' '}
              en précisant votre nom, prénom et le numéro de votre
              commande ({orderNumber}).
            </p>
          </div>
        </article>

        <article className="payment-method">
          <div
            className="payment-method-icon payment-method-envelope"
            aria-hidden="true"
          >
            ✉
          </div>

          <div className="payment-method-content">
            <h3>Paiement par chèque</h3>

            <p>Envoyez votre chèque à l’adresse suivante :</p>

            <address>
              GreenRoots
              <br />
              12 rue des Arbres
              <br />
              75001 Paris
            </address>

            <p>
              Indiquez le numéro {orderNumber} avec votre paiement.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
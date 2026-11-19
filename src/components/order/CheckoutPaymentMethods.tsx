import bankIcon from '../../assets/icons/bank.png';

// Présente les modes de paiement disponibles.
export function CheckoutPaymentMethods() {
  return (
    <section
      className="checkout-section"
      aria-labelledby="checkout-payment-title"
    >
      <div className="checkout-section-heading">
        <span
          className="checkout-step"
          aria-hidden="true"
        >
          2
        </span>

        <h2 id="checkout-payment-title">
          Mode de paiement
        </h2>
      </div>

      <div className="checkout-section-content">
        <p>
          Après confirmation, votre commande restera en
          attente jusqu’à la réception de votre paiement.
          Vous disposerez de 30 jours pour effectuer votre
          règlement. Passé ce délai, la commande sera
          automatiquement annulée.
        </p>

        <div className="checkout-payment-option">
          <div className="checkout-payment-icon">
            <img src={bankIcon} alt="" />
          </div>

          <div>
            <h3>Virement bancaire</h3>

            <p>
              Effectuez votre règlement par virement vers
              le compte de GreenRoots, en indiquant votre
              numéro de commande dans le libellé. Votre
              commande sera validée après réception du
              paiement.
            </p>
          </div>
        </div>

        <div className="checkout-payment-option">
          <div className="checkout-payment-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="1"
              />

              <path d="m3 6 9 7 9-7" />
            </svg>
          </div>

          <div>
            <h3>Paiement par chèque</h3>

            <p>
              Envoyez votre règlement par chèque à l’ordre
              de GreenRoots, en indiquant votre numéro de
              commande. Votre commande sera validée après
              réception du paiement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
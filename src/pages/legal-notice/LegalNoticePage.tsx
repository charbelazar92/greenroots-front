import "./LegalNoticePage.css";


export function LegalNoticePage() {
  return (
    <main className="legal-notice">
      <h1>Mentions légales</h1>


      <section>
        <h2>Éditeur du site</h2>

        <h3>Nom</h3>
        <p>GreenRoots</p>

        <h3>Forme juridique</h3>
        <p>Projet étudiant</p>

        <h3>Adresse</h3>
        <p>Paris</p>

        <h3>Téléphone</h3>
        <p>06 12 34 56 78</p>

        <h3>E-mail</h3>
        <p>
          <a href="mailto:contact@greenroots.fr">contact@greenroots.fr</a>
        </p>

        <h3>Directeur de la publication</h3>
        <p>Maxime</p>

        <h3>RCS, capital social, TVA</h3>
        <p>Non applicable </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <h3>Front-end</h3>
        <p>Vercel</p>

        <h3>Back-end</h3>
        <p>Render</p>

        <h3>Base de données et images</h3>
        <p>Supabase Inc., 65 Chulia Street, #38-02/03, OCBC Centre, Singapour 049513</p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Le site et chacun des éléments qui le composent (textes, logo, charte
          graphique, code source) sont la propriété de l'équipe GreenRoots. Les
          photographies des arbres sont générées via Gemini et sont utilisées conformément à leurs licences respectives.
        </p>
        <p>
          Toute reproduction, représentation ou utilisation, intégrale ou
          partielle, des éléments du site est interdite sans autorisation
          préalable écrite de l'équipe GreenRoots.
        </p>
      </section>

      <section>
        <h2>Collecte et traitement des données personnelles</h2>
        <p>
          Les informations collectées via ce site (nom, prénom, adresse e-mail,
          historique de commandes) servent uniquement à la gestion des comptes
          utilisateurs et des commandes. Elles ne sont ni revendues ni
          transmises à des tiers. Les mots de passe sont chiffrés et ne sont
          jamais stockés en clair.
        </p>
        <p>
          Conformément au RGPD et à la loi Informatique et Libertés, vous
          disposez d'un droit d'accès, de rectification et de suppression des
          données vous concernant. Pour exercer ce droit, écrivez à{" "}
          <a href="mailto:contact@greenroots.fr">contact@greenroots.fr</a>. Vous
          pouvez également adresser une réclamation à la{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
            CNIL
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          Ce site utilise uniquement des cookies techniques nécessaires à
          l'authentification. Aucun cookie publicitaire ou de mesure d'audience
          n'est déposé.
        </p>
      </section>

      <section>
        <h2>Limitation de responsabilité</h2>
        <p>
          L'équipe GreenRoots ne peut être tenue responsable des dommages
          directs ou indirects causés au matériel de l'utilisateur lors de
          l'accès au site.
        </p>
      </section>

      <section>
        <h2>Modification des mentions légales</h2>
        <p>
          L'équipe GreenRoots se réserve le droit de modifier ces mentions
          légales à tout moment. Les utilisateurs sont invités à les consulter
          régulièrement.
        </p>
      </section>
    </main>
  );
}

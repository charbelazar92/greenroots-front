import "./PrivacyPolicyPage.css";


export function PrivacyPolicyPage() {
    return (
        <main className="privacy-policy">
            <h1>Politique de confidentialité</h1>


            <section>
                <h2>Introduction</h2>

                <p>Bienvenue sur GreenRoots ! Nous attachons une grande importance à la protection de vos données personnelles et à votre vie privée. Cette politique de confidentialité vous explique quelles informations nous collectons, comment nous les utilisons et comment nous les protégeons, conformément au Règlement général sur la protection des données (RGPD).</p>
            </section>
            <section>
                <h3>Collecte des informations</h3>
                <p>Nous collectons des informations lorsque vous créez un compte sur notre site, passez une commande d'arbres ou nous contactez. Les informations collectées peuvent inclure votre prénom, votre nom, votre adresse e-mail et l'historique de vos commandes.</p>

                <p>Aucune donnée bancaire n'est collectée : le paiement des commandes s'effectue uniquement par virement ou en espèces. Votre mot de passe n'est jamais stocké en clair. Il est chiffré de manière irréversible (hachage Argon2) avant d'être enregistré.</p>
            </section>

            <section>
                <h3>Utilisation des informations</h3>
                <p>Les informations que nous collectons auprès de vous peuvent être utilisées de l'une des manières suivantes :</p>
                <ul>
                    <li>Pour gérer votre compte et vous permettre de suivre vos commandes et les arbres plantés grâce à vous.</li>
                    <li>Pour améliorer notre site web en fonction des retours que nous recevons de vous.</li>
                    <li>Pour traiter vos commandes : vos informations ne seront ni vendues, ni échangées, ni transférées, ni données à une autre société pour quelque raison que ce soit sans votre consentement, sauf dans le but exprès de réaliser le service demandé (la plantation des arbres commandés).</li>
                </ul>
            </section>

            <section> <h3>Conservation des données</h3>
                <p>Vos données de compte sont conservées tant que votre compte est actif. Si vous supprimez votre compte, vos informations personnelles sont effacées. Les commandes passées sont conservées de manière anonyme afin d'assurer le suivi des plantations et la tenue de notre comptabilité.</p>

                <h3>Hébergement et sécurité</h3>
                <p>
                    Les données sont hébergées par notre prestataire Supabase. L'accès aux espaces réservés est protégé par une authentification sécurisée, et seuls les administrateurs de GreenRoots peuvent accéder aux données de gestion du catalogue et des commandes.
                </p></section>


            <section><h3>Modifications</h3>
                <p>Nous pouvons mettre à jour cette politique de confidentialité. La date de dernière mise à jour est indiquée ci-dessous.</p>
                <p>Dernière mise à jour : 24/09/2026</p>

            </section>





        </main>
    );
}

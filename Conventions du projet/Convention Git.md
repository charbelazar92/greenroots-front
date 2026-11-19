# GreenRoots --- Convention Git

## 1. Objectif

Cette convention définit la manière dont l'équipe GreenRoots utilise Git
et GitHub pendant le projet.

Objectifs : - travailler de manière homogène ; - éviter de développer
directement sur la branche de production ; - faciliter le travail
simultané ; - conserver un historique Git clair ; - gérer correctement
les conflits ; - intégrer le code grâce aux Pull Requests et à la revue
de code.

------------------------------------------------------------------------

## 2. Organisation des branches

``` text
main
  ↑
develop
  ↑
feature/...
```

### `main`

`main` représente la version destinée à la production.

-   On ne code jamais directement sur `main`.
-   Elle reçoit le code de `develop` au moment du déploiement.
-   Le premier commit d'initialisation peut constituer une exception.

### `develop`

`develop` constitue le tronc commun du développement.

-   Elle sert de base aux branches de travail.
-   Elle récupère les fonctionnalités terminées via Pull Request.
-   Elle représente l'état intégré du développement en cours.

### `feature/...`

Les branches `feature/...` sont temporaires et correspondent à une
fonctionnalité.

-   Elles sont créées depuis `develop`.
-   Le développement de la fonctionnalité est réalisé dessus.
-   Elles sont intégrées dans `develop` via Pull Request.
-   Elles peuvent être supprimées après la fusion.

Exemples :

``` text
feature/connexion
feature/catalogue
feature/panier
```

------------------------------------------------------------------------

## 3. Branches de travail

Chaque fonctionnalité ou correction importante est réalisée dans une
branche dédiée.

Format :

``` text
type/description
```

Exemples :

``` text
feature/auth-login
feature/catalog
fix/login-cookie
docs/update-readme
```

La branche est créée depuis `develop` et reste temporaire : une fois la
Pull Request fusionnée, elle peut être supprimée.

### Les branches représentent une tâche, pas une personne

Une branche doit expliquer **ce qui est développé**, et non **qui le
développe**.

À éviter :

``` text
branche-selim
branche-maxime
charbel-test
```

À préférer :

``` text
feature/auth-login
feature/catalog
fix/login-cookie
```

------------------------------------------------------------------------

## 4. Créer une branche de travail

Avant de commencer une fonctionnalité :

``` bash
git switch develop
git pull
git switch -c feature/connexion
```

Le travail est ensuite réalisé sur cette branche.

------------------------------------------------------------------------

## 4. Commits atomiques

Les commits doivent être **atomiques** : petits, précis et centrés sur
une modification logique.

Il est préférable de faire plusieurs commits clairs plutôt qu'un seul
commit regroupant de nombreuses modifications différentes.

Chaque membre de l'équipe doit participer aux commits correspondant à
son travail.

------------------------------------------------------------------------

## 5. Messages de commit

Les messages doivent être professionnels, courts, compréhensibles et
représentatifs de la modification.

Convention retenue :

> Les descriptions des commits sont rédigées en **français**. Les
> préfixes conventionnels (`feat:`, `fix:`, etc.) sont conservés. Les
> noms de branches restent en **anglais**.

``` text
feat: nouvelle fonctionnalité
fix: correction d'un bug
docs: documentation
style: mise en forme sans changement fonctionnel
refactor: réorganisation du code
test: ajout ou modification de tests
chore: tâche technique ou maintenance
```

Exemples :

``` bash
git commit -m "feat: ajouter le formulaire de connexion"
git commit -m "fix: gérer les identifiants invalides"
git commit -m "docs: mettre à jour les conventions du projet"
```

Éviter :

``` text
modification
test
ça marche
correction
dernier commit
```

------------------------------------------------------------------------

## 6. Synchroniser `develop`

### Mettre à jour sa copie locale de `develop`

``` bash
git switch develop
git pull
```

`git pull` met à jour la copie locale de `develop` avec ce qui est déjà
présent sur le dépôt distant.

### Récupérer `develop` dans sa branche de travail

Apres être revenu sur la branche de fonctionnalité via par exemple:

``` bash
git switch feature/connexion
```

merger develop DANS la branche de fonctionnalité (« Je prends ce qui se
trouve actuellement dans develop et je l'intègre dans ma branche
feature/connexion. »)

``` bash
git merge develop
```

Cela permet de récupérer l'état actuel de `develop` dans la
fonctionnalité en cours et de traiter les éventuels conflits avant la
Pull Request.

  ------------
  Cette
  commande
  fusionne le
  contenu
  actuel de
  `develop`
  **dans notre
  branche de
  travail**.

  À partir de
  cette étape,
  deux
  situations
  sont
  possibles.
  ------------

### Cas 1 --- Aucun conflit

Si Git ne détecte aucun conflit, la fusion est réalisée automatiquement.

Vérifier l'état du projet :

``` bash
git status
```

Vérifier la qualité du code :

``` bash
npm run lint
```

Tester également que l'application fonctionne toujours :

``` bash
npm run dev
```

Si tout fonctionne, envoyer la branche sur GitHub :

``` bash
git push
```

Si la branche n'a encore jamais été envoyée sur GitHub :

``` bash
git push -u origin feature/connexion
```

Créer ensuite une Pull Request :

``` text
feature/connexion
        ↓
   Pull Request
        ↓
     develop
```

------------------------------------------------------------------------

### Cas 2 --- Des conflits apparaissent

Si Git détecte des modifications incompatibles entre `develop` et notre
branche, il indique les fichiers concernés.

Exemple :

``` text
CONFLICT (content): Merge conflict in src/...
```

Il faut alors :

1.  ouvrir les fichiers concernés ;
2.  identifier les modifications en conflit ;
3.  conserver ou combiner les bonnes modifications ;
4.  communiquer avec le membre concerné en cas de doute ;
5.  enregistrer les fichiers après résolution ;
6.  vérifier que l'application fonctionne toujours.

Une fois les conflits résolus, ajouter les fichiers :

``` bash
git add .
```

Puis finaliser le merge :

``` bash
git commit
```

Il est également possible d'utiliser un message explicite :

``` bash
git commit -m "fix: résoudre les conflits de fusion"
```

Vérifier ensuite l'état du projet :

``` bash
git status
```

Vérifier le code :

``` bash
npm run lint
```

Tester l'application :

``` bash
npm run dev
```

Si tout fonctionne, envoyer la branche sur GitHub :

``` bash
git push
```

## Avant de commit

Avant de créer un commit :

-   vérifier les fichiers modifiés ;
-   supprimer les `console.log` de debug inutiles ;
-   vérifier qu'aucun `.env` n'est ajouté ;
-   vérifier qu'aucun mot de passe ou secret n'est présent ;
-   vérifier que le code compile ;
-   vérifier ESLint ;
-   vérifier que le formatage est correct.

Commandes utiles :

``` bash
git status
git diff
```

------------------------------------------------------------------------

## 7. Pull Requests

Une fonctionnalité terminée est intégrée dans `develop` via une Pull
Request.

Workflow :

``` text
feature/...
    ↓
Pull Request
    ↓
Revue de code
    ↓
develop
```

Étapes :

1.  terminer la fonctionnalité ;
2.  vérifier le code ;
3.  pousser la branche sur GitHub ;
4.  créer une Pull Request vers `develop` ;
5.  faire relire la Pull Request par un autre membre ;
6.  corriger les éventuels problèmes ;
7.  fusionner après validation.

Une Pull Request ne doit pas être fusionnée sans relecture.

------------------------------------------------------------------------

## Nom des Pull Requests

Les Pull Requests suivent la même logique de nommage que les commits.

Exemples :

``` text
feat: ajouter le formulaire de connexion
fix: corriger le cookie d'authentification
docs: mettre à jour les routes de l'API
```

Le titre doit permettre de comprendre rapidement ce que la Pull Request
apporte au projet.

------------------------------------------------------------------------

## 8. Gestion des conflits Git

Les conflits Git font partie du travail collaboratif.

Pour récupérer les changements récents de `develop` dans une branche de
travail :

``` bash
git merge develop
```

En cas de conflit :

1.  identifier les fichiers concernés ;
2.  comprendre les différentes modifications ;
3.  choisir ou combiner correctement le code ;
4.  vérifier que l'application fonctionne ;
5.  finaliser la résolution ;
6.  poursuivre le workflow.

En cas de doute sur le code d'un autre membre, communiquer avec lui
plutôt que supprimer arbitrairement ses modifications.

------------------------------------------------------------------------

## 9. Mise en production

Les fonctionnalités sont d'abord intégrées dans `develop`.

Lorsque la version est prête à être déployée, `develop` est fusionnée
vers `main`.

``` text
feature/...
     ↓
  develop
     ↓
    main
     ↓
Production
```

`main` reflète ainsi la version destinée à la production.

------------------------------------------------------------------------

## 10. Workflow n°1 --- Développer une fonctionnalité : de `develop` jusqu'au `git push`



### Vue d'ensemble

``` text
Je veux commencer une nouvelle fonctionnalité
                ↓
        git switch develop
                ↓
             git pull
                ↓
git switch -c feature/login
                ↓
          Je développe
                ↓
      git add . + git commit
                ↓
Ma fonctionnalité est terminée
                ↓
        git switch develop
                ↓
             git pull
                ↓
   git switch feature/login
                ↓
        git merge develop
                ↓
       Y a-t-il un conflit ?
          ↙             ↘
        NON              OUI
         ↓                ↓
      Vérifier       Résoudre les conflits
         ↓                ↓
         └────────→ Vérifier le projet
                          ↓
                       git push
                          ↓
              Branche envoyée sur GitHub
                          ↓
             Passer au workflow Pull Request
```

------------------------------------------------------------------------

### Étape 1 --- Se placer sur `develop`

Avant de commencer une nouvelle fonctionnalité, se placer sur la branche
commune de développement :

``` bash
git switch develop
```

Vérifier sur quelle branche on se trouve :

``` bash
git branch
```

La branche active est précédée d'un `*` :

``` text
* develop
  main
```

> À ce moment-là, **on ne commence pas encore à coder**.

------------------------------------------------------------------------

### Étape 2 --- Mettre `develop` à jour

Récupérer les dernières modifications présentes sur GitHub :

``` bash
git pull
```

Cela permet de créer notre future branche à partir de la version la plus
récente de `develop`.

``` text
GitHub : origin/develop
          ↓
       git pull
          ↓
Local : develop à jour
```

------------------------------------------------------------------------

### Étape 3 --- Créer la branche de travail

Créer une branche correspondant à la fonctionnalité :

``` bash
git switch -c feature/login
```

Ici :

-   `feature/` indique qu'il s'agit d'une nouvelle fonctionnalité ;
-   `login` décrit la fonctionnalité ;
-   **les noms de branches sont écrits en anglais**.

Vérifier :

``` bash
git branch
```

Résultat attendu :

``` text
  develop
  main
* feature/login
```

> Le `*` confirme que nous travaillons maintenant sur `feature/login`.

------------------------------------------------------------------------

### Étape 4 --- Développer uniquement sur la branche `feature`

Nous pouvons maintenant modifier les fichiers nécessaires à la
fonctionnalité.

Pendant le développement, vérifier régulièrement les fichiers modifiés :

``` bash
git status
```

et, si nécessaire :

``` bash
git diff
```

> Tant que nous développons cette fonctionnalité, nous restons sur
> `feature/login`.\
> Nous ne codons pas directement sur `develop` ou `main`.

------------------------------------------------------------------------

### Étape 5 --- Faire des commits petits et réguliers

Quand une partie cohérente du travail est terminée :

``` bash
git add .
git commit -m "feat: ajouter le formulaire de connexion"
```

Autres exemples :

``` bash
git commit -m "feat: connecter le formulaire à l'API"
git commit -m "fix: afficher le message d'erreur de connexion"
git commit -m "docs: documenter la route de connexion"
```

> **Convention GreenRoots :**
>
> -   le préfixe reste `feat:`, `fix:`, `docs:`, etc. ;
> -   **le texte du commit est écrit en français** ;
> -   seuls les **noms des branches sont écrits en anglais**.

Il est préférable d'avoir plusieurs commits précis plutôt qu'un seul
gros commit.

------------------------------------------------------------------------

### Étape 6 --- La fonctionnalité est terminée : vérifier avant la synchronisation

Avant de préparer la Pull Request :

``` bash
git status
```

Puis vérifier le projet :

``` bash
npm run lint
```

et lancer l'application :

``` bash
npm run dev
```

Vérifier notamment :

-   que la fonctionnalité fonctionne ;
-   qu'aucun `.env` ou secret n'est ajouté ;
-   qu'il ne reste pas de `console.log` de debug inutile ;
-   que le code respecte les conventions du projet.

------------------------------------------------------------------------

### Étape 7 --- Mettre `develop` à jour AVANT de faire le merge

Pendant que nous développions notre fonctionnalité, d'autres membres de
l'équipe ont peut-être ajouté du code dans `develop`.

Nous allons donc récupérer le `develop` le plus récent.

#### 7.1 --- Aller sur `develop`

``` bash
git switch develop
```

#### 7.2 --- Récupérer les changements de GitHub

``` bash
git pull
```

À ce moment :

``` text
origin/develop sur GitHub
          ↓
       git pull
          ↓
develop local à jour
```

> Nous ne faisons aucune modification de notre fonctionnalité sur
> `develop`.

------------------------------------------------------------------------

### Étape 8 --- Revenir sur notre branche `feature`

``` bash
git switch feature/login
```

Vérifier si nécessaire :

``` bash
git branch
```

Résultat attendu :

``` text
  develop
  main
* feature/login
```

------------------------------------------------------------------------

### Étape 9 --- Intégrer `develop` DANS notre branche `feature`

Maintenant que nous sommes revenus sur `feature/login` :

``` bash
git merge develop
```

### ⚠️ Comprendre cette commande

Nous sommes actuellement sur :

``` text
feature/login
```

Donc :

``` bash
git merge develop
```

signifie :

``` text
Je prends les changements de develop
                ↓
et je les intègre dans feature/login
```

Autrement dit :

``` text
develop ───────────────┐
                       ↓
                 feature/login
```

> **Cette commande n'intègre PAS notre fonctionnalité dans `develop`.**
>
> L'intégration de `feature/login` dans `develop` sera faite plus tard
> grâce à la **Pull Request**.

À partir de maintenant, deux situations sont possibles.

------------------------------------------------------------------------

## Cas A --- Aucun conflit après `git merge develop`

Si Git ne signale aucun conflit, le merge s'est effectué correctement.

Vérifier :

``` bash
git status
```

Puis :

``` bash
npm run lint
npm run dev
```

Si tout fonctionne, envoyer la branche sur GitHub.

### Si la branche a déjà été poussée auparavant

``` bash
git push
```

### Si c'est le premier push de cette branche

``` bash
git push -u origin feature/login
```

La branche existe maintenant :

``` text
Ordinateur
feature/login
      ↓
   git push
      ↓
GitHub
feature/login
```

> `git push` **n'intègre pas** la fonctionnalité dans `develop`.\
> Il envoie uniquement notre branche sur GitHub.

Nous pouvons maintenant passer au **Workflow n°2 --- Pull Request**.

------------------------------------------------------------------------

## Cas B --- Git signale un conflit

Git peut afficher par exemple :

``` text
CONFLICT (content): Merge conflict in src/...
Automatic merge failed; fix conflicts and then commit the result.
```

Cela signifie que notre branche et `develop` ont modifié une même partie
du code d'une manière que Git ne peut pas choisir automatiquement.

### Étape B1 --- Identifier les fichiers en conflit

``` bash
git status
```

Git indique les fichiers concernés.

------------------------------------------------------------------------

### Étape B2 --- Ouvrir les fichiers concernés

Dans un fichier en conflit, Git peut afficher :

``` text
<<<<<<< HEAD
notre code présent dans feature/login
=======
code provenant de develop
>>>>>>> develop
```

Les marqueurs signifient :

``` text
<<<<<<< HEAD
notre version
=======
séparation entre les deux versions
>>>>>>> develop
version provenant de develop
```

Il faut :

1.  comprendre les deux modifications ;
2.  choisir la bonne version ou combiner les deux ;
3.  supprimer les marqueurs `<<<<<<<`, `=======` et `>>>>>>>` ;
4.  enregistrer le fichier.

> En cas de doute sur le code d'un autre membre, **communiquer avec
> lui** plutôt que supprimer sa modification arbitrairement.

------------------------------------------------------------------------

### Étape B3 --- Vérifier que tous les conflits sont résolus

``` bash
git status
```

Une fois les fichiers corrigés, les ajouter :

``` bash
git add .
```

------------------------------------------------------------------------

### Étape B4 --- Finaliser le merge

Créer le commit qui termine la résolution :

``` bash
git commit -m "fix: résoudre les conflits de fusion"
```

------------------------------------------------------------------------

### Étape B5 --- Tester le projet

``` bash
npm run lint
npm run dev
```

Vérifier que notre fonctionnalité fonctionne toujours et que les
changements récupérés depuis `develop` n'ont rien cassé.

------------------------------------------------------------------------

### Étape B6 --- Envoyer la branche corrigée sur GitHub

Si la branche existe déjà sur GitHub :

``` bash
git push
```

Si c'est son premier push :

``` bash
git push -u origin feature/login
```

Le workflow Git local est maintenant terminé.

------------------------------------------------------------------------

### Résumé du Workflow n°1

``` text
1. git switch develop
        ↓
2. git pull
        ↓
3. git switch -c feature/login
        ↓
4. développer
        ↓
5. git add .
   git commit -m "feat: ..."
        ↓
6. tester
        ↓
7. git switch develop
   git pull
        ↓
8. git switch feature/login
        ↓
9. git merge develop
        ↓
   conflit ?
   /      \
 NON      OUI
  ↓        ↓
tester   résoudre
  ↓        ↓
  └──→ tester
         ↓
10. git push
         ↓
11. Pull Request
```

### À retenir avant de passer à la Pull Request

``` text
git pull
= je récupère les changements du dépôt distant

git merge develop
= j'intègre develop DANS ma branche actuelle

git push
= j'envoie ma branche actuelle sur GitHub
```

------------------------------------------------------------------------

# 11. Workflow n°2 --- Créer, faire relire et fusionner une Pull Request

> Ce workflow commence **après avoir terminé le Workflow n°1**.\
> Notre fonctionnalité est terminée, testée, synchronisée avec `develop`
> et notre branche `feature/login` est présente sur GitHub.

### Vue d'ensemble

``` text
feature/login terminée
          ↓
       git push
          ↓
Branche disponible sur GitHub
          ↓
Compare & pull request
          ↓
Vérifier :
base: develop
compare: feature/login
          ↓
Titre + description
          ↓
Create pull request
          ↓
Un collègue réalise la revue
       ↙          ↘
  Approuvée    Modifications demandées
      ↓                 ↓
      │          Corriger EN LOCAL
      │                 ↓
      │             git add .
      │             git commit
      │             git push
      │                 ↓
      │        La même PR se met à jour
      │                 ↓
      └──────────→ Nouvelle revue
                         ↓
                  Pull Request validée
                         ↓
                  Merge pull request
                         ↓
                       develop
                         ↓
                    Delete branch
                         ↓
                  git switch develop
                         ↓
                      git pull
                         ↓
                 develop local à jour
```

------------------------------------------------------------------------

### Étape 1 --- Vérifier que la branche a bien été poussée

Dans le terminal, nous devons être sur notre branche :

``` bash
git branch
```

Exemple :

``` text
  develop
  main
* feature/login
```

Puis :

``` bash
git status
```

Si tout est correct, pousser les derniers commits :

``` bash
git push
```

Si Git indique que la branche n'a pas encore de branche distante :

``` bash
git push -u origin feature/login
```

------------------------------------------------------------------------

### Étape 2 --- Ouvrir le repository sur GitHub

Après le `git push`, ouvrir le repository GitHub concerné.

GitHub propose généralement :

``` text
Compare & pull request
```

Cliquer sur ce bouton.

> Si le bouton n'apparaît pas, aller dans l'onglet **Pull requests**,
> puis cliquer sur **New pull request**.

------------------------------------------------------------------------

### Étape 3 --- Vérifier IMPÉRATIVEMENT les deux branches

Avant de créer la Pull Request :

``` text
base: develop  ←  compare: feature/login
```

Cela signifie :

-   **base : `develop`** = la branche qui doit recevoir notre
    fonctionnalité ;
-   **compare : `feature/login`** = la branche qui contient notre
    travail.

Visuellement :

``` text
feature/login
      ↓
Pull Request
      ↓
   develop
```

### ⚠️ Vérification importante

Pour une fonctionnalité classique :

``` text
base = develop
```

et non :

``` text
base = main
```

> `main` est réservée à la version destinée à la production.

------------------------------------------------------------------------

### Étape 4 --- Vérifier les modifications affichées par GitHub

Avant de créer la Pull Request, regarder les fichiers et les
modifications affichés.

Vérifier notamment :

-   qu'il n'y a pas de fichier `.env` ;
-   qu'aucun secret n'est présent ;
-   qu'il n'y a pas de fichier inutile ;
-   que les modifications correspondent bien à la fonctionnalité
    attendue.

------------------------------------------------------------------------

### Étape 5 --- Donner un titre à la Pull Request

**Convention GreenRoots : le titre de la Pull Request est écrit en
français.**

Exemples :

``` text
feat: ajouter la connexion utilisateur
feat: ajouter l'inscription utilisateur
feat: ajouter le catalogue des arbres
fix: corriger le cookie d'authentification
```

Les préfixes restent :

``` text
feat:
fix:
docs:
style:
refactor:
test:
chore:
```

mais la description qui suit est en français.

Éviter :

``` text
modification
mise à jour
travail terminé
correction
```

------------------------------------------------------------------------

### Étape 6 --- Ajouter une description claire

Exemple :

``` md
## Description

Ajout de la fonctionnalité de connexion utilisateur.

## Modifications

- création du formulaire de connexion
- connexion avec l'API
- gestion des erreurs
- redirection après connexion

## À vérifier

- connexion avec des identifiants valides
- affichage d'une erreur avec des identifiants incorrects
- redirection après connexion
```

La description doit permettre au reviewer de comprendre rapidement :

``` text
Qu'est-ce qui a été ajouté ?
Qu'est-ce qui a été modifié ?
Qu'est-ce que je dois tester ?
```

------------------------------------------------------------------------

### Étape 7 --- Créer la Pull Request

Cliquer sur :

``` text
Create pull request
```

À cet instant :

``` text
feature/login
      ↓
Pull Request ouverte
      ↓
En attente de revue
```

> **La fonctionnalité n'est toujours pas dans `develop`.**
>
> Nous avons uniquement créé une **demande de fusion**.

------------------------------------------------------------------------

### Étape 8 --- Un autre membre de l'équipe réalise la revue

Le reviewer vérifie notamment :

-   que le code est compréhensible ;
-   que la fonctionnalité correspond au besoin ;
-   que les conventions sont respectées ;
-   qu'il n'y a pas de code inutile ;
-   que la modification ne casse pas une autre fonctionnalité.

Deux situations sont possibles :

``` text
             Revue
            /     \
           /       \
    Approuvée    Modifications demandées
```

------------------------------------------------------------------------

## Cas A --- La Pull Request est approuvée

Si le reviewer valide la Pull Request, passer directement à l'étape
**Fusionner la Pull Request** ci-dessous.

------------------------------------------------------------------------

## Cas B --- Le reviewer demande des modifications

> **Ne pas créer une nouvelle Pull Request.**

La Pull Request actuelle reste ouverte.

### B1 --- Retourner dans VS Code / terminal

Se placer sur la branche concernée :

``` bash
git switch feature/login
```

------------------------------------------------------------------------

### B2 --- Effectuer les corrections

Modifier les fichiers demandés par le reviewer.

Puis :

``` bash
git status
git add .
git commit -m "fix: corriger la validation du formulaire de connexion"
```

------------------------------------------------------------------------

### B3 --- Envoyer les corrections

``` bash
git push
```

### Que se passe-t-il ?

``` text
Nouveau commit
     ↓
git push
     ↓
feature/login sur GitHub mise à jour
     ↓
La Pull Request EXISTANTE se met à jour automatiquement
```

> Il n'est pas nécessaire de fermer la Pull Request ni d'en créer une
> nouvelle.

Le reviewer peut ensuite effectuer une nouvelle revue.

------------------------------------------------------------------------

### Étape 9 --- Fusionner la Pull Request

Une fois la Pull Request approuvée, cliquer sur :

``` text
Merge pull request
```

puis confirmer la fusion.

Le résultat est :

``` text
feature/login
      ↓
Pull Request
      ↓
    Revue
      ↓
  Validation
      ↓
Merge pull request
      ↓
   develop
```

**C'est seulement à cette étape que notre fonctionnalité entre
réellement dans `develop`.**

------------------------------------------------------------------------

### Étape 10 --- Supprimer la branche distante

Une fois la fusion terminée, GitHub propose généralement :

``` text
Delete branch
```

La branche `feature/login` était temporaire. Son contenu étant
maintenant intégré dans `develop`, elle peut être supprimée sur GitHub.

> Supprimer la branche ne supprime pas la fonctionnalité : son code se
> trouve désormais dans `develop`.

------------------------------------------------------------------------

### Étape 11 --- Mettre notre `develop` local à jour

La Pull Request a été fusionnée **sur GitHub**.

Notre ordinateur ne possède donc pas encore nécessairement cette
nouvelle version de `develop`.

Revenir sur `develop` :

``` bash
git switch develop
```

Puis :

``` bash
git pull
```

Nous obtenons :

``` text
develop sur GitHub
      ↓
   git pull
      ↓
develop sur notre ordinateur
```

Notre `develop` local contient maintenant la fonctionnalité fusionnée.

------------------------------------------------------------------------

### Étape 12 --- Commencer la fonctionnalité suivante

Nous pouvons maintenant repartir du `develop` à jour :

``` bash
git switch -c feature/tree-catalog
```

Le cycle recommence avec le **Workflow n°1**.

------------------------------------------------------------------------

## Les 3 actions à ne jamais confondre

### `git push`

``` text
Ordinateur
feature/login
      ↓
   git push
      ↓
GitHub
feature/login
```

**J'envoie ma branche sur GitHub.**

Cela ne modifie pas `develop`.

------------------------------------------------------------------------

### `Create pull request`

``` text
feature/login
      ↓
Demande d'intégration
      ↓
develop
```

**Je propose que ma branche soit intégrée dans `develop`.**

Cela ne réalise pas encore la fusion.

------------------------------------------------------------------------

### `Merge pull request`

``` text
feature/login
      ↓
   Merge
      ↓
develop
```

**La fonctionnalité est réellement intégrée dans `develop`.**

------------------------------------------------------------------------

## Schéma final : le cycle complet

``` text
                DÉBUT
                  ↓
         git switch develop
                  ↓
              git pull
                  ↓
   git switch -c feature/login
                  ↓
             DÉVELOPPER
                  ↓
              git add .
                  ↓
             git commit
                  ↓
         Fonction terminée
                  ↓
         git switch develop
                  ↓
              git pull
                  ↓
     git switch feature/login
                  ↓
          git merge develop
                  ↓
             CONFLIT ?
             /      \
           NON      OUI
            ↓        ↓
            │     Résoudre
            │        ↓
            └───→ Tester
                     ↓
                  git push
                     ↓
                   GitHub
                     ↓
          Compare & pull request
                     ↓
          base: develop
          compare: feature/login
                     ↓
             Titre en français
                     ↓
            Create pull request
                     ↓
                   REVUE
                /         \
          Approuvée     Corrections
              ↓             ↓
              │         modifier
              │             ↓
              │         git add .
              │         git commit
              │         git push
              │             ↓
              └──────→ Nouvelle revue
                            ↓
                    Merge pull request
                            ↓
                         develop
                            ↓
                       Delete branch
                            ↓
                    git switch develop
                            ↓
                         git pull
                            ↓
                    PRÊT POUR LA SUITE
```

> **À retenir :**
>
> -   branches : noms en **anglais** (`feature/login`,
>     `feature/tree-catalog`) ;
> -   commits : descriptions en **français**
>     (`feat: ajouter la connexion utilisateur`) ;
> -   titres de Pull Request : en **français** ;
> -   `git merge develop` depuis une branche `feature` récupère
>     `develop` **dans la feature** ;
> -   `git push` envoie la branche sur GitHub ;
> -   la Pull Request propose l'intégration ;
> -   `Merge pull request` intègre réellement la fonctionnalité dans
>     `develop`.

------------------------------------------------------------------------

## 12. Règles essentielles à retenir

-   Ne jamais coder directement sur `main`.
-   Utiliser `develop` comme branche commune de développement.
-   Créer les branches de travail depuis `develop`.
-   Créer une branche par fonctionnalité.
-   Faire des commits petits, précis et réguliers.
-   Utiliser des messages de commit professionnels.
-   Tous les membres doivent réaliser des commits.
-   Passer par une Pull Request pour intégrer une fonctionnalité dans
    `develop`.
-   Faire relire les Pull Requests avant leur fusion.
-   Synchroniser régulièrement son travail avec `develop`.
-   Traiter les conflits avec attention et communiquer avec l'équipe.
-   Fusionner `develop` vers `main` lorsque la version est prête pour la
    production.

------------------------------------------------------------------------

------------------------------------------------------------------------

> **En résumé : une fonctionnalité est développée sur sa propre branche,
> relue via une Pull Request, intégrée dans `develop`, puis `develop`
> est fusionnée vers `main` pour la mise en production.**

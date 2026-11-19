# GreenRoots — Convention de développement

## 1. Objectif

Cette convention constitue une base commune pour toute l’équipe et a pour objectif d’assurer une structure homogène dans l’ensemble du projet GreenRoots.

Elle définit les règles communes concernant :

- le nommage des fichiers, variables, fonctions et composants 
- les classes CSS ;
- les imports et exports ;
- les routes ;
- la base de données ;
- la lisibilité générale du code ;

---

## 2. Règles générales de nommage

Le projet GreenRoots utilise principalement **TypeScript** côté frontend et backend. Pour garantir une cohérence globale, les mêmes conventions JavaScript / TypeScript sont appliquées sur les deux parties.

| Élément | Convention | Exemple |
|---|---|---|
| Variables | `camelCase` | `currentUser` |
| Fonctions | `camelCase` | `getCurrentUser()` |
| Fonctions / variables booléennes | `is`, `has`, `can`, `should` | `isAdmin`, `hasOrders` |
| Constantes globales | `UPPER_SNAKE_CASE` | `MAX_LOGIN_ATTEMPTS` |
| Types TypeScript | `PascalCase` | `Tree`, `Order` |
| Interfaces | `PascalCase` | `User`, `TreeFormData` |
| Composants React | `PascalCase` | `TreeCard` |
| Hooks | `camelCase` avec `use` | `useCart` |
| Classes CSS | `kebab-case` | `tree-card` |
| Routes | `kebab-case` si plusieurs mots | `/privacy-policy` |
| Base PostgreSQL | `snake_case` | `created_at` |

### À éviter

```ts
const User_Name = "Greenroots";
const user_name = "Greenroots";
const USERname = "Greenroots";
```

### À préférer

```ts
const userName = "Greenroots";
```

---

## 3. Langue utilisée dans le code

La langue retenue pour le code est **l’anglais**.

Le but est d’éviter de mélanger français et anglais dans les variables, fonctions et fichiers.

### À éviter

```ts
const userName = "Greenroots";
const prixArbre = 25;
const getCommande = () => {};
```

### À préférer

```ts
const userName = "Greenroots";
const treePrice = 25;
const getOrder = () => {};
```

Les commentaires peuvent rester en français si cela facilite la compréhension de l’équipe.

---

# Frontend

## 4. Nommage des fichiers React

Les composants et pages React utilisent le **PascalCase**.

Exemples :

```text
TreeCard.tsx
Header.tsx
Footer.tsx
CartPage.tsx
LoginPage.tsx
AdminTreesPage.tsx
```

Le nom du composant doit correspondre au nom du fichier.

### Bon exemple

Fichier :

```text
TreeCard.tsx
```

Contenu :

```tsx
export function TreeCard() {
  return
}
```

### À éviter

Fichier :

```text
Card.tsx
```

Contenant :

```tsx
function TreeCardt() {
  return 
}
```

---

## 5. Nommage des pages React

Toutes les pages utilisent le suffixe :

```text
Page
```

Exemples :

```text
HomePage.tsx
CatalogPage.tsx
TreeDetailPage.tsx
LoginPage.tsx
AdminPage.tsx
```

Cette convention permet de distinguer immédiatement une page complète d’un composant réutilisable.

---

## 6. Nommage des composants React

Les composants réutilisables doivent porter un nom décrivant précisément leur rôle.

### Bons exemples

```text
TreeCard
OrderCard
Navbar
Header
Footer
```

### À éviter

```text
Component1
Component2
```

Le nom doit permettre à un autre membre de comprendre immédiatement l’objectif du composant.

---

## 7. Classes CSS

Les classes CSS utilisent le **kebab-case**.

Exemple :

```css
.tree-card {
}

.order-card {
}

```

Pour limiter les conflits CSS entre composants, il est recommandé de préfixer les classes avec le nom du composant.

Une convention inspirée de **BEM** peut être utilisée :

```css
.tree-card {
}

.tree-card__image {
}

.tree-card__title {
}


```

Exemple :

```tsx
<article className="tree-card">
  <img className="tree-card__image" />
  <h2 className="tree-card__title">{tree.name}</h2>
 
</article>
```

---

## 8. Props React

Les types de props doivent reprendre le nom du composant.

### Recommandé

```tsx
type TreeCardProps = {
  tree:...;
};

export function TreeCard({ tree }: TreeCardProps) {
  return <article>{tree.name}</article>;
}
```

### À éviter

```tsx
type Props = {
  tree: ...;
};
```

`Props`  devient vite peu clair dans le projet qui contiendra plusieurs composants.
---

## 9. Fonctions événementielles React

Les fonctions qui traitent une action utilisateur commencent par :

```text
handle
```

Exemples :

```tsx
function handleSubmit() {
}

function handleDeleteTree() {
}

```

Dans le JSX :

```tsx
<button onClick={handleDeleteTree}>
 "Supprimer l'arbre"
</button>
```

Cette convention permet de distinguer l’événement React `onClick` de la fonction exécutée `handleDeleteTree`.

---


## 10. Variables et états React

Les noms doivent décrire clairement leur contenu.

### À éviter

```ts
const result = ...
const x = ...
```

### À préférer

```ts
const orderTotal = ...
const selectedTree = ...
```

---

# Backend

## 11. Nommage des fichiers Backend

Convention retenue :

```text
resource.type.ts
```

### Arbres

```text
tree.routes.ts
tree.controller.ts
```

### Authentification

```text
auth.controller.ts
auth.middleware.ts
```


Cette convention permet de connaître immédiatement le rôle d’un fichier.

---

## 14. Nommage des fonctions Backend

Les fonctions utilisent le **camelCase** et commencent généralement par un verbe. Exemple:

### Arbres

```ts
getTrees();
createTree();
deleteTree();
```

---

## 15. Exports : convention GreenRoots

La convention retenue est :

> **Utiliser les exports nommés par défaut dans le projet GreenRoots.**

Exemple :

```ts
export function getTrees() {
}
```

Import :

```ts
import { getTrees } from "./tree.controller";
```

Pour plusieurs fonctions :

```ts
export {
  getTrees,
  createTree,
  deleteTree,
};
```

### Pourquoi éviter les `export default` ?

Un export par défaut peut être renommé librement lors de l’import :

```ts
import toto from "./tree.controller";
```

Cela peut entraîner des différences de nommage entre les membres de l’équipe.

Avec un export nommé :

```ts
import { getTrees } from "./tree.controller";
```

le nom reste cohérent dans tout le projet.

### Exception

Les exports `default` peuvent être utilisés lorsqu’une bibliothèque ou un framework l’impose ou lorsque l’équipe décide explicitement qu’un fichier particulier doit en utiliser un.

---

## 16. Convention des imports

Ordre recommandé :

1. bibliothèques externes ;
2. fichiers internes ;
3. types TypeScript.

Exemple :

```ts
import express from "express";
import { z } from "zod";

import { getTrees } from "./controllers/tree.controller";
import { treeSchema } from "./schemas/tree.schema";

import type { Tree } from "./types/tree";
```

Éviter les imports inutilisés.

---

## 17. Routes API

Les routes API utilisent :

```text
/api/ressource
```

Les ressources sont nommées **au pluriel**.

### Recommandé

```text
/api/trees
/api/orders
/api/users
```
---

# Base de données

## 18. Convention PostgreSQL

La base PostgreSQL utilise le **snake_case**.

Exemples :

```text
user_id
order_id
tree_id
```

---

## 19. Différence entre nommage BDD et TypeScript


| Base de données | TypeScript |
|---|---|
| `created_at` | `createdAt` |
| `updated_at` | `updatedAt` |
| `order_number` | `orderNumber` |
| `total_amount` | `totalAmount` |
| `unit_price` | `unitPrice` |
| `user_id` | `userId` |
| `tree_id` | `treeId` |

---

# Lisibilité et qualité du code


## 21. Constantes

Les constantes globales ou de configuration utilisent :

```text
UPPER_SNAKE_CASE
```

Exemple :

```ts
const PORT = 3000;
const API_URL = "http://localhost:3000";
```

---

## 23. Commentaires

Les commentaires doivent expliquer **pourquoi** une logique existe, et non répéter ce que le code fait déjà.


---

## 24. `console.log`

Les `console.log` sont autorisés pendant le développement.

Avant une Pull Request :

> Supprimer les `console.log` de debug inutiles.

À ne pas laisser dans `develop` ou `main` :

```ts
console.log("ICI");
console.log("TEST");
console.log("ça marche");
```

---

## 25. ESLint 


ESLint sert à :

- détecter certaines erreurs ;
- signaler des pratiques problématiques ;
- appliquer les mêmes règles de code à toute l’équipe.

---




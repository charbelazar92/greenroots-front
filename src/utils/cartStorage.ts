import type { CartItem } from '../@types/cart';

// Nom de la sauvegarde dans le navigateur.
export const CART_STORAGE_KEY = 'greenroots-cart';

// Vérifie qu'une valeur respecte la structure d'une ligne du panier.
function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (!('tree' in value) || !('quantity' in value)) {
    return false;
  }

  const { tree, quantity } = value;

  if (typeof tree !== 'object' || tree === null) {
    return false;
  }

  // Vérifie les informations de l'arbre, y compris son espèce.
  const validTree =
    'id' in tree &&
    typeof tree.id === 'number' &&
    Number.isSafeInteger(tree.id) &&
    tree.id > 0 &&
    'name' in tree &&
    typeof tree.name === 'string' &&
    'species' in tree &&
    typeof tree.species === 'string' &&
    'url_image' in tree &&
    typeof tree.url_image === 'string' &&
    'price' in tree &&
    typeof tree.price === 'string' &&
    tree.price.trim() !== '' &&
    Number.isFinite(Number(tree.price)) &&
    Number(tree.price) >= 0;

  // La quantité doit être un entier positif représentable sans perte de précision.
  const validQuantity =
    typeof quantity === 'number' &&
    Number.isSafeInteger(quantity) &&
    quantity >= 1;

  return validTree && validQuantity;
}

// Lit et valide le panier sauvegardé au démarrage.
export function readStoredCart(): CartItem[] {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (savedCart === null) {
      return [];
    }

    const parsedCart: unknown = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    const items: CartItem[] = [];
    const treeIds = new Set<number>();

    for (const item of parsedCart) {
      // Rejette la sauvegarde si une ligne est invalide ou un arbre apparaît deux fois.
      if (!isCartItem(item) || treeIds.has(item.tree.id)) {
        return [];
      }

      treeIds.add(item.tree.id);
      items.push(item);
    }

    return items;
  } catch {
    // Retourne un panier vide si le JSON est invalide ou le stockage inaccessible.
    return [];
  }
}
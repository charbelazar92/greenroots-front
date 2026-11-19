import type ITree from './trees';

//Structure d'une ligne du panier
export interface CartItem {
  tree: Pick<ITree, 'id' | 'name' | 'species' | 'price' | 'url_image'>;
  quantity: number;
}
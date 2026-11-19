// Ligne envoyée au back lors de la création.
export interface CreateOrderItem {
  treeId: number;
  quantity: number;
}

// Données envoyées au back pour créer une commande.
export interface CreateOrderBody {
  items: CreateOrderItem[];
}

// Ligne retournée par le back.
export interface OrderItem {
  treeId: number;
  name: string;
  slug: string;
  urlImage: string | null;
  quantity: number;
  unitPrice: string;
  lineTotal: string;
}

// Commande retournée par le back.
export interface Order {
  id: number;
  orderNumber: string;
  orderDate: string;
  status: 'pending' | 'validated' | 'cancelled';
  totalAmount: string;
  items: OrderItem[];
}

// Client qui a passé le commande
// User vaut null si le compte a été supprimé
export interface AdminOrder extends Order {
    user: {
      firstname:string;
      lastname: string;

    } | null;
}

// Erreur retournée par le back.
// Erreur générique retournée par le back.
export interface OrderApiError {
  error: string;
}

// Erreur retournée si une commande est déjà en attente.
export interface PendingOrderApiError
  extends OrderApiError {
  order: Order;
}

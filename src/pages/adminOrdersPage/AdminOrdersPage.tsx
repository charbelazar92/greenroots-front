import "./AdminOrdersPage.css";
import { Link, } from "react-router";
import { useEffect, useState } from "react";
import { SearchBar } from "../../components/catalog/SearchBar";
import { ConfirmStatusModal } from "../../components/confirmStatusModal/ConfirmStatusModal";

import type { AdminOrder, Order, OrderApiError } from "../../@types/order";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

// Traduit les statuts renvoyés par l'API en libellés français pour l'affichage
const statusLabels: Record<Order["status"], string> = {
    pending: "En attente",
    validated: "Validée",
    cancelled: "Annulée",
};


async function fetchOrders(): Promise<AdminOrder[]> {
    const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/admin/orders`);

    // Si le back refuse l'appel, ça renvoie une liste vide plutôt que de faire planter la page
    if (!response.ok) {
        const data: OrderApiError = await response.json();
        console.error(data.error);
        return [];
    }

    return response.json();
}

export function AdminOrdersPage() {

    const [orders, setOrders] = useState<AdminOrder[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    // la valeur est true tant que la première réponse du back n'est pas arrivée
    const [isLoading, setIsLoading] = useState(true);
    // Commande sélectionnée et action choisie (valider ou annuler)
    // Tant que la valeur est null, la modale de confirmation reste fermée      
    const [statusChange, setStatusChange] = useState<{
        order: AdminOrder;
        newStatus: "validated" | "cancelled";
    } | null>(null);

    // Recherche le numéro de commande ou le prénom du client, puis filtre par statut
    const search = searchTerm.toLowerCase();
    const filteredOrders = orders
        .filter((order) =>
            order.orderNumber.toLowerCase().includes(search) ||
            // User peut valoir null (compte supprimé) : on cherche alors dans une chaîne vide
            (order.user?.lastname ?? "").toLowerCase().includes(search)
        )
        .filter((order) => !selectedStatus || order.status === selectedStatus);

    useEffect(() => {
        async function loadOrders() {
            setOrders(await fetchOrders());
            // Le chargement est terminé, qu'il y ait des commandes ou non
            setIsLoading(false);
        }

        loadOrders();
    }, []);

    // Seule une commande "pending" peut changer de statut : validated et cancelled sont définitifs
    async function handleStatusSaved() {
        setStatusChange(null);
        setOrders(await fetchOrders());
    }

    return (

        <main className="admin-orders_page">
            <nav className="admin-orders_breadcrumb" aria-label="Fil d'Ariane">
                <Link className="admin-orders_breadcrumb-link" to="/admin">Administration</Link>
                <span className="admin-orders_breadcrumb-separator">/</span>
                <Link className="admin-orders_breadcrumb-link" to="/admin/orders">Commandes</Link>
            </nav>

            <div className="admin-orders_page-header">
                <h1 className="admin-orders_page-title">Gestion des commandes</h1>
                <p className="admin-orders_page-description">Consulter, confirmer ou annuler les commandes</p>
            </div>

            <div className="admin-orders_filters">
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Rechercher par n° de commande ou nom de famille..."
                />

                <select
                    className="admin-orders_status-select"
                    aria-label="Filtrer par statut"
                    value={selectedStatus}
                    onChange={(event) => setSelectedStatus(event.target.value)}
                >
                    <option value="">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="validated">Validée</option>
                    <option value="cancelled">Annulée</option>
                </select>
            </div>

            <p className="admin-orders_count">
                {filteredOrders.length} commande{filteredOrders.length > 1 ? "s" : ""}
            </p>

            {isLoading && (
                <p className="admin-orders_empty">Chargement des commandes ...</p>
            )}


            {!isLoading && filteredOrders.length === 0 && (
                <p className="admin-orders_empty">Aucune commande ne correspond à votre recherche.</p>
            )}

            <section className="admin-orders_table-wrapper">
                <table className="admin-orders_table">
                    <thead className="admin-orders_thead">
                        <tr className="admin-orders_head-row">
                            <th className="admin-orders_head-cell" scope="col">N° commande</th>
                            <th className="admin-orders_head-cell" scope="col">Date</th>
                            <th className="admin-orders_head-cell" scope="col">Nom et prénom</th>
                            <th className="admin-orders_head-cell" scope="col">Montant (TTC)</th>
                            <th className="admin-orders_head-cell" scope="col">Statut</th>
                            <th className="admin-orders_head-cell" scope="col">Gérer le statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr className="admin-orders_row" key={order.id}>
                                <td className="admin-orders_number">{order.orderNumber}</td>
                                <td className="admin-orders_date">{new Date(order.orderDate).toLocaleDateString("fr-FR")}</td>
                                <td className="admin-orders_firstname-lastname">
                                    {/* la commande est conservée mais pas le client si le compte est supprimé */}
                                    {order.user ? `${order.user.lastname} ${order.user.firstname}` : (
                                        <span className="admin-orders_deleted-user">Compte supprimé</span>
                                    )}


                                </td>
                                <td className="admin-orders_price">{order.totalAmount} €</td>
                                <td className="admin-orders_status">

                                    <span className={`admin-orders_badge admin-orders_badge-${order.status}`}>
                                        {statusLabels[order.status]}
                                    </span>
                                </td>
                                <td className="admin-orders_actions-cell">
                                    {/* Les boutons s'affichent uniquement pour les commandes en attente */}
                                    {order.status === "pending" ? (
                                        <div className="admin-orders_actions">
                                            <button
                                                className="admin-orders_button admin-orders_button-validate"
                                                onClick={() => setStatusChange({ order, newStatus: "validated" })}
                                            >
                                                Valider
                                            </button>
                                            <button
                                                className="admin-orders_button admin-orders_button-cancel"
                                                onClick={() => setStatusChange({ order, newStatus: "cancelled" })}
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="admin-orders_no-action">Commande traitée</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            {statusChange && (
                <ConfirmStatusModal
                    question={`Voulez-vous ${statusChange.newStatus === "validated" ? "valider" : "annuler"} la commande ${statusChange.order.orderNumber} ?`}
                    onConfirm={() =>
                        fetchWithAuth(
                            `${import.meta.env.VITE_API_URL}/api/admin/orders/${statusChange.order.id}/status`,
                            {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ status: statusChange.newStatus }),
                            }
                        )
                    }
                    onClose={() => setStatusChange(null)}
                    onSaved={handleStatusSaved}
                />
            )}
        </main>
    );
}

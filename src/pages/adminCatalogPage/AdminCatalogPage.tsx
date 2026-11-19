import "./AdminCatalogPage.css";
import { Link } from "react-router";
import { SearchBar } from "../../components/catalog/SearchBar";
import { SpeciesSelect } from "../../components/speciesSelector/SpeciesSelect";
import { AddTreeModal } from "../../components/addTreeModal/AddTreeModal";
import { UpdateTreeModal } from "../../components/updateTreeModal/UpdateTreeModal";


import { useTreeSearch } from "../../hooks/useTreeSearch";

import type ITree from "../../@types/trees";


import addIcon from "../../assets/icons/add_white.svg"
import editIcon from "../../assets/icons/edit.svg";
import removeIcon from "../../assets/icons/remove.png";
import { useEffect, useState } from "react";
import { ConfirmStatusModal } from "../../components/confirmStatusModal/ConfirmStatusModal";
import { fetchWithAuth } from "../../utils/fetchWithAuth";



export function AdminCatalogPage() {


    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [species, setSpecies] = useState<string[]>([]);
    const [trees, setTrees] = useState<ITree[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [EditTree, setEditTree] = useState<ITree | null>(null);
    const searchedTrees = useTreeSearch(trees, searchTerm);
    const filteredTrees = searchedTrees.filter((tree) => !selectedSpecies || tree.species === selectedSpecies);
    const [treeToDelete, setTreeToDelete] = useState<ITree | null>(null);


    useEffect(() => {
        async function loadTrees() {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/trees`
            );

            const trees: ITree[] = await response.json();

            setTrees(trees);

            const species = trees.map((tree) => tree.species);
            setSpecies(species);
        }

        loadTrees();
    }, []);

    function handleTreeDeleted() {
        setTreeToDelete(null);
        fetchTrees();
    }



    async function fetchTrees() {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/trees`
        );

        const trees: ITree[] = await response.json();

        setTrees(trees);

        const species = trees.map((tree) => tree.species);
        setSpecies(species);
    }

    function handleTreeSaved() {
        setIsModalOpen(false);
        setEditTree(null);
        fetchTrees();
    }


    return (

        <main className="admin-catalog_page">
            <nav className="breadcrumb" aria-label="Fil d'Ariane">
                <Link to="/admin">Administration</Link>
                <span className="breadcrumb-separator">/</span>
                <Link to="/admin/trees">Catalogue</Link>
            </nav>
            <div className="admin-catalog_page-manage">
                <div className="admin-catalog_page-manage-header">
                    <h1 className="admin-catalog_page-title" >Gestion du catalogue </h1>
                    <p className="admin-catalog_page-description">Consultez, ajoutez, modifiez ou supprimez les arbres disponibles</p>
                </div>
                <button className="admin-add_tree-button" onClick={() => setIsModalOpen(true)}>
                    <img className="cart-details_icon" src={addIcon} alt="edit-icon" />
                    <span>Ajouter un arbre</span>
                </button>
            </div>
            <div className="filter" >
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm} />

                <SpeciesSelect
                    species={species}
                    selectedSpecies={selectedSpecies}
                    onSpeciesChange={setSelectedSpecies}

                />
            </div>

            <p className="table-count">
                {trees.length} arbre{trees.length > 1 ? "s" : ""}
            </p>

            <section className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Espèce</th>
                            <th scope="col">Prix (TTC)</th>
                            <th scope="col">Statut</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTrees.map((tree) => (
                            <tr className="table-tree_list" key={tree.id}>
                                <td>
                                    <img className="table-tree_image" src={tree.url_image} alt={tree.name} />
                                </td>
                                <td className="table-tree_name">{tree.name}</td>
                                <td className="table-species">{tree.species}</td>
                                <td className="table-price">{tree.price} €</td>
                                <td>
                                    <span className={`status-badge ${tree.available ? "published" : "draft"}`}>
                                        {tree.available ? "Publié" : "Brouillon"}
                                    </span>
                                </td>
                                <td>
                                    <div className="table-action">
                                        <button
                                            className="table-action_button edit"
                                            aria-label="Modifier"
                                            onClick={() => setEditTree(tree)}
                                        >
                                            <img src={editIcon} alt="edit-icon" />
                                        </button>

                                        <button
                                            className="table-action_button delete"
                                            aria-label="Supprimer"
                                            onClick={() => setTreeToDelete(tree)}
                                        >
                                            <img src={removeIcon} alt="" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            {isModalOpen && (
                <AddTreeModal onClose={() => setIsModalOpen(false)} onSaved={handleTreeSaved} />
            )}

            {treeToDelete && (
                <ConfirmStatusModal
                    question={`Voulez-vous supprimer l'arbre « ${treeToDelete.name} » ?`}
                    onConfirm={() =>
                        fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/trees/${treeToDelete.slug}`, {
                            method: "DELETE",
                        })
                    }
                    onClose={() => setTreeToDelete(null)}
                    onSaved={handleTreeDeleted}
                />
            )}

            {EditTree && (
                <UpdateTreeModal tree={EditTree} onClose={() => setEditTree(null)} onSaved={handleTreeSaved} />
            )}


        </main>
    );
}


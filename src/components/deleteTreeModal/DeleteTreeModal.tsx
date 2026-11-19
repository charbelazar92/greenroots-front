import "./DeleteTreeModal.css";
import type ITree from "../../@types/trees";
import removeIcon from "../../assets/icons/remove.png";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

interface DeleteTreeButtonProps {
  tree: ITree;
  onDeleted: () => void;
}

export function DeleteTreeButton({ tree, onDeleted }: DeleteTreeButtonProps) {
  async function handleDelete() {
    const confirmed = confirm(`Supprimer "${tree.name}" du catalogue ?`);
    if (!confirmed) return;

    const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/trees/${tree.slug}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(error);
      return;
    }

    onDeleted();
  }

  return (
    <button className="table-action_button delete" aria-label="Supprimer" onClick={handleDelete}>
      <img src={removeIcon} alt="remove-icon" />
    </button>
  );
}
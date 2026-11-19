import "./UpdateTreeModal.css";
import type ITree from "../../@types/trees";
import uploadIcon from "../../assets/icons/upload-icon.jpg"
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { useModalA11y } from "../../hooks/useModalA11y";
import { useState } from "react";


interface UpdateTreeModalProps {
  tree: ITree;
  onClose: () => void;
  onSaved: () => void;
}


export function UpdateTreeModal({ tree, onClose, onSaved }: UpdateTreeModalProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const closeButtonRef = useModalA11y<HTMLButtonElement>(onClose);

  async function updateTree(formData: FormData) {
    setErrorMessage("");
    try {
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/trees/${tree.slug}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.error ?? "Une erreur est survenue.");
        return;
      }

      onSaved();
    } catch {
      setErrorMessage("Impossible de contacter le serveur. Veuillez réessayer.");
    }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="update-tree-modal-title">
        <div className="modal-header">
          <h2 id="update-tree-modal-title">Modifier un arbre</h2>
          <button ref={closeButtonRef} className="modal-close" onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </div>

        <form className="modal-form" action={updateTree}>
          <div className="modal-field">
            <label htmlFor="name">Nom commun</label>
            <input id="name" name="name" type="text" defaultValue={tree.name} />
          </div>

          <div className="modal-field">
            <label htmlFor="species">Espèce</label>
            <input id="species" name="species" type="text" defaultValue={tree.species} />
          </div>

          <div className="modal-field">
            <label htmlFor="price">Prix (€)</label>
            <input id="price" name="price" type="number" min="0" step="0.01" defaultValue={tree.price} />
          </div>

          <div className="modal-field">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" defaultValue={tree.description} />
          </div>

          <div className="modal-field">
            <label htmlFor="image">Image de l'arbre</label>

            <div className="image-preview_wrapper">
              <img className="image-preview" src={tree.url_image} alt={tree.name} />
            </div>

            <label htmlFor="image" className="change-image_button">
              <img className="upload-icon" src={uploadIcon} alt="" />
              <span>Changer l'image</span>
            </label>
            <span className="upload-extension">PNG, JPG (max. 5 Mo)</span>

            <input className="upload-input" id="image" name="image" type="file" accept="image/*" />
          </div>


          <div className="modal-field modal-toggle">
            <label htmlFor="available">Visible dans le catalogue</label>
            <input id="available" name="available" type="checkbox" defaultChecked={tree.available} />
          </div>

          {errorMessage && (
            <p className="modal-error" role="alert">
              {errorMessage}
            </p>
          )}

          <div className="modal-actions"></div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="admin-add_tree-button">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
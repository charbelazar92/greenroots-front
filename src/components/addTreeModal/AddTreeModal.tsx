import "./AddTreeModal.css";
import uploadIcon from "../../assets/icons/upload-icon.jpg"
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { useModalA11y } from "../../hooks/useModalA11y";
import { useState } from "react";


interface AddTreeModalProps {
  onClose: () => void;
  onSaved: () => void;
}

export function AddTreeModal({ onClose, onSaved }: AddTreeModalProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const closeButtonRef = useModalA11y<HTMLButtonElement>(onClose);

  async function createTree(formData: FormData) {
    setErrorMessage("");

    try {
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/trees`, {
        method: "POST",
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
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="add-tree-modal-title">
        <div className="modal-header">
          <h2 id="add-tree-modal-title">Ajouter un arbre</h2>
          <button ref={closeButtonRef} className="modal-close" onClick={onClose} aria-label="Fermer">
            x
          </button>
        </div>

        <form className="modal-form" action={createTree}>
          <div className="modal-field">
            <label htmlFor="name" >Nom commun <span>*</span></label>
            <input placeholder="Ex: Chêne pédonculé" id="name" name="name" type="text" required />
          </div>

          <div className="modal-field">
            <label htmlFor="species">Espèce <span>*</span></label>
            <input placeholder="Ex: Quercus robur" id="species" name="species" type="text" required />
          </div>

          <div className="modal-field">
            <label htmlFor="price">Prix (TTC) <span>*</span></label>
            <input placeholder="Ex: 4.90" id="price" name="price" type="number" min="0" step="0.01" required />
          </div>

          <div className="modal-field">
            <label htmlFor="description">Description <span>*</span></label>
            <textarea placeholder="Ex: Décrivez l'arbre, ses caractéristiques, son impact ..." id="description" name="description" />
          </div>

          <div className="modal-field">
            <label htmlFor="urlImage">Image de l'arbre</label>
          </div>

          <div className="modal-field">
            <label htmlFor="image" className="upload-zone" >
              <img className="upload-icon" src={uploadIcon} alt="icon-upload" />
              <span >Cliquez pour importer une image</span>
              <span >ou glissez-déposez un fichier</span>
              <span >PNG, JPG (max. 5 Mo)</span>

            </label>
            <input className="upload-input" id="image" name="image" type="file" accept="image/*" />
          </div>


          <div className="modal-field modal-toggle">
            <label htmlFor="available">Visible dans le catalogue</label>
            <input id="available" name="available" type="checkbox" defaultChecked />
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
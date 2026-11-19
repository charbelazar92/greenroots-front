import "./ConfirmStatusModal.css";
import { useState } from "react";
import { useModalA11y } from "../../hooks/useModalA11y";

interface ConfirmStatusModalProps {
    // Texte affiché dans la modale
    question: string;
    // Appel API qui est lancé quand l'admin clique sur "Oui"
    onConfirm: () => Promise<Response>;
    onClose: () => void;
    onSaved: () => void;
}

export function ConfirmStatusModal({ question, onConfirm, onClose, onSaved }: ConfirmStatusModalProps) {
    const [errorMessage, setErrorMessage] = useState("");
    const cancelButtonRef = useModalA11y<HTMLButtonElement>(onClose);

    async function handleConfirm() {
        setErrorMessage("");

        try {
            // C'est la page qui le décide quel appel elle lance
            const response = await onConfirm();

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
        <div className="confirm-modal_overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-question">
                <p id="confirm-modal-question" className="confirm-modal_question">
                    {question}
                </p>

                {errorMessage && (
                    <p className="confirm-modal_error" role="alert">
                        {errorMessage}
                    </p>
                )}

                <form className="confirm-modal_actions" action={handleConfirm}>
                    <button ref={cancelButtonRef} type="button" className="confirm-modal_button-no" onClick={onClose}>
                        Non
                    </button>
                    <button type="submit" className="confirm-modal_button-yes">
                        Oui
                    </button>
                </form>
            </div>
        </div>
    );
}
import { useEffect, useRef } from "react";


export function useModalA11y<T extends HTMLElement>(onClose: () => void) {
    // Référence vers l'élément qui recevra le focus à l'ouverture de la modale.
  const initialFocusRef = useRef<T>(null);

  useEffect(() => {
    // Mémorise l'élément qui avait le focus avant l'ouverture de la modale, 
    // afin de pouvoir lui rendre le focus lors de la fermeture.
    const previouslyFocusedElement =
      document.activeElement as HTMLElement | null;

    // Place le focus sur l'élément associé à initialFocusRef.
    initialFocusRef.current?.focus();

    // Ferme la modale lorsque l'utilisateur appuie sur la touche Échap.
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    // Écoute les événements clavier sur l'ensemble de la page
    document.addEventListener("keydown", handleKeyDown);

    return () => {
    // Supprime l'écouteur lorsque le composant est démonté
    // ou lorsque l'effet est relancé.
      document.removeEventListener("keydown", handleKeyDown);
    // Restaure le focus sur l'élément qui était actif avant l'ouverture.
      previouslyFocusedElement?.focus();
    };
  }, [onClose]);

  return initialFocusRef;
}
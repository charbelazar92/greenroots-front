import { useEffect, useRef, useState } from "react";

import treeCursor from "../../assets/icons/cursor-v3-40.png";

import "./CustomCursor.css";

export function CustomCursor() {
    // Référence vers le conteneur qui suit la souris
    const cursorRef = useRef<HTMLDivElement>(null);

    // États visuels du curseur
    const [isVisible, setIsVisible] = useState(false);
    const [isInteractive, setIsInteractive] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        // Le curseur personnalisé reste désactivé sur mobile
        const canUseCustomCursor = window.matchMedia(
            "(hover: hover) and (pointer: fine)",
        ).matches;

        if (!canUseCustomCursor) {
            return;
        }

        const cursor = cursorRef.current;

        if (!cursor) {
            return;
        }

        // Masque le curseur natif uniquement lorsque le composant est actif
        document.documentElement.classList.add("custom-cursor-enabled");

        let previousX = 0;
        let rotationTimeout: ReturnType<typeof setTimeout>;

        const handlePointerMove = (event: PointerEvent) => {
            const movementX = event.clientX - previousX;
            previousX = event.clientX;

            // Inclinaison selon le sens du déplacement
            const rotation =
                movementX > 1 ? 10 : movementX < -1 ? -10 : 0;

            cursor.style.transform = `translate3d(
                ${event.clientX}px,
                ${event.clientY}px,
                0
            )`;

            cursor.style.setProperty("--cursor-rotation", `${rotation}deg`);

            setIsVisible(true);

            // Détecte si la souris survole un élément interactif
            const target = event.target as HTMLElement;

            const interactiveElement = target.closest(
                [
                    "a",
                    "button",
                    "select",
                    "summary",
                    "label[for]",
                    "input",
                    "textarea",
                    "[role='button']",
                ].join(","),
            );

            setIsInteractive(Boolean(interactiveElement));

            // Replace doucement le sapin à la verticale après le mouvement
            clearTimeout(rotationTimeout);

            rotationTimeout = setTimeout(() => {
                cursor.style.setProperty("--cursor-rotation", "0deg");
            }, 100);
        };

        const handlePointerLeave = () => {
            setIsVisible(false);
        };

        const handlePointerEnter = () => {
            setIsVisible(true);
        };

        const handlePointerDown = () => {
            setIsClicking(true);
        };

        const handlePointerUp = () => {
            setIsClicking(false);
        };

        window.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("pointerleave", handlePointerLeave);
        document.addEventListener("pointerenter", handlePointerEnter);
        window.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("pointerup", handlePointerUp);

        return () => {
            clearTimeout(rotationTimeout);

            document.documentElement.classList.remove(
                "custom-cursor-enabled",
            );

            window.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("pointerleave", handlePointerLeave);
            document.removeEventListener("pointerenter", handlePointerEnter);
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, []);

    const cursorClasses = [
        "custom-cursor",
        isVisible ? "custom-cursor--visible" : "",
        isInteractive ? "custom-cursor--interactive" : "",
        isClicking ? "custom-cursor--clicking" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            ref={cursorRef}
            className={cursorClasses}
            aria-hidden="true"
        >
            <img
                className="custom-cursor__image"
                src={treeCursor}
                alt=""
            />
        </div>
    );
}

export default CustomCursor;
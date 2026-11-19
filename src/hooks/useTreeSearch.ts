import type ITree from "../@types/trees";

function removeAccents(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function useTreeSearch(trees: ITree[], searchTerm: string) {
    const searchNormalized = removeAccents(searchTerm.toLowerCase());

    return trees.filter((tree) => {
        const nameNormalized = removeAccents(tree.name.toLowerCase());
        const speciesNormalized = removeAccents(tree.species.toLowerCase());

        return (
            nameNormalized.includes(searchNormalized) ||
            speciesNormalized.includes(searchNormalized)
        );
    });
}
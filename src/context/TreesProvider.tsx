import { useEffect, useState } from "react";
import { TreesContext } from "./TreesContext";
import type ITree from "../@types/trees";


export default function TreesProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [trees, setTrees] = useState<ITree[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTrees = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trees`);
                const data = await response.json();
                setTrees(data);
            } catch (error) {
                console.error("Error fetching trees:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrees();
    }, []);



    const getTreeBySlug = async (slug: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trees/${slug}`, {

            });
            if (!response.ok) return undefined;
            return (await response.json()) as ITree;
        } catch {
            return undefined;
        }
    };

    const value = {
        trees,
        isLoading,
        getTreeBySlug,
    };

    return (
        <TreesContext.Provider value={value}>{children}</TreesContext.Provider>
    );
}
